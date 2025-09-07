// lib/recommendations.ts
import { AssessmentResult, VisaType } from './types';

interface RecommendationEngine {
  generateRecommendations: (results: AssessmentResult) => DetailedRecommendation;
}

interface DetailedRecommendation {
  primaryRecommendation: string;
  alternativeOptions: AlternativeVisa[];
  strengthLevel: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'unlikely';
  approvalProbability: number;
  riskFactors: RiskFactor[];
  improvements: ImprovementAction[];
  timeline: TimelineRecommendation;
  costEstimate: CostBreakdown;
  documentationNeeds: DocumentRequirement[];
  warningFlags: string[];
}

interface RiskFactor {
  issue: string;
  severity: 'high' | 'medium' | 'low';
  mitigation: string;
  affectedCriteria?: string[];
}

interface ImprovementAction {
  priority: 'immediate' | 'short-term' | 'long-term';
  action: string;
  impact: 'high' | 'medium' | 'low';
  timeToComplete: string;
  cost?: string;
}

interface AlternativeVisa {
  type: 'EB1A' | 'O-1A' | 'NIW' | 'H1B' | 'EB2-PERM';
  fitScore: number;
  reasoning: string;
  timeline: string;
}

interface TimelineRecommendation {
  preparationTime: string;
  filingRecommendation: string;
  processingTime: string;
  totalEstimate: string;
  urgencyFactors: string[];
}

interface CostBreakdown {
  governmentFees: Record<string, number>;
  legalFees: Record<string, { min: number; max: number }>;
  additionalCosts: Record<string, { min: number; max: number }>;
  totalRange: { min: number; max: number };
}

interface DocumentRequirement {
  document: string;
  status: 'required' | 'recommended' | 'optional' | 'critical';
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export class AdvancedRecommendationEngine implements RecommendationEngine {
  
  // Current adjudication trends from research
  private readonly CURRENT_APPROVAL_RATES: Record<string, number> = {
    EB1A: 0.727,  // Q2 2025
    NIW: 0.673,   // Q2 2025 (recovered from 43%)
    'O-1A': 0.92,    // STEM average
  };

  private readonly PROCESSING_TIMES: Record<string, { regular: string; premium?: string }> = {
    EB1A: { regular: '8-12 months', premium: '15 days' },
    NIW: { regular: '12-18 months' },
    'O-1A': { regular: '2-3 months', premium: '15 days' }
  };

  generateRecommendations(results: AssessmentResult): DetailedRecommendation {
    const strengthLevel = this.calculateStrengthLevel(results);
    const approvalProbability = this.calculateApprovalProbability(results, strengthLevel);
    const riskFactors = this.identifyRiskFactors(results);
    const improvements = this.generateImprovements(results, riskFactors);
    const alternatives = this.evaluateAlternatives(results);
    const timeline = this.recommendTimeline(results, strengthLevel);
    const costEstimate = this.estimateCosts(results);
    const documentationNeeds = this.identifyDocumentationGaps(results);
    const warningFlags = this.checkWarningFlags(results);

    return {
      primaryRecommendation: this.generatePrimaryRecommendation(results, strengthLevel, approvalProbability),
      alternativeOptions: alternatives,
      strengthLevel,
      approvalProbability,
      riskFactors,
      improvements,
      timeline,
      costEstimate,
      documentationNeeds,
      warningFlags
    };
  }

  private calculateStrengthLevel(results: AssessmentResult): DetailedRecommendation['strengthLevel'] {
    const { visaType, percentage, criteriaScores } = results;
    const criteriaCount = criteriaScores?.filter(c => c.score > 0).length || 0;
    
    // EB-1A specific logic
    if (visaType === 'EB1A') {
      if (criteriaCount >= 5 && percentage >= 75) return 'very-strong';
      if (criteriaCount >= 4 && percentage >= 65) return 'strong';
      if (criteriaCount >= 3 && percentage >= 50) return 'moderate';
      if (criteriaCount >= 3 && percentage >= 35) return 'weak';
      return 'unlikely';
    }
    
    // NIW specific logic (three-prong test)
    if (visaType === 'NIW') {
      const niwResults = results;
      if (!niwResults.meetsEB2) return 'unlikely';
      
      const prongsMet = [niwResults.prong1?.met, niwResults.prong2?.met, niwResults.prong3?.met].filter(Boolean).length;
      const avgProngScore = ((niwResults.prong1?.percentage || 0) + (niwResults.prong2?.percentage || 0) + (niwResults.prong3?.percentage || 0)) / 3;
      
      if (prongsMet === 3 && avgProngScore >= 70) return 'very-strong';
      if (prongsMet === 3 && avgProngScore >= 55) return 'strong';
      if (prongsMet === 3 && avgProngScore >= 45) return 'moderate';
      if (prongsMet >= 2) return 'weak';
      return 'unlikely';
    }
    
    // O-1A logic
    if (visaType === 'O1') {
      const o1Results = results;
      const criteriaCount = o1Results.criteriaCount || 0;
      if (criteriaCount >= 5 && percentage >= 70) return 'very-strong';
      if (criteriaCount >= 4 && percentage >= 60) return 'strong';
      if (criteriaCount >= 3 && percentage >= 45) return 'moderate';
      if (criteriaCount >= 3) return 'weak';
      return 'unlikely';
    }
    
    return 'moderate';
  }

  private calculateApprovalProbability(
    results: AssessmentResult, 
    strengthLevel: DetailedRecommendation['strengthLevel']
  ): number {
    const baseRate = this.CURRENT_APPROVAL_RATES[results.visaType] || 0.5;
    
    // Adjust based on strength level
    const strengthMultipliers: Record<string, number> = {
      'very-strong': 1.15,
      'strong': 1.05,
      'moderate': 0.95,
      'weak': 0.75,
      'unlikely': 0.40
    };
    
    let probability = baseRate * strengthMultipliers[strengthLevel];
    
    // Apply penalties for known risk factors
    if (results.visaType === 'NIW') {
      // NIW has seen dramatic scrutiny increase
      probability *= 0.85; // Additional risk factor
    }
    
    // Cap between 15% and 95%
    return Math.min(0.95, Math.max(0.15, probability));
  }

  private identifyRiskFactors(results: AssessmentResult): RiskFactor[] {
    const risks: RiskFactor[] = [];
    const responses = results.responses || {};
    
    // Check for outdated achievements
    if (typeof responses.recent_achievements === 'number' && responses.recent_achievements === 0) {
      risks.push({
        issue: 'Outdated achievements (no recent work in last 2 years)',
        severity: 'high',
        mitigation: 'Generate new publications, speaking engagements, or projects immediately',
        affectedCriteria: ['contributions', 'authorship', 'media']
      });
    }
    
    // Check for limited geographic scope
    if (typeof responses.geographic_scope === 'number' && responses.geographic_scope <= 1) {
      risks.push({
        issue: 'Limited geographic impact (local/regional only)',
        severity: results.visaType === 'NIW' ? 'high' : 'medium',
        mitigation: 'Expand work to national level through collaborations or publications',
        affectedCriteria: ['national_importance', 'media', 'recognition']
      });
    }
    
    // NIW-specific: Weak proposed endeavor
    if (results.visaType === 'NIW' && typeof responses.endeavor_clarity === 'number' && responses.endeavor_clarity <= 1) {
      risks.push({
        issue: 'Unclear or weak proposed endeavor',
        severity: 'high',
        mitigation: 'Develop detailed 5-10 page proposed endeavor statement with specific milestones'
      });
    }
    
    // EB-1A specific: Meeting minimum criteria only
    if (results.visaType === 'EB1A') {
      const criteriaCount = results.criteriaScores?.filter(c => c.score > 0).length || 0;
      if (criteriaCount === 3) {
        risks.push({
          issue: 'Meeting only minimum criteria (3) - vulnerable to final merits denial',
          severity: 'medium',
          mitigation: 'Strengthen evidence for 1-2 additional criteria before filing'
        });
      }
    }
    
    // O-1A specific: Consultation requirement
    if (results.visaType === 'O1') {
      risks.push({
        issue: 'Mandatory consultation requirement adds 4-6 weeks',
        severity: 'low',
        mitigation: 'Start consultation process early with appropriate union/peer group'
      });
    }
    
    // Generic recommendation letters risk
    if (typeof responses.letter_quality === 'number' && responses.letter_quality <= 1) {
      risks.push({
        issue: 'Generic or weak recommendation letters',
        severity: 'high',
        mitigation: 'Obtain detailed letters from independent experts citing specific contributions'
      });
    }
    
    return risks;
  }

  private generateImprovements(results: AssessmentResult, risks: RiskFactor[]): ImprovementAction[] {
    const improvements: ImprovementAction[] = [];
    
    // High-priority improvements based on current USCIS focus
    if (results.visaType === 'NIW') {
      improvements.push({
        priority: 'immediate',
        action: 'Develop comprehensive proposed endeavor document (5-10 pages)',
        impact: 'high',
        timeToComplete: '1-2 weeks',
        cost: '$500-1000 if using professional writer'
      });
      
      improvements.push({
        priority: 'immediate',
        action: 'Obtain 5-7 expert letters specifically addressing three prongs',
        impact: 'high',
        timeToComplete: '4-6 weeks',
        cost: '$0-500 per letter if paid'
      });
    }
    
    if (results.visaType === 'EB1A') {
      const criteriaCount = results.criteriaScores?.filter(c => c.score > 0).length || 0;
      if (criteriaCount < 5) {
        improvements.push({
          priority: 'short-term',
          action: 'Build evidence for 2 additional criteria beyond minimum',
          impact: 'high',
          timeToComplete: '3-6 months'
        });
      }
    }
    
    // Address each high-severity risk
    risks.filter(r => r.severity === 'high').forEach(risk => {
      if (!improvements.some(i => i.action.includes(risk.mitigation.substring(0, 20)))) {
        improvements.push({
          priority: 'immediate',
          action: risk.mitigation,
          impact: 'high',
          timeToComplete: this.estimateTimeForMitigation(risk)
        });
      }
    });
    
    // Standard improvements for all
    improvements.push({
      priority: 'short-term',
      action: 'Create citation report and h-index documentation',
      impact: 'medium',
      timeToComplete: '1 week'
    });
    
    improvements.push({
      priority: 'long-term',
      action: 'Pursue speaking engagements at national conferences',
      impact: 'medium',
      timeToComplete: '3-6 months'
    });
    
    return improvements.sort((a, b) => {
      const priorityOrder: Record<string, number> = { immediate: 0, 'short-term': 1, 'long-term': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private evaluateAlternatives(results: AssessmentResult): AlternativeVisa[] {
    const alternatives: AlternativeVisa[] = [];
    const currentType = results.visaType;
    
    // Always evaluate all three main categories
    if (currentType !== 'EB1A') {
      alternatives.push({
        type: 'EB1A',
        fitScore: this.calculateAlternativeFitScore(results, 'EB1A'),
        reasoning: 'Permanent residence, self-petition option, fastest green card for extraordinary ability',
        timeline: 'Current for most countries'
      });
    }
    
    if (currentType !== 'NIW') {
      alternatives.push({
        type: 'NIW',
        fitScore: this.calculateAlternativeFitScore(results, 'NIW'),
        reasoning: 'Self-petition, more flexible than EB-1A, good for entrepreneurs',
        timeline: 'Current for most countries'
      });
    }
    
    if (currentType !== 'O1') {
      alternatives.push({
        type: 'O-1A',
        fitScore: this.calculateAlternativeFitScore(results, 'O1'),
        reasoning: 'Temporary but renewable, faster than green card, good stepping stone',
        timeline: '2-3 months processing'
      });
    }
    
    // Add fallback options for weak candidates
    if (results.percentage < 40) {
      alternatives.push({
        type: 'H1B',
        fitScore: 0.6,
        reasoning: 'Standard work visa, lottery-based, employer-sponsored',
        timeline: 'Annual lottery in March'
      });
      
      alternatives.push({
        type: 'EB2-PERM',
        fitScore: 0.5,
        reasoning: 'Traditional employer-sponsored green card, requires labor certification',
        timeline: '2-3 years total'
      });
    }
    
    return alternatives.sort((a, b) => b.fitScore - a.fitScore);
  }

  private recommendTimeline(
    results: AssessmentResult,
    strengthLevel: DetailedRecommendation['strengthLevel']
  ): TimelineRecommendation {
    const timeline: TimelineRecommendation = {
      preparationTime: '',
      filingRecommendation: '',
      processingTime: '',
      totalEstimate: '',
      urgencyFactors: []
    };
    
    switch (strengthLevel) {
      case 'very-strong':
        timeline.preparationTime = '1-2 months';
        timeline.filingRecommendation = 'File as soon as documentation ready';
        break;
      case 'strong':
        timeline.preparationTime = '2-3 months';
        timeline.filingRecommendation = 'File after addressing minor gaps';
        break;
      case 'moderate':
        timeline.preparationTime = '4-6 months';
        timeline.filingRecommendation = 'Strengthen 1-2 areas before filing';
        break;
      case 'weak':
        timeline.preparationTime = '6-12 months';
        timeline.filingRecommendation = 'Significant improvement needed before filing';
        break;
      default:
        timeline.preparationTime = '12+ months';
        timeline.filingRecommendation = 'Not ready to file - build qualifications';
    }
    
    const visaKey = results.visaType === 'O1' ? 'O-1A' : results.visaType;
    timeline.processingTime = this.PROCESSING_TIMES[visaKey]?.regular || 'Unknown';
    
    // Add urgency factors
    if (results.visaType === 'NIW') {
      timeline.urgencyFactors.push('NIW approval rates recovering but still volatile - monitor trends');
    }
    
    const responses = results.responses || {};
    if (typeof responses.visa_expiry === 'number' && responses.visa_expiry <= 12) {
      timeline.urgencyFactors.push('Current visa expiring soon - consider premium processing if available');
    }
    
    return timeline;
  }

  private estimateCosts(results: AssessmentResult): CostBreakdown {
    const costs: CostBreakdown = {
      governmentFees: {},
      legalFees: {},
      additionalCosts: {},
      totalRange: { min: 0, max: 0 }
    };
    
    // Government fees
    if (results.visaType === 'EB1A' || results.visaType === 'NIW') {
      costs.governmentFees['I-140 Filing'] = 700;
      costs.governmentFees['I-485 Adjustment'] = 1140;
      if (results.visaType === 'EB1A') {
        costs.governmentFees['Premium Processing'] = 2805;
      }
    } else if (results.visaType === 'O1') {
      costs.governmentFees['I-129 Filing'] = 460;
      costs.governmentFees['Premium Processing'] = 2805;
    }
    
    // Legal fees (ranges)
    const legalFeeRanges: Record<string, { min: number; max: number }> = {
      EB1A: { min: 5000, max: 15000 },
      NIW: { min: 4000, max: 10000 },
      'O-1A': { min: 3000, max: 8000 }
    };
    
    const visaKey = results.visaType === 'O1' ? 'O-1A' : results.visaType;
    const feeRange = legalFeeRanges[visaKey] || { min: 5000, max: 10000 };
    costs.legalFees['Attorney Fees'] = feeRange;
    
    // Additional costs
    costs.additionalCosts['Translation Services'] = { min: 200, max: 1000 };
    costs.additionalCosts['Expert Opinion Letters'] = { min: 500, max: 2000 };
    costs.additionalCosts['Documentation Preparation'] = { min: 300, max: 1500 };
    
    // Calculate totals
    const govTotal = Object.values(costs.governmentFees).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    const legalMin = Object.values(costs.legalFees).reduce((a, b) => a + b.min, 0);
    const legalMax = Object.values(costs.legalFees).reduce((a, b) => a + b.max, 0);
    const additionalMin = Object.values(costs.additionalCosts).reduce((a, b) => a + b.min, 0);
    const additionalMax = Object.values(costs.additionalCosts).reduce((a, b) => a + b.max, 0);
    
    costs.totalRange = {
      min: govTotal + legalMin + additionalMin,
      max: govTotal + legalMax + additionalMax
    };
    
    return costs;
  }

  private identifyDocumentationGaps(results: AssessmentResult): DocumentRequirement[] {
    const requirements: DocumentRequirement[] = [];
    const responses = results.responses || {};
    
    // Universal requirements
    requirements.push({
      document: 'Updated CV/Resume',
      status: 'required',
      priority: 'high',
      notes: 'Comprehensive with all achievements, publications, and roles'
    });
    
    // Based on weak areas
    if (typeof responses.citation_count === 'number' && responses.citation_count < 100) {
      requirements.push({
        document: 'Citation Report from Google Scholar/Scopus',
        status: 'recommended',
        priority: 'medium',
        notes: 'Show citation trends and h-index growth over time'
      });
    }
    
    if (results.visaType === 'NIW') {
      requirements.push({
        document: 'Proposed Endeavor Statement',
        status: 'required',
        priority: 'high',
        notes: '5-10 pages detailing future work and national benefit'
      });
    }
    
    const criteriaCount = results.criteriaScores?.filter(c => c.score > 0).length || 0;
    if (criteriaCount < 4) {
      requirements.push({
        document: 'Additional Evidence for Borderline Criteria',
        status: 'critical',
        priority: 'high',
        notes: 'Focus on criteria where you have partial evidence'
      });
    }
    
    return requirements;
  }

  private checkWarningFlags(results: AssessmentResult): string[] {
    const warnings: string[] = [];
    const responses = results.responses || {};
    
    // Based on current trends
    if (results.visaType === 'NIW') {
      warnings.push('⚠️ NIW approval rates dropped from 80% to 43% in FY2024 - ensure exceptional documentation');
    }
    
    if (results.visaType === 'EB1A') {
      const criteriaCount = results.criteriaScores?.filter(c => c.score > 0).length || 0;
      if (criteriaCount === 3) {
        warnings.push('⚠️ Meeting only 3 criteria makes you vulnerable to final merits determination denial');
      }
    }
    
    if (typeof responses.achievements_age === 'number' && responses.achievements_age > 5) {
      warnings.push('🚨 Achievements older than 5 years may be considered stale - update with recent work');
    }
    
    if (!responses.future_work_clear) {
      warnings.push('🚨 Unclear future U.S. work plans are a common denial reason');
    }
    
    return warnings;
  }

  private generatePrimaryRecommendation(
    results: AssessmentResult,
    strengthLevel: DetailedRecommendation['strengthLevel'],
    approvalProbability: number
  ): string {
    const percentage = Math.round(approvalProbability * 100);
    
    if (strengthLevel === 'very-strong') {
      return `Strong candidate with ${percentage}% estimated approval probability. File within 1-2 months after final documentation review. Consider premium processing for faster decision.`;
    }
    
    if (strengthLevel === 'strong') {
      return `Good candidate with ${percentage}% estimated approval probability. Address identified gaps over 2-3 months before filing. Your case exceeds minimum requirements.`;
    }
    
    if (strengthLevel === 'moderate') {
      return `Borderline candidate with ${percentage}% estimated approval probability. Spend 4-6 months strengthening weak areas. Consider alternative visa options as backup.`;
    }
    
    if (strengthLevel === 'weak') {
      return `Weak candidate with ${percentage}% estimated approval probability. Need 6-12 months of profile building. Consider O-1 as stepping stone or employer-sponsored options.`;
    }
    
    return `Not currently eligible (${percentage}% estimated approval probability). Focus on building qualifications for 12+ months or pursue alternative immigration pathways.`;
  }

  private calculateAlternativeFitScore(results: AssessmentResult, alternativeType: string): number {
    // Simplified scoring based on current profile
    const baseScore = results.percentage / 100;
    
    // Adjust based on visa type compatibility
    if (alternativeType === 'NIW' && results.visaType === 'EB1A') {
      return Math.min(0.95, baseScore * 1.2); // NIW is easier than EB-1A
    }
    if (alternativeType === 'EB1A' && results.visaType === 'NIW') {
      return Math.max(0.3, baseScore * 0.7); // EB-1A is harder than NIW
    }
    if (alternativeType === 'O-1A') {
      return Math.min(0.9, baseScore * 1.1); // O-1 is temporary, slightly easier
    }
    
    return baseScore * 0.8;
  }

  private estimateTimeForMitigation(risk: RiskFactor): string {
    if (risk.issue.includes('outdated')) return '3-6 months';
    if (risk.issue.includes('geographic')) return '6-12 months';
    if (risk.issue.includes('letter')) return '4-6 weeks';
    if (risk.issue.includes('endeavor')) return '2-4 weeks';
    return '2-3 months';
  }
}

export type { DetailedRecommendation, RiskFactor, ImprovementAction, AlternativeVisa, TimelineRecommendation, CostBreakdown, DocumentRequirement };