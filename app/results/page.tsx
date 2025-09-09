'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, XCircle, AlertCircle, RefreshCw, 
  FileText, Users, Target, TrendingUp, Zap, Globe, Filter, X, Eye,
  GitCompare, ArrowRight, Calendar, Lightbulb, Info
} from 'lucide-react';
import { StrengthIndicator } from '@/components/assessment/StrengthIndicator';
import { 
  caseStudies, 
  findSimilarCases, 
  getCasesByVisaType, 
  getCasesByStrength,
  CaseStudy 
} from '@/lib/caseStudies';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';

interface AssessmentResults {
  visaType: string;
  strength: string;
  score: number;
  percentage: number;
  criteriaCount: number;
  qualifiedCategories: string[];
  responses: Record<string, string | number>;
  allProngsMet?: boolean;
  meetsEB2?: boolean;
  prong1?: { met: boolean; total?: number; max?: number; percentage?: number };
  prong2?: { met: boolean; total?: number; max?: number; percentage?: number };
  prong3?: { met: boolean; total?: number; max?: number; percentage?: number };
  [key: string]: unknown;
}

export default function Results() {
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showAllCasesModal, setShowAllCasesModal] = useState(false);
  const [selectedCases, setSelectedCases] = useState<CaseStudy[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseStudy[]>([]);
  const [filters, setFilters] = useState({
    outcome: 'all',
    field: 'all',
    strength: 'all'
  });
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedCaseForComparison, setSelectedCaseForComparison] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('assessmentResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/');
    }
  }, [router]);

  // Filter handler
  useEffect(() => {
    if (selectedCases.length === 0) return;
    
    let filtered = [...selectedCases];
    
    // Filter by outcome
    if (filters.outcome !== 'all') {
      filtered = filtered.filter(c => {
        if (filters.outcome === 'approved') return c.outcome === 'approved';
        if (filters.outcome === 'denied') return c.outcome === 'denied';
        if (filters.outcome === 'rfe') return c.outcome === 'rfe-then-approved' || c.outcome === 'denied-then-approved';
        return true;
      });
    }
    
    // Filter by field
    if (filters.field !== 'all') {
      filtered = filtered.filter(c => c.field === filters.field);
    }
    
    // Filter by strength
    if (filters.strength !== 'all') {
      filtered = filtered.filter(c => c.strength === filters.strength);
    }
    
    setFilteredCases(filtered);
  }, [filters, selectedCases]);

  if (!results) return null;

  const getEligibilityLevel = (percentage: number, criteriaCount?: number, visaType?: string) => {
    if (visaType === 'NIW') {
      // For NIW, check if all three prongs are met
      if (results.allProngsMet && results.meetsEB2) {
        return { level: 'Strong', color: 'green', icon: CheckCircle };
      } else if (results.allProngsMet && !results.meetsEB2) {
        return { level: 'Moderate (Need EB-2 Qualification)', color: 'yellow', icon: AlertCircle };
      } else if ((results.prong1?.met && results.prong2?.met) || (results.prong2?.met && results.prong3?.met)) {
        return { level: 'Moderate', color: 'yellow', icon: AlertCircle };
      } else if (results.prong1?.met || results.prong2?.met || results.prong3?.met) {
        return { level: 'Weak', color: 'orange', icon: AlertCircle };
      }
      return { level: 'Unlikely', color: 'red', icon: XCircle };
    }
    
    // Original logic for EB-1A and O-1
    if (visaType === 'EB1A') {
      if (criteriaCount! >= 3 && percentage >= 60) return { level: 'Strong', color: 'green', icon: CheckCircle };
      if (criteriaCount! >= 3 && percentage >= 40) return { level: 'Moderate', color: 'yellow', icon: AlertCircle };
      if (criteriaCount! >= 2) return { level: 'Weak', color: 'orange', icon: AlertCircle };
      return { level: 'Unlikely', color: 'red', icon: XCircle };
    } else if (visaType === 'O-1A') {
      if (criteriaCount! >= 3 && percentage >= 50) return { level: 'Strong', color: 'green', icon: CheckCircle };
      if (criteriaCount! >= 3 && percentage >= 35) return { level: 'Moderate', color: 'yellow', icon: AlertCircle };
      if (criteriaCount! >= 2) return { level: 'Weak', color: 'orange', icon: AlertCircle };
      return { level: 'Unlikely', color: 'red', icon: XCircle };
    }
    
    // Default fallback
    if (percentage >= 70) return { level: 'Strong', color: 'green', icon: CheckCircle };
    if (percentage >= 50) return { level: 'Moderate', color: 'yellow', icon: AlertCircle };
    if (percentage >= 30) return { level: 'Weak', color: 'orange', icon: AlertCircle };
    return { level: 'Unlikely', color: 'red', icon: XCircle };
  };

  const eligibility = getEligibilityLevel(results.percentage, results.criteriaCount, results.visaType);
  const Icon = eligibility.icon;

  // Calculate case strength based on criteria met and quality
  const calculateCaseStrength = (): 'very-strong' | 'strong' | 'moderate' | 'weak' | 'unlikely' => {
    const { visaType, criteriaCount } = results;
    const responses = results.responses || {};
    
    // Count strong responses (value >= 2)
    const strongResponses = Object.values(responses)
      .filter((value) => typeof value === 'number' && value >= 2).length;
    const totalResponses = Object.values(responses).length;
    const qualityRatio = totalResponses > 0 ? strongResponses / totalResponses : 0;
    
    if (visaType === 'EB1A') {
      if (criteriaCount >= 6 && qualityRatio >= 0.7) return 'very-strong';
      if (criteriaCount >= 4 && qualityRatio >= 0.6) return 'strong';
      if (criteriaCount >= 3 && qualityRatio >= 0.5) return 'moderate';
      if (criteriaCount >= 3) return 'weak';
      return 'unlikely';
    }
    
    if (visaType === 'O-1A') {
      if (criteriaCount >= 6 && qualityRatio >= 0.65) return 'very-strong';
      if (criteriaCount >= 4 && qualityRatio >= 0.55) return 'strong';
      if (criteriaCount >= 3 && qualityRatio >= 0.45) return 'moderate';
      if (criteriaCount >= 3) return 'weak';
      return 'unlikely';
    }
    
    // NIW logic
    if (visaType === 'NIW') {
      if (results.allProngsMet && results.meetsEB2 && qualityRatio >= 0.7) return 'very-strong';
      if (results.allProngsMet && results.meetsEB2) return 'strong';
      if (results.allProngsMet) return 'moderate';
      if ((results.prong1?.met && results.prong2?.met) || 
          (results.prong2?.met && results.prong3?.met)) return 'weak';
      return 'unlikely';
    }
    
    return 'moderate';
  };

  const caseStrength = calculateCaseStrength();

  // Get relevant case studies based on assessment results
  const getRelevantCases = () => {
    if (!results) return [];
    
    // Map internal visa types to case study visa types
    const visaTypeMap: Record<string, 'EB-1A' | 'O-1A' | 'NIW'> = {
      'EB1A': 'EB-1A',
      'O-1A': 'O-1A',
      'NIW': 'NIW'
    };
    
    const mappedVisaType = visaTypeMap[results.visaType];
    if (!mappedVisaType) return [];
    
    // Priority cases to show as main examples for each visa type
    const priorityCaseIds: Record<string, string[]> = {
      'EB-1A': [
        'eb1a-tech-003',     // ML Engineer - National Security Impact
        'eb1a-biotech-002',  // Cancer Biology Researcher
        'eb1a-fintech-001'   // Asset Manager
      ],
      'O-1A': [
        'o1a-tech-001',      // AI Research Scientist
        'o1a-biotech-001',   // Biotech Researcher - FDA Approval
        'o1a-fintech-001'    // FinTech Innovation Leader
      ],
      'NIW': [
        'niw-tech-008',      // Cloud Security Architect - Approved (new)
        'niw-biotech-007',   // Alzheimer's Researcher - Approved (new) 
        'niw-fintech-005',   // RegTech Compliance Architect - Approved (new)
        'niw-tech-004',      // Full Stack Developer - Denied
        'niw-biotech-004',   // Marine Biologist - RFE then Approved
        'niw-tech-006',      // Climate Tech Data Scientist - Approved
        'niw-biotech-006',   // Biotech/AI Hybrid - Approved
        'niw-tech-007'       // Social Impact Technologist - Approved
      ]
    };
    
    const casesToShow = priorityCaseIds[mappedVisaType] || [];
    
    // First, try to get the priority cases if they match the visa type
    const priorityCases = caseStudies.filter(c => 
      casesToShow.includes(c.id) && c.visaType === mappedVisaType
    );
    
    // For NIW, show more cases (6), for others show fewer (3-4)
    const maxCases = mappedVisaType === 'NIW' ? 6 : 4;
    
    // Always return priority cases if we have any
    if (priorityCases.length > 0) {
      return priorityCases.slice(0, maxCases);
    }
    
    // If not enough priority cases, fall back to original logic
    const field: 'tech' | 'biotech' | 'fintech' = 'tech';
    
    const strengthMap: Record<string, 'very-strong' | 'strong' | 'moderate' | 'weak'> = {
      'very-strong': 'very-strong',
      'strong': 'strong',
      'moderate': 'moderate',
      'weak': 'weak',
      'unlikely': 'weak'
    };
    
    const mappedStrength = strengthMap[caseStrength] || 'moderate';
    
    // Add remaining cases from priority list if available
    let relevantCases = [...priorityCases];
    
    // Fill with other relevant cases
    const otherCases = caseStudies.filter(c => 
      c.visaType === mappedVisaType && 
      !casesToShow.includes(c.id) &&
      c.strength === mappedStrength
    );
    
    relevantCases = [...relevantCases, ...otherCases].slice(0, maxCases);
    
    // If still not enough, broaden search to include different strengths and outcomes
    if (relevantCases.length < maxCases) {
      const moreCases = caseStudies.filter(c => 
        c.visaType === mappedVisaType && 
        !relevantCases.find(rc => rc.id === c.id)
      );
      relevantCases = [...relevantCases, ...moreCases].slice(0, maxCases);
    }
    
    return relevantCases;
  };

  const relevantCaseStudies = getRelevantCases();

  // Generate relevance reason for each case
  const getRelevanceReason = (caseStudy: CaseStudy): string => {
    const reasons = [];
    
    // Check visa type match
    const visaTypeMap: Record<string, string> = {
      'EB-1A': 'EB1A',
      'O-1A': 'O1A',
      'NIW': 'NIW'
    };
    
    if (visaTypeMap[caseStudy.visaType] === results.visaType) {
      reasons.push('Same visa type');
    }
    
    // Check strength match
    if (caseStudy.strength === caseStrength || 
        (caseStudy.strength === 'strong' && caseStrength === 'very-strong') ||
        (caseStudy.strength === 'moderate' && caseStrength === 'weak')) {
      reasons.push('Similar profile strength');
    }
    
    // Check citations range (if available)
    const userMetrics = getEstimatedUserMetrics(caseStrength);
    if (caseStudy.metrics.citations && userMetrics?.citations) {
      const ratio = userMetrics.citations / caseStudy.metrics.citations;
      if (ratio >= 0.7 && ratio <= 1.3) {
        reasons.push('Similar citation range');
      }
    }
    
    // Check outcome relevance
    if (caseStudy.outcome === 'rfe-then-approved') {
      reasons.push('Shows RFE recovery path');
    } else if (caseStudy.outcome === 'approved' && (caseStrength === 'weak' || caseStrength === 'unlikely')) {
      reasons.push('Aspirational benchmark');
    }
    
    // Check field match
    if (caseStudy.field === 'tech') {
      reasons.push('Tech field match');
    }
    
    // Return the most relevant reason or combination
    if (reasons.length === 0) {
      return 'Relevant comparison case';
    } else if (reasons.length === 1) {
      return reasons[0];
    } else {
      // Return the two most important reasons
      const priorityReasons = reasons.filter(r => 
        r.includes('Same visa') || r.includes('Similar profile') || r.includes('citation')
      );
      return priorityReasons.slice(0, 2).join(' + ') || reasons.slice(0, 2).join(' + ');
    }
  };

  const getVisaTypeDisplay = (type: string) => {
    const displays: Record<string, string> = {
      'EB1A': 'EB-1A (Extraordinary Ability)',
      'O-1A': 'O-1A (Sciences/Business/Education/Athletics)',
      'NIW': 'NIW (National Interest Waiver)'
    };
    return displays[type] || type;
  };

  // Component for rendering case studies section
  const CaseStudiesSection = () => {
    const needsStrongerExample = caseStrength === 'weak' || caseStrength === 'unlikely';
    const strongerCase = relevantCaseStudies.find(c => 
      c.strength === 'strong' || c.strength === 'very-strong'
    );
    const regularCases = relevantCaseStudies.filter(c => 
      c.strength !== 'strong' && c.strength !== 'very-strong'
    );
    
    const visaTypeMap: Record<string, 'EB-1A' | 'O-1A' | 'NIW'> = {
      'EB1A': 'EB-1A',
      'O-1A': 'O-1A',
      'NIW': 'NIW'
    };
    const mappedVisaType = visaTypeMap[results?.visaType];
    
    // Always show the section for NIW to allow access to all cases
    if (relevantCaseStudies.length === 0 && results?.visaType !== 'NIW') return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 space-y-6"
      >
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Case Studies
          </h2>
          <p className="text-sm text-slate-600">
            These are real cases from 2023-2025. Individual results may vary.
          </p>
        </div>

        {/* Data Source Information */}
        <div className="flex justify-center">
          <div className="inline-flex items-start gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 max-w-xl">
              These cases are aggregated from public USCIS data, AAO decisions, and law firm reports from 2023-2025. 
              Individual results vary based on specific circumstances.
            </p>
          </div>
        </div>

        {/* Case Study Cards */}
        {relevantCaseStudies.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {(needsStrongerExample ? regularCases : relevantCaseStudies).map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CaseStudyCard 
                    caseStudy={caseStudy}
                    relevanceReason={getRelevanceReason(caseStudy)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Click below to view all {mappedVisaType} case studies</p>
          </div>
        )}

        {/* Stronger Example for Weak Cases */}
        {needsStrongerExample && strongerCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                {`Here's what a stronger profile looks like:`}
              </h3>
            </div>
            <CaseStudyCard 
              caseStudy={strongerCase}
              relevanceReason="Aspirational benchmark - stronger profile"
            />
          </motion.div>
        )}

        {/* View All Cases Button */}
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const allCases = getCasesByVisaType(mappedVisaType);
              setSelectedCases(allCases);
              setFilteredCases(allCases);
              setShowAllCasesModal(true);
              setFilters({ outcome: 'all', field: 'all', strength: 'all' });
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Eye className="w-5 h-5 mr-2" />
            View All {mappedVisaType} Cases
          </button>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 italic">
            Your case is unique. Consider consulting with an immigration attorney for personalized advice.
          </p>
        </div>
      </motion.div>
    );
  };

  // NIW-specific results display
  if (results.visaType === 'NIW') {
    return (
      <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                NIW Assessment Results
              </h1>
              <p className="text-lg text-slate-700 font-medium">
                National Interest Waiver (EB-2)
              </p>
              <p className="text-slate-600 mt-1">
                Three-Prong Test Analysis (Matter of Dhanasar)
              </p>
            </div>

            {/* Strength Indicator - Same format as EB-1A and O-1 */}
            <StrengthIndicator
              strength={caseStrength}
              visaType={results.visaType}
            />

            {/* Three-Prong Summary Grid */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className={`text-center p-3 rounded-lg ${
                results.prong1?.met ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className={`text-lg font-bold ${
                  results.prong1?.met ? 'text-green-600' : 'text-red-600'
                }`}>
                  Prong 1
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {results.prong1?.met ? '✓ Met' : '✗ Not Met'}
                </div>
              </div>

              <div className={`text-center p-3 rounded-lg ${
                results.prong2?.met ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className={`text-lg font-bold ${
                  results.prong2?.met ? 'text-green-600' : 'text-red-600'
                }`}>
                  Prong 2
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {results.prong2?.met ? '✓ Met' : '✗ Not Met'}
                </div>
              </div>

              <div className={`text-center p-3 rounded-lg ${
                results.prong3?.met ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className={`text-lg font-bold ${
                  results.prong3?.met ? 'text-green-600' : 'text-red-600'
                }`}>
                  Prong 3
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {results.prong3?.met ? '✓ Met' : '✗ Not Met'}
                </div>
              </div>
            </div>

            {/* EB-2 Qualification Check */}
            {!results.meetsEB2 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">
                      EB-2 Qualification Issue
                    </p>
                    <p className="text-sm text-red-800">
                      You must meet basic EB-2 requirements (advanced degree or exceptional ability) before qualifying for NIW.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Three-Prong Analysis */}
            <div className="space-y-4 mb-6">
              {/* Prong 1 */}
              <div className={`border rounded-lg p-4 ${
                results.prong1?.met ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <Globe className={`w-5 h-5 mr-3 mt-0.5 ${
                      results.prong1?.met ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        Prong 1: Substantial Merit & National Importance
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600">Strength</span>
                          <span className="text-sm font-medium">
                            {results.prong1?.total}/{results.prong1?.max} points ({results.prong1?.percentage?.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              results.prong1?.met ? 'bg-green-500' : 'bg-red-400'
                            }`}
                            style={{ width: `${results.prong1?.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {results.prong1?.met ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Prong 2 */}
              <div className={`border rounded-lg p-4 ${
                results.prong2?.met ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <TrendingUp className={`w-5 h-5 mr-3 mt-0.5 ${
                      results.prong2?.met ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        Prong 2: Well-Positioned to Advance the Endeavor
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600">Strength</span>
                          <span className="text-sm font-medium">
                            {results.prong2?.total}/{results.prong2?.max} points ({results.prong2?.percentage?.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              results.prong2?.met ? 'bg-green-500' : 'bg-red-400'
                            }`}
                            style={{ width: `${results.prong2?.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {results.prong2?.met ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Prong 3 */}
              <div className={`border rounded-lg p-4 ${
                results.prong3?.met ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <Zap className={`w-5 h-5 mr-3 mt-0.5 ${
                      results.prong3?.met ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        Prong 3: Balance - Waiving Requirements Benefits U.S.
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600">Strength</span>
                          <span className="text-sm font-medium">
                            {results.prong3?.total}/{results.prong3?.max} points ({results.prong3?.percentage?.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              results.prong3?.met ? 'bg-green-500' : 'bg-red-400'
                            }`}
                            style={{ width: `${results.prong3?.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {results.prong3?.met ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* NIW-Specific Recommendations */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-900 mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {results.allProngsMet && results.meetsEB2 ? (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-slate-700">You appear to meet all three prongs for NIW</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-slate-700">Focus on clearly articulating your proposed endeavor</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                      <span className="text-slate-700">Obtain 5-7 expert letters supporting each prong</span>
                    </li>
                  </>
                ) : (
                  <>
                    {!results.prong1?.met && (
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <span className="text-slate-700">Strengthen evidence of national importance and substantial merit</span>
                      </li>
                    )}
                    {!results.prong2?.met && (
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <span className="text-slate-700">Build stronger track record and obtain more support/resources</span>
                      </li>
                    )}
                    {!results.prong3?.met && (
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <span className="text-slate-700">Better articulate why waiving labor certification benefits the U.S.</span>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>

            {/* NIW Advantages */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-blue-900 mb-2">NIW Advantages:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Self-petition without employer sponsorship</li>
                <li>• No labor certification required</li>
                <li>• Flexibility to change jobs</li>
                <li>• Can start your own business</li>
              </ul>
            </div>

            {/* Case Studies Section */}
            <CaseStudiesSection />

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-slate-500">
            <p>This assessment provides general guidance only. Consult an immigration attorney for legal advice.</p>
          </div>
        </div>
      </div>

      {/* View All Cases Modal */}
      {showAllCasesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowAllCasesModal(false)}
          />
          
          {/* Modal Container - with scroll and padding */}
          <div className="relative min-h-screen flex items-start justify-center py-12 px-4">
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg p-6 max-w-7xl w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  All {selectedCases[0]?.visaType} Cases
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Showing {filteredCases.length} of {selectedCases.length} cases similar to your profile
                </p>
              </div>
              <button
                onClick={() => setShowAllCasesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Outcome Filter */}
                <select
                  value={filters.outcome}
                  onChange={(e) => setFilters({ ...filters, outcome: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Outcomes</option>
                  <option value="approved" className="text-gray-900">Approved</option>
                  <option value="rfe" className="text-gray-900">Approved after RFE</option>
                  <option value="denied" className="text-gray-900">Denied</option>
                </select>

                {/* Field Filter */}
                <select
                  value={filters.field}
                  onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Fields</option>
                  <option value="tech" className="text-gray-900">Tech</option>
                  <option value="biotech" className="text-gray-900">Biotech</option>
                  <option value="fintech" className="text-gray-900">Fintech</option>
                </select>

                {/* Strength Filter */}
                <select
                  value={filters.strength}
                  onChange={(e) => setFilters({ ...filters, strength: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Strengths</option>
                  <option value="very-strong" className="text-gray-900">Very Strong</option>
                  <option value="strong" className="text-gray-900">Strong</option>
                  <option value="moderate" className="text-gray-900">Moderate</option>
                  <option value="weak" className="text-gray-900">Weak</option>
                </select>

                {/* Reset Filters */}
                <button
                  onClick={() => setFilters({ outcome: 'all', field: 'all', strength: 'all' })}
                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="pr-2">
              {filteredCases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No cases match your current filters.</p>
                  <button
                    onClick={() => setFilters({ outcome: 'all', field: 'all', strength: 'all' })}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCases.map((caseStudy) => (
                    <CaseStudyCard 
                      key={caseStudy.id} 
                      caseStudy={caseStudy}
                      relevanceReason={getRelevanceReason(caseStudy)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      )}
      </>
    );
  }

  // Original results display for EB-1A and O-1
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Assessment Results
            </h1>
            <p className="text-lg text-slate-700 font-medium">
              {getVisaTypeDisplay(results.visaType)}
            </p>
          </div>

          {/* New Strength Indicator Component */}
          <StrengthIndicator
            strength={caseStrength}
            criteriaCount={results.criteriaCount}
            requiredCriteria={results.visaType === 'EB1A' || results.visaType.startsWith('O1') ? 3 : undefined}
            visaType={results.visaType}
          />

          {/* Similar Real Cases Section */}
          <CaseStudiesSection />

          {/* Consultation Requirement for O-1A */}
          {results.visaType === 'O-1A' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mt-6">
              <div className="flex items-start">
                <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Consultation Requirement
                  </p>
                  <p className="text-sm text-blue-800">
                    You will need a written consultation from a peer group or expert in your field.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Recommendations */}
          <div className="mb-6 mt-6">
            <h3 className="font-bold text-slate-900 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {generateRecommendations(caseStrength, results)}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>This assessment provides general guidance only. Consult an immigration attorney for legal advice.</p>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparisonModal && selectedCaseForComparison && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowComparisonModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 bg-white rounded-lg p-6 max-w-5xl w-full my-8 mt-20 max-h-[calc(100vh-10rem)] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Profile Comparison
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Compare your profile with this {selectedCaseForComparison.outcome === 'approved' ? 'successful' : ''} case
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Side-by-Side Comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Case Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">
                    Case Study Profile
                  </h3>
                  <div className="space-y-3">
                    <ComparisonMetric
                      label="Position"
                      value={selectedCaseForComparison.profile.position}
                      isText={true}
                    />
                    <ComparisonMetric
                      label="Education"
                      value={selectedCaseForComparison.profile.education}
                      isText={true}
                    />
                    <ComparisonMetric
                      label="Experience"
                      value={selectedCaseForComparison.profile.experienceLevel}
                      isText={true}
                    />
                    {selectedCaseForComparison.metrics.citations && (
                      <ComparisonMetric
                        label="Citations"
                        value={selectedCaseForComparison.metrics.citations}
                        userValue={getEstimatedUserMetrics(caseStrength).citations}
                      />
                    )}
                    {selectedCaseForComparison.metrics.publications && (
                      <ComparisonMetric
                        label="Publications"
                        value={selectedCaseForComparison.metrics.publications}
                        userValue={getEstimatedUserMetrics(caseStrength).publications}
                      />
                    )}
                    {selectedCaseForComparison.metrics.hIndex && (
                      <ComparisonMetric
                        label="H-Index"
                        value={selectedCaseForComparison.metrics.hIndex}
                        userValue={getEstimatedUserMetrics(caseStrength).hIndex}
                      />
                    )}
                    {selectedCaseForComparison.metrics.patents && (
                      <ComparisonMetric
                        label="Patents"
                        value={selectedCaseForComparison.metrics.patents}
                        userValue={getEstimatedUserMetrics(caseStrength).patents}
                      />
                    )}
                    <div className="pt-2 border-t">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedCaseForComparison.outcome === 'approved' ? 'bg-green-100 text-green-800' :
                        selectedCaseForComparison.outcome === 'rfe-then-approved' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedCaseForComparison.outcome === 'approved' ? '✓ Approved' :
                         selectedCaseForComparison.outcome === 'rfe-then-approved' ? '⚠ RFE → Approved' :
                         '✗ Denied'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Your Metrics */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">
                    Your Profile (Assessment)
                  </h3>
                  <div className="space-y-3">
                    <ComparisonMetric
                      label="Visa Type"
                      value={getVisaTypeDisplay(results.visaType)}
                      isText={true}
                    />
                    <ComparisonMetric
                      label="Case Strength"
                      value={caseStrength.replace('-', ' ').toUpperCase()}
                      isText={true}
                    />
                    <ComparisonMetric
                      label="Criteria Met"
                      value={`${results.criteriaCount || 0} / ${results.visaType === 'EB1A' ? '10' : '8'}`}
                      isText={true}
                    />
                    <ComparisonMetric
                      label="Citations (Estimated)"
                      value={getEstimatedUserMetrics(caseStrength).citations || 0}
                      targetValue={selectedCaseForComparison.metrics.citations}
                    />
                    <ComparisonMetric
                      label="Publications (Estimated)"
                      value={getEstimatedUserMetrics(caseStrength).publications || 0}
                      targetValue={selectedCaseForComparison.metrics.publications}
                    />
                    <ComparisonMetric
                      label="H-Index (Estimated)"
                      value={getEstimatedUserMetrics(caseStrength).hIndex || 0}
                      targetValue={selectedCaseForComparison.metrics.hIndex}
                    />
                    <ComparisonMetric
                      label="Patents (Estimated)"
                      value={getEstimatedUserMetrics(caseStrength).patents || 0}
                      targetValue={selectedCaseForComparison.metrics.patents}
                    />
                  </div>
                </div>
              </div>

              {/* Bridge the Gap Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Bridge the Gap - Action Plan
                </h3>

                {/* Gap Analysis */}
                <div className="space-y-4">
                  {generateGapAnalysis(selectedCaseForComparison, getEstimatedUserMetrics(caseStrength)).map((gap, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 ${gap.priority === 'high' ? 'text-red-500' : gap.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {gap.priority === 'high' ? <XCircle className="h-5 w-5" /> : 
                         gap.priority === 'medium' ? <AlertCircle className="h-5 w-5" /> :
                         <CheckCircle className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{gap.area}</p>
                        <p className="text-sm text-gray-600 mt-1">{gap.recommendation}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {gap.timeline}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="h-3 w-3" />
                            {gap.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-3">Immediate Next Steps:</h4>
                  <ol className="space-y-2 text-sm">
                    {generateNextSteps(selectedCaseForComparison, caseStrength).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-medium text-blue-600">{idx + 1}.</span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Cases Modal */}
      {showAllCasesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowAllCasesModal(false)}
          />
          
          {/* Modal Container - with scroll and padding */}
          <div className="relative min-h-screen flex items-start justify-center py-12 px-4">
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg p-6 max-w-7xl w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  All {selectedCases[0]?.visaType} Cases
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Showing {filteredCases.length} of {selectedCases.length} cases similar to your profile
                </p>
              </div>
              <button
                onClick={() => setShowAllCasesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Outcome Filter */}
                <select
                  value={filters.outcome}
                  onChange={(e) => setFilters({ ...filters, outcome: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Outcomes</option>
                  <option value="approved" className="text-gray-900">Approved</option>
                  <option value="rfe" className="text-gray-900">Approved after RFE</option>
                  <option value="denied" className="text-gray-900">Denied</option>
                </select>

                {/* Field Filter */}
                <select
                  value={filters.field}
                  onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Fields</option>
                  <option value="tech" className="text-gray-900">Tech</option>
                  <option value="biotech" className="text-gray-900">Biotech</option>
                  <option value="fintech" className="text-gray-900">Fintech</option>
                </select>

                {/* Strength Filter */}
                <select
                  value={filters.strength}
                  onChange={(e) => setFilters({ ...filters, strength: e.target.value })}
                  className="px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all" className="text-gray-900">All Strengths</option>
                  <option value="very-strong" className="text-gray-900">Very Strong</option>
                  <option value="strong" className="text-gray-900">Strong</option>
                  <option value="moderate" className="text-gray-900">Moderate</option>
                  <option value="weak" className="text-gray-900">Weak</option>
                </select>

                {/* Reset Filters */}
                <button
                  onClick={() => setFilters({ outcome: 'all', field: 'all', strength: 'all' })}
                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="pr-2">
              {filteredCases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No cases match your current filters.</p>
                  <button
                    onClick={() => setFilters({ outcome: 'all', field: 'all', strength: 'all' })}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCases.map((caseStudy) => (
                    <CaseStudyCard 
                      key={caseStudy.id} 
                      caseStudy={caseStudy}
                      relevanceReason={getRelevanceReason(caseStudy)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Comparison helper component
interface ComparisonMetricProps {
  label: string;
  value: string | number;
  userValue?: string | number;
  targetValue?: string | number;
  isText?: boolean;
}

function ComparisonMetric({ label, value, userValue, targetValue, isText }: ComparisonMetricProps) {
  const getComparisonIcon = () => {
    if (isText || userValue === undefined || targetValue === undefined) return null;
    
    const userNum = typeof userValue === 'number' ? userValue : parseFloat(userValue);
    const targetNum = typeof targetValue === 'number' ? targetValue : parseFloat(targetValue);
    
    if (userNum >= targetNum) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (userNum >= targetNum * 0.7) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getComparisonColor = () => {
    if (isText || userValue === undefined || targetValue === undefined) return '';
    
    const userNum = typeof userValue === 'number' ? userValue : parseFloat(userValue);
    const targetNum = typeof targetValue === 'number' ? targetValue : parseFloat(targetValue);
    
    if (userNum >= targetNum) {
      return 'text-green-600';
    } else if (userNum >= targetNum * 0.7) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${getComparisonColor()}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {getComparisonIcon()}
      </div>
    </div>
  );
}

// Generate estimated user metrics based on assessment
function getEstimatedUserMetrics(strength: string) {
  // This would be calculated from the actual assessment results
  // For demo, using placeholder values based on strength
  const metricsMap: Record<string, UserMetrics> = {
    'very-strong': { citations: 250, publications: 25, hIndex: 12, patents: 2 },
    'strong': { citations: 150, publications: 15, hIndex: 8, patents: 1 },
    'moderate': { citations: 50, publications: 8, hIndex: 5, patents: 0 },
    'weak': { citations: 20, publications: 3, hIndex: 2, patents: 0 },
    'unlikely': { citations: 5, publications: 1, hIndex: 1, patents: 0 }
  };
  
  return metricsMap[strength] || metricsMap.moderate;
}

// Generate gap analysis
interface UserMetrics {
  publications?: number;
  citations?: number;
  patents?: number;
  funding?: string;
  salary?: string;
  hIndex?: number;
  githubStars?: number;
  conferencesSpeaking?: number;
  transactionVolume?: string;
}

function generateGapAnalysis(caseStudy: CaseStudy, userMetrics: UserMetrics) {
  const gaps = [];
  
  // Citations gap
  if (caseStudy.metrics.citations && userMetrics.citations && userMetrics.citations < caseStudy.metrics.citations) {
    const gap = caseStudy.metrics.citations - userMetrics.citations;
    gaps.push({
      area: 'Citations',
      priority: gap > 100 ? 'high' : gap > 50 ? 'medium' : 'low',
      recommendation: `Increase citations by ${gap}. Focus on publishing in high-impact journals and promoting existing work.`,
      timeline: gap > 100 ? '12-18 months' : '6-12 months',
      impact: 'Critical for demonstrating influence'
    });
  }
  
  // Publications gap
  if (caseStudy.metrics.publications && userMetrics.publications && userMetrics.publications < caseStudy.metrics.publications) {
    const gap = caseStudy.metrics.publications - userMetrics.publications;
    gaps.push({
      area: 'Publications',
      priority: gap > 10 ? 'high' : gap > 5 ? 'medium' : 'low',
      recommendation: `Publish ${gap} more papers. Target peer-reviewed journals and conferences in your field.`,
      timeline: gap > 10 ? '12-24 months' : '6-12 months',
      impact: 'Essential for scholarly contribution'
    });
  }
  
  // H-Index gap
  if (caseStudy.metrics.hIndex && userMetrics.hIndex && userMetrics.hIndex < caseStudy.metrics.hIndex) {
    const gap = caseStudy.metrics.hIndex - userMetrics.hIndex;
    gaps.push({
      area: 'H-Index',
      priority: gap > 5 ? 'high' : gap > 3 ? 'medium' : 'low',
      recommendation: `Improve H-Index by ${gap} points. Focus on quality over quantity and cite-worthy research.`,
      timeline: '12-24 months',
      impact: 'Demonstrates sustained impact'
    });
  }
  
  // Patents gap
  if (caseStudy.metrics.patents && userMetrics.patents !== undefined && userMetrics.patents < caseStudy.metrics.patents) {
    const gap = caseStudy.metrics.patents - userMetrics.patents;
    gaps.push({
      area: 'Patents',
      priority: gap > 2 ? 'medium' : 'low',
      recommendation: `File ${gap} patent application(s). Consider provisional patents for faster filing.`,
      timeline: '6-18 months',
      impact: 'Shows innovation and commercialization'
    });
  }
  
  // Add strength if no major gaps
  if (gaps.length === 0) {
    gaps.push({
      area: 'Overall Profile',
      priority: 'low',
      recommendation: 'Your profile meets or exceeds this case. Focus on documentation quality.',
      timeline: '1-3 months',
      impact: 'Ready for application'
    });
  }
  
  return gaps;
}

// Generate next steps
function generateNextSteps(caseStudy: CaseStudy, userStrength: string) {
  const steps = [];
  
  if (userStrength === 'weak' || userStrength === 'unlikely') {
    steps.push(
      'Schedule consultation with immigration attorney to assess timeline',
      'Begin systematic publication plan in peer-reviewed venues',
      'Join editorial boards or review panels in your field',
      'Document all current achievements and evidence',
      'Consider alternative visa options (H-1B, L-1) as stepping stones'
    );
  } else if (userStrength === 'moderate') {
    steps.push(
      'Identify and fill 1-2 additional criteria for safety margin',
      'Obtain 5-7 strong recommendation letters from independent experts',
      'Document media coverage and public recognition',
      'Compile comprehensive evidence portfolio',
      'Consider waiting 3-6 months to strengthen weak areas'
    );
  } else {
    steps.push(
      'Begin comprehensive documentation of all achievements',
      'Secure strong letters from recognized experts in field',
      'Prepare detailed petition letter explaining contributions',
      'Consider premium processing for faster decision',
      'Engage experienced immigration attorney for petition preparation'
    );
  }
  
  return steps;
}

function generateRecommendations(strength: string, results: AssessmentResults) {
  // Generate contextual recommendations based on strength
  const recommendations = [];
  
  if (strength === 'very-strong') {
    recommendations.push(
      { icon: '✅', text: 'Your case exceeds typical approval requirements' },
      { icon: '📋', text: 'Focus on comprehensive documentation for each criterion' },
      { icon: '⚡', text: 'Consider premium processing for faster decision' }
    );
  } else if (strength === 'strong') {
    recommendations.push(
      { icon: '✅', text: 'You meet the requirements with room to spare' },
      { icon: '📈', text: 'Consider strengthening 1-2 additional criteria for safety' },
      { icon: '📝', text: 'Ensure strong letters of recommendation from independent experts' }
    );
  } else if (strength === 'moderate') {
    recommendations.push(
      { icon: '⚠️', text: 'You meet minimum requirements but should strengthen evidence' },
      { icon: '🎯', text: 'Focus on quality over quantity of evidence' },
      { icon: '⏰', text: 'Consider waiting 3-6 months to build stronger case' }
    );
  } else if (strength === 'weak') {
    recommendations.push(
      { icon: '⚠️', text: `You need to strengthen evidence for ${3 - (results.criteriaCount || 0)} more criteria` },
      { icon: '🔄', text: 'Consider alternative visa options like H-1B or L-1' },
      { icon: '📚', text: 'Work on publications, presentations, or media coverage' }
    );
  } else {
    recommendations.push(
      { icon: '❌', text: 'Significant additional work needed to qualify' },
      { icon: '🎯', text: 'Focus on building expertise and recognition over 12+ months' },
      { icon: '💡', text: 'Consider starting with O-1 visa as stepping stone' }
    );
  }
  
  return recommendations.map(rec => (
    <li key={rec.text} className="flex items-start">
      <span className="mr-2 text-lg">{rec.icon}</span>
      <span className="text-slate-700">{rec.text}</span>
    </li>
  ));
}