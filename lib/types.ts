// lib/types.ts
export type VisaType = 'EB1A' | 'O1' | 'NIW';

export interface CriterionScore {
  id: string;
  name: string;
  category: string;
  score: 0 | 1 | 2 | 3;
  evidence: string[];
  explanation: string;
}

export interface AssessmentResult {
  visaType: VisaType;
  overallScore: number;
  maxPossibleScore: number;
  percentage: number;
  eligibility: 'strong' | 'moderate' | 'weak' | 'unlikely';
  criteriaScores: CriterionScore[];
  recommendations: string[];
  alternativeVisas: VisaType[];
  responses?: Record<string, string | number>;
  criteriaCount?: number;
  // NIW-specific properties
  meetsEB2?: boolean;
  prong1?: { met: boolean; percentage?: number };
  prong2?: { met: boolean; percentage?: number };
  prong3?: { met: boolean; percentage?: number };
}

export interface UserProfile {
  field: 'sciences' | 'arts' | 'business' | 'education' | 'athletics' | 'motion-picture';
  degree: 'none' | 'bachelors' | 'masters' | 'phd';
  yearsExperience: number;
  hasJobOffer: boolean;
  currentlyInUS: boolean;
  willingToSelfPetition: boolean;
}