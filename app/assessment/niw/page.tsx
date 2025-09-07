'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Circle, ArrowRight, ArrowLeft, Globe, 
  TrendingUp, Users, Briefcase, GraduationCap, AlertCircle,
  Target, Zap, Clock, DollarSign, Award
} from 'lucide-react';

// NIW assessment with 2 questions per page
const NIW_ASSESSMENT = {
  preliminary: {
    title: 'Preliminary Qualifications',
    description: 'First, we need to verify you meet the basic EB-2 requirements',
    icon: GraduationCap,
    pages: [
      {
        questions: [
          {
            id: 'education',
            question: 'What is your highest level of education?',
            options: [
              { value: 3, label: 'PhD or equivalent doctoral degree' },
              { value: 2, label: 'Master\'s degree or higher' },
              { value: 1, label: 'Bachelor\'s degree + 5 years progressive experience' },
              { value: 0, label: 'Bachelor\'s degree with less than 5 years experience' }
            ]
          },
          {
            id: 'exceptional_ability',
            question: 'Can you demonstrate exceptional ability in your field?',
            subtext: 'Need to meet at least 3 of 6 criteria: degree, 10+ years experience, license, high salary, membership, or recognition',
            options: [
              { value: 3, label: 'Yes, I meet 5-6 exceptional ability criteria' },
              { value: 2, label: 'Yes, I meet 3-4 exceptional ability criteria' },
              { value: 1, label: 'I might meet 2-3 criteria' },
              { value: 0, label: 'I don\'t meet exceptional ability criteria' }
            ]
          }
        ]
      }
    ]
  },
  prong1: {
    title: 'Prong 1: Substantial Merit & National Importance',
    description: 'Your proposed endeavor must have both substantial merit and national importance',
    icon: Globe,
    pages: [
      {
        title: 'Field and Endeavor Type',
        questions: [
          {
            id: 'field_importance',
            question: 'What field is your proposed endeavor in?',
            options: [
              { value: 3, label: 'Critical field (healthcare, national security, infrastructure, energy)' },
              { value: 2, label: 'Important field (technology, education, environment, research)' },
              { value: 1, label: 'Valuable field (business, arts, social sciences)' },
              { value: 0, label: 'General professional field' }
            ]
          },
          {
            id: 'endeavor_type',
            question: 'What type of endeavor are you proposing?',
            options: [
              { value: 3, label: 'Groundbreaking research or innovation with wide applications' },
              { value: 2, label: 'Important advancement in my field' },
              { value: 1, label: 'Valuable contribution to existing knowledge/practice' },
              { value: 0, label: 'Standard professional work' }
            ]
          }
        ]
      },
      {
        title: 'Impact and Scope',
        questions: [
          {
            id: 'potential_impact',
            question: 'What is the potential impact of your work?',
            options: [
              { value: 3, label: 'Could revolutionize the field or solve major problems' },
              { value: 2, label: 'Significant improvements to current methods/systems' },
              { value: 1, label: 'Incremental improvements' },
              { value: 0, label: 'Limited or unclear impact' }
            ]
          },
          {
            id: 'geographic_scope',
            question: 'What is the geographic scope of your endeavor\'s impact?',
            options: [
              { value: 3, label: 'National or international impact' },
              { value: 2, label: 'Multiple states or regions' },
              { value: 1, label: 'Single state or major metropolitan area' },
              { value: 0, label: 'Local impact only' }
            ]
          }
        ]
      },
      {
        title: 'Beneficiaries and National Interest',
        questions: [
          {
            id: 'beneficiaries',
            question: 'Who will benefit from your endeavor?',
            options: [
              { value: 3, label: 'Entire U.S. population or major sectors' },
              { value: 2, label: 'Significant portion of population or industry' },
              { value: 1, label: 'Specific communities or niche sectors' },
              { value: 0, label: 'Limited group or single organization' }
            ]
          },
          {
            id: 'national_interest_alignment',
            question: 'How does your endeavor align with U.S. national interests?',
            options: [
              { value: 3, label: 'Directly addresses stated national priorities (infrastructure bill, CHIPS Act, climate goals)' },
              { value: 2, label: 'Supports economic competitiveness or public health/safety' },
              { value: 1, label: 'Contributes to cultural, educational, or social advancement' },
              { value: 0, label: 'Indirect or unclear connection to national interests' }
            ]
          }
        ]
      },
      {
        title: 'Urgency',
        questions: [
          {
            id: 'urgency',
            question: 'Is there urgency to your endeavor?',
            options: [
              { value: 3, label: 'Critical timing - addresses immediate national need or crisis' },
              { value: 2, label: 'Time-sensitive - important to implement soon' },
              { value: 1, label: 'Valuable but not time-critical' },
              { value: 0, label: 'No particular urgency' }
            ]
          }
        ]
      }
    ]
  },
  prong2: {
    title: 'Prong 2: Well-Positioned to Advance the Endeavor',
    description: 'You must demonstrate you are well-positioned to advance your proposed endeavor',
    icon: TrendingUp,
    pages: [
      {
        title: 'Experience and Track Record',
        questions: [
          {
            id: 'relevant_experience',
            question: 'How much relevant experience do you have?',
            options: [
              { value: 3, label: '10+ years with progressive leadership roles' },
              { value: 2, label: '5-10 years with demonstrated achievements' },
              { value: 1, label: '2-5 years with some accomplishments' },
              { value: 0, label: 'Less than 2 years or limited experience' }
            ]
          },
          {
            id: 'past_success',
            question: 'What is your track record of success in similar endeavors?',
            options: [
              { value: 3, label: 'Multiple successful projects with documented impact' },
              { value: 2, label: 'Some successful projects or implementations' },
              { value: 1, label: 'Contributing role in successful projects' },
              { value: 0, label: 'Limited demonstrable success' }
            ]
          }
        ]
      },
      {
        title: 'Recognition and Skills',
        questions: [
          {
            id: 'recognition',
            question: 'What recognition have you received in your field?',
            options: [
              { value: 3, label: 'International or national recognition (awards, media, speaking)' },
              { value: 2, label: 'Professional recognition (peer awards, invited talks)' },
              { value: 1, label: 'Some recognition (publications, conference presentations)' },
              { value: 0, label: 'Limited external recognition' }
            ]
          },
          {
            id: 'unique_skills',
            question: 'Do you have unique or rare skills for this endeavor?',
            options: [
              { value: 3, label: 'Unique combination of skills rarely found together' },
              { value: 2, label: 'Specialized expertise in high-demand area' },
              { value: 1, label: 'Strong but not unique skillset' },
              { value: 0, label: 'Common professional skills' }
            ]
          }
        ]
      },
      {
        title: 'Resources and Support',
        questions: [
          {
            id: 'funding',
            question: 'What funding or resources do you have access to?',
            options: [
              { value: 3, label: 'Secured significant funding (government grants, major investment)' },
              { value: 2, label: 'Some funding secured or strong prospects' },
              { value: 1, label: 'Initial funding or self-funded' },
              { value: 0, label: 'No funding secured' }
            ]
          },
          {
            id: 'institutional_support',
            question: 'What institutional support do you have?',
            options: [
              { value: 3, label: 'Major institution/company backing with resources committed' },
              { value: 2, label: 'Formal collaboration agreements or job offer' },
              { value: 1, label: 'Letters of interest or informal support' },
              { value: 0, label: 'No institutional support' }
            ]
          }
        ]
      },
      {
        title: 'Team and Collaboration',
        questions: [
          {
            id: 'team',
            question: 'What team or collaborators do you have?',
            options: [
              { value: 3, label: 'Established team of experts committed to project' },
              { value: 2, label: 'Key collaborators identified and interested' },
              { value: 1, label: 'Some potential collaborators' },
              { value: 0, label: 'Working alone' }
            ]
          }
        ]
      }
    ]
  },
  prong3: {
    title: 'Prong 3: Balancing Test - Why Waive Labor Certification?',
    description: 'On balance, it must benefit the U.S. to waive the job offer and labor certification requirements',
    icon: Zap,
    pages: [
      {
        title: 'Economic and Innovation Benefits',
        questions: [
          {
            id: 'economic_benefit',
            question: 'What economic benefits will your endeavor provide?',
            options: [
              { value: 3, label: 'Create 50+ jobs or generate $10M+ economic activity' },
              { value: 2, label: 'Create 10-50 jobs or significant economic impact' },
              { value: 1, label: 'Some job creation or economic benefit' },
              { value: 0, label: 'Limited economic impact' }
            ]
          },
          {
            id: 'innovation_advancement',
            question: 'How will your work advance U.S. interests?',
            options: [
              { value: 3, label: 'Keep U.S. globally competitive in critical technology/field' },
              { value: 2, label: 'Advance U.S. capabilities in important area' },
              { value: 1, label: 'Contribute to U.S. knowledge base' },
              { value: 0, label: 'Limited advancement' }
            ]
          }
        ]
      },
      {
        title: 'Societal Impact and Work Nature',
        questions: [
          {
            id: 'societal_benefit',
            question: 'What broader societal benefits will result?',
            options: [
              { value: 3, label: 'Major public health, safety, or welfare improvements' },
              { value: 2, label: 'Significant quality of life improvements' },
              { value: 1, label: 'Some societal benefits' },
              { value: 0, label: 'Primarily private benefit' }
            ]
          },
          {
            id: 'work_nature',
            question: 'Why doesn\'t your endeavor fit traditional employment?',
            options: [
              { value: 3, label: 'Entrepreneurial/self-employed - will create jobs for others' },
              { value: 2, label: 'Research/work benefits multiple institutions' },
              { value: 1, label: 'Specialized role hard to define in traditional terms' },
              { value: 0, label: 'Could fit traditional employment' }
            ]
          }
        ]
      },
      {
        title: 'Urgency and Unique Contribution',
        questions: [
          {
            id: 'urgency_factor',
            question: 'Why is waiting for labor certification problematic?',
            options: [
              { value: 3, label: 'Time-critical opportunity that will be lost' },
              { value: 2, label: 'Significant delays would harm the endeavor' },
              { value: 1, label: 'Would prefer to start sooner' },
              { value: 0, label: 'No particular time pressure' }
            ]
          },
          {
            id: 'unique_contribution',
            question: 'Why can\'t a U.S. worker fulfill this same role?',
            options: [
              { value: 3, label: 'My unique background/expertise is essential to the endeavor' },
              { value: 2, label: 'Very few people globally have my combination of skills' },
              { value: 1, label: 'My specific experience gives me advantages' },
              { value: 0, label: 'Others could potentially do this work' }
            ]
          }
        ]
      }
    ]
  }
};

export default function NIWAssessment() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<'preliminary' | 'prong1' | 'prong2' | 'prong3'>('preliminary');
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  const sections = ['preliminary', 'prong1', 'prong2', 'prong3'] as const;
  const sectionIndex = sections.indexOf(currentSection);
  
  const getCurrentSectionData = () => {
    return NIW_ASSESSMENT[currentSection];
  };

  const currentSectionData = getCurrentSectionData();
  const currentPageData = currentSectionData.pages[currentPage];
  const currentQuestions = currentPageData.questions;
  const totalPages = currentSectionData.pages.length;

  // Calculate overall progress
  const calculateProgress = () => {
    let totalPages = 0;
    let completedPages = 0;
    
    sections.forEach((section, idx) => {
      const sectionData = NIW_ASSESSMENT[section];
      totalPages += sectionData.pages.length;
      
      if (idx < sectionIndex) {
        completedPages += sectionData.pages.length;
      } else if (idx === sectionIndex) {
        completedPages += currentPage;
      }
    });
    
    return Math.round((completedPages / totalPages) * 100);
  };

  const handleResponse = (questionId: string, value: number) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const canProceed = () => {
    return currentQuestions.every(q => responses[q.id] !== undefined);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (sectionIndex < sections.length - 1) {
      setCurrentSection(sections[sectionIndex + 1]);
      setCurrentPage(0);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (sectionIndex > 0) {
      const prevSection = sections[sectionIndex - 1];
      setCurrentSection(prevSection);
      const prevSectionData = NIW_ASSESSMENT[prevSection];
      setCurrentPage(prevSectionData.pages.length - 1);
    }
  };

  const calculateResults = () => {
    // Check if meets basic EB-2 requirements
    const meetsEB2 = responses.education >= 1 || responses.exceptional_ability >= 2;
    
    // Calculate scores for each prong
    const prong1Questions = [
      'field_importance', 'endeavor_type', 'potential_impact',
      'geographic_scope', 'beneficiaries', 'national_interest_alignment', 'urgency'
    ];
    const prong2Questions = [
      'relevant_experience', 'past_success', 'recognition', 'unique_skills',
      'funding', 'institutional_support', 'team'
    ];
    const prong3Questions = [
      'economic_benefit', 'innovation_advancement', 'societal_benefit',
      'work_nature', 'urgency_factor', 'unique_contribution'
    ];

    const calculateProngScore = (questions: string[]) => {
      const scores = questions.map(q => responses[q] || 0);
      const total = scores.reduce((a, b) => a + b, 0);
      const max = questions.length * 3;
      return { total, max, percentage: (total / max) * 100 };
    };

    const prong1Score = calculateProngScore(prong1Questions);
    const prong2Score = calculateProngScore(prong2Questions);
    const prong3Score = calculateProngScore(prong3Questions);

    // Overall assessment
    const overallScore = prong1Score.total + prong2Score.total + prong3Score.total;
    const maxScore = prong1Score.max + prong2Score.max + prong3Score.max;
    const percentage = (overallScore / maxScore) * 100;

    // Determine if each prong is met (need reasonable showing for each)
    const prong1Met = prong1Score.percentage >= 50;
    const prong2Met = prong2Score.percentage >= 50;
    const prong3Met = prong3Score.percentage >= 40; // Slightly lower threshold for prong 3

    // Store detailed results
    sessionStorage.setItem('assessmentResults', JSON.stringify({
      visaType: 'NIW',
      meetsEB2,
      totalScore: overallScore,
      maxScore,
      percentage,
      prong1: { ...prong1Score, met: prong1Met },
      prong2: { ...prong2Score, met: prong2Met },
      prong3: { ...prong3Score, met: prong3Met },
      allProngsMet: prong1Met && prong2Met && prong3Met,
      responses
    }));

    router.push('/results');
  };

  const isLastPage = sectionIndex === sections.length - 1 && currentPage === totalPages - 1;
  const Icon = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Overall Progress
            </span>
            <span className="text-sm font-medium text-slate-600">
              {calculateProgress()}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Section Header */}
        <motion.div
          key={`${currentSection}-${currentPage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-4">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentSectionData.title}
              </h2>
              {currentSectionData.description && (
                <p className="text-sm text-slate-600 mt-1">
                  {currentSectionData.description}
                </p>
              )}
            </div>
          </div>

          {/* Page Title if exists */}
          {'title' in currentPageData && (
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                {currentPageData.title}
              </h3>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-8">
            {currentQuestions.map((question) => (
              <div key={question.id}>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  {question.question}
                </h3>
                {'subtext' in question && question.subtext && (
                  <p className="text-sm text-slate-600 mb-4">
                    {question.subtext}
                  </p>
                )}
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleResponse(question.id, option.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        responses[question.id] === option.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {responses[question.id] === option.value ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <span className="text-slate-700">{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                if (sectionIndex === 0 && currentPage === 0) {
                  router.push('/');
                } else {
                  handlePrevious();
                }
              }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {sectionIndex === 0 && currentPage === 0 ? 'Back to Home' : 'Previous'}
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isLastPage
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-lg'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg'
              }`}
            >
              {isLastPage ? 'View Results' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>

        {/* Section Progress */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Section {sectionIndex + 1} of {sections.length} • 
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}