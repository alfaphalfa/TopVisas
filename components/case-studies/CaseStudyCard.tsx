'use client';

import { useState } from 'react';
import { 
  Trophy, 
  AlertCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  Building,
  GraduationCap,
  TrendingUp,
  FileText,
  Sparkles,
  BookOpen,
  Award,
  GitBranch,
  Briefcase,
  Banknote,
  BarChart3,
  Mic2
} from 'lucide-react';
import { CaseStudy } from '@/lib/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onViewDetails?: (caseStudy: CaseStudy) => void;
  relevanceReason?: string;
}

export function CaseStudyCard({ caseStudy, onViewDetails, relevanceReason }: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getOutcomeColor = () => {
    switch (caseStudy.outcome) {
      case 'approved':
        return 'border-green-500 bg-green-50/50';
      case 'rfe-then-approved':
        return 'border-yellow-500 bg-yellow-50/50';
      case 'denied-then-approved':
        return 'border-orange-500 bg-orange-50/50';
      case 'denied':
        return 'border-red-500 bg-red-50/50';
      default:
        return 'border-gray-300';
    }
  };

  const getOutcomeIcon = () => {
    switch (caseStudy.outcome) {
      case 'approved':
        return <Trophy className="h-5 w-5 text-green-600" />;
      case 'rfe-then-approved':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'denied-then-approved':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'denied':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStrengthColor = () => {
    switch (caseStudy.strength) {
      case 'very-strong':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0';
      case 'strong':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'weak':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getFieldColor = () => {
    switch (caseStudy.field) {
      case 'tech':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'biotech':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'fintech':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatMetricValue = (value: string | number | undefined, prefix = '') => {
    if (!value) return null;
    return `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}`;
  };

  const displayMetrics = [
    { key: 'funding', icon: Banknote, label: 'Funding', value: caseStudy.metrics.funding, priority: 1, color: 'text-green-600' },
    { key: 'citations', icon: BookOpen, label: 'Citations', value: caseStudy.metrics.citations, priority: 2, color: 'text-blue-600' },
    { key: 'publications', icon: FileText, label: 'Publications', value: caseStudy.metrics.publications, priority: 3, color: 'text-purple-600' },
    { key: 'githubStars', icon: GitBranch, label: 'GitHub Stars', value: caseStudy.metrics.githubStars, priority: 4, color: 'text-gray-700' },
    { key: 'salary', icon: Briefcase, label: 'Salary', value: caseStudy.metrics.salary, priority: 5, color: 'text-green-600' },
    { key: 'hIndex', icon: BarChart3, label: 'H-Index', value: caseStudy.metrics.hIndex, priority: 6, color: 'text-indigo-600' },
    { key: 'patents', icon: Award, label: 'Patents', value: caseStudy.metrics.patents, priority: 7, color: 'text-orange-600' },
    { key: 'conferencesSpeaking', icon: Mic2, label: 'Conferences', value: caseStudy.metrics.conferencesSpeaking, priority: 8, color: 'text-pink-600' },
    { key: 'transactionVolume', icon: TrendingUp, label: 'Transaction Vol.', value: caseStudy.metrics.transactionVolume, priority: 9, color: 'text-green-600' },
  ].filter(m => m.value !== undefined).sort((a, b) => a.priority - b.priority);

  return (
    <div className={`relative rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 transform hover:scale-[1.02] ${getOutcomeColor()}`}>
      {/* Success Ribbon for Approved Cases */}
      {caseStudy.outcome === 'approved' && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
          <Trophy className="h-3 w-3" />
          Success Story
        </div>
      )}
      
      <div className="p-6">
        {/* Relevance Indicator */}
        {relevanceReason && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              {relevanceReason}
            </span>
          </div>
        )}
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getOutcomeIcon()}
              <h3 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${getFieldColor()}`}>
                {caseStudy.field.toUpperCase()}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-gray-300 bg-white text-gray-800">
                {caseStudy.visaType}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${getStrengthColor()}`}>
                {caseStudy.strength.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Building className="h-4 w-4 text-gray-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{caseStudy.profile.position}</div>
              <div className="text-gray-700">
                {caseStudy.profile.company || caseStudy.profile.institution}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-900">{caseStudy.profile.education}</span>
          </div>
        </div>

        {displayMetrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {displayMetrics.slice(0, isExpanded ? undefined : 4).map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.key} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    <div className="font-semibold text-gray-900">{formatMetricValue(metric.value)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4 pt-4 border-t">
            {/* Outcome Status */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              caseStudy.outcome === 'approved' ? 'bg-green-100 text-green-800' :
              caseStudy.outcome === 'rfe-then-approved' ? 'bg-yellow-100 text-yellow-800' :
              caseStudy.outcome === 'denied-then-approved' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getOutcomeIcon()}
              <span>
                {caseStudy.outcome === 'approved' ? 'Approved' :
                 caseStudy.outcome === 'rfe-then-approved' ? 'Approved after RFE' :
                 caseStudy.outcome === 'denied-then-approved' ? 'Approved after Appeal' :
                 'Denied'}
              </span>
            </div>

            {caseStudy.keySuccess && caseStudy.keySuccess.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-green-700">Key Success Factors</h4>
                <ul className="space-y-1">
                  {caseStudy.keySuccess.map((factor, idx) => (
                    <li key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {caseStudy.keyFailure && caseStudy.keyFailure.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-700">Key Challenges</h4>
                <ul className="space-y-1">
                  {caseStudy.keyFailure.map((factor, idx) => (
                    <li key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-medium text-sm mb-2 text-gray-900">Evidence Submitted</h4>
              <ul className="space-y-1">
                {caseStudy.evidence.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {caseStudy.denialReasons && caseStudy.denialReasons.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-700">Denial Reasons</h4>
                <ul className="space-y-1">
                  {caseStudy.denialReasons.map((reason, idx) => (
                    <li key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                      <span className="text-red-600 mt-1">×</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-700">
                <span className="font-medium">Processing Notes:</span> {caseStudy.processingNotes}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More
              </>
            )}
          </button>
          
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(caseStudy)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium px-3 py-1.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors ml-auto"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}