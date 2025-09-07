'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StrengthIndicatorProps {
  strength: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'unlikely';
  criteriaCount?: number;
  requiredCriteria?: number;
  visaType: string;
}

export function StrengthIndicator({ 
  strength, 
  criteriaCount, 
  requiredCriteria = 3,
  visaType 
}: StrengthIndicatorProps) {
  
  const strengthConfig = {
    'very-strong': {
      label: 'Very Strong Case',
      color: 'emerald',
      bgColor: 'from-emerald-500 to-emerald-600',
      icon: CheckCircle,
      position: 90,
      description: 'Exceeds requirements significantly'
    },
    'strong': {
      label: 'Strong Case',
      color: 'green',
      bgColor: 'from-green-500 to-emerald-500',
      icon: CheckCircle,
      position: 70,
      description: 'Meets requirements comfortably'
    },
    'moderate': {
      label: 'Moderate Case',
      color: 'yellow',
      bgColor: 'from-yellow-500 to-yellow-600',
      icon: AlertCircle,
      position: 50,
      description: 'Meets minimum requirements'
    },
    'weak': {
      label: 'Weak Case',
      color: 'orange',
      bgColor: 'from-orange-500 to-orange-600',
      icon: AlertCircle,
      position: 30,
      description: 'Below typical approval threshold'
    },
    'unlikely': {
      label: 'Not Ready',
      color: 'red',
      bgColor: 'from-red-500 to-red-600',
      icon: XCircle,
      position: 10,
      description: 'Significant improvement needed'
    }
  };

  const config = strengthConfig[strength];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Main Strength Display */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block"
        >
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${config.bgColor} flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="w-16 h-16 text-white" />
          </div>
        </motion.div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {config.label}
        </h2>
        <p className="text-lg text-slate-600">
          {config.description}
        </p>
      </div>

      {/* Visual Strength Bar */}
      <div className="relative">
        <div className="h-12 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-full overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-emerald-200 opacity-50" />
          
          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium">
            <span className="text-red-700">Unlikely</span>
            <span className="text-orange-700">Weak</span>
            <span className="text-yellow-700">Moderate</span>
            <span className="text-green-700">Strong</span>
            <span className="text-emerald-700">Very Strong</span>
          </div>
        </div>
        
        {/* Position Indicator */}
        <motion.div
          initial={{ left: '50%' }}
          animate={{ left: `${config.position}%` }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute -top-2 transform -translate-x-1/2"
          style={{ left: `${config.position}%` }}
        >
          <div className="relative">
            {/* Arrow pointer */}
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-slate-800" />
            {/* Label above arrow */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
              Your Case
            </div>
          </div>
        </motion.div>
      </div>

      {/* Criteria Count Display */}
      {criteriaCount !== undefined && (
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">
              Criteria Met
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${
                criteriaCount >= requiredCriteria ? 'text-green-600' : 'text-orange-600'
              }`}>
                {criteriaCount}
              </span>
              <span className="text-slate-500">
                / {requiredCriteria} required
              </span>
            </div>
          </div>
          
          {/* Mini progress bar for criteria */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < criteriaCount
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : i < requiredCriteria
                    ? 'bg-orange-200'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>0</span>
            <span>Required: {requiredCriteria}</span>
            <span>10</span>
          </div>
        </div>
      )}

      {/* Approval Probability Range */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              Estimated Approval Range
            </p>
            <p className="text-sm text-blue-800">
              {getApprovalRange(strength, visaType)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getApprovalRange(strength: string, visaType: string): string {
  const ranges: Record<string, string> = {
    'very-strong': 'Based on current USCIS trends, very strong cases like yours typically see 85-95% approval rates',
    'strong': 'Based on current USCIS trends, strong cases typically see 70-85% approval rates',
    'moderate': 'Based on current USCIS trends, moderate cases see 50-70% approval rates with proper documentation',
    'weak': 'Cases at this level typically see 30-50% approval rates and often receive RFEs',
    'unlikely': 'Cases at this level typically see less than 30% approval rates'
  };
  
  // Add visa-specific context
  if (visaType === 'NIW') {
    return ranges[strength] + ' (Note: NIW has seen increased scrutiny in 2024-2025)';
  }
  
  return ranges[strength];
}