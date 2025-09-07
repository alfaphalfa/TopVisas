'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from 'lucide-react';

const EB1A_CRITERIA = [
  {
    id: 'awards',
    title: 'Awards & Prizes',
    description: 'Receipt of lesser nationally or internationally recognized prizes or awards',
    questions: [
      {
        id: 'award_level',
        question: 'What is the highest level of award you have received?',
        options: [
          { value: 3, label: 'International award (e.g., Nobel Prize, Fields Medal)' },
          { value: 2, label: 'National award (e.g., NSF CAREER, National Book Award)' },
          { value: 1, label: 'Regional/State award' },
          { value: 0, label: 'No significant awards' }
        ]
      }
    ]
  },
  {
    id: 'membership',
    title: 'Exclusive Memberships',
    description: 'Membership in associations requiring outstanding achievements',
    questions: [
      {
        id: 'membership_type',
        question: 'Are you a member of any exclusive professional associations?',
        options: [
          { value: 3, label: 'Extremely selective (e.g., National Academy of Sciences)' },
          { value: 2, label: 'Selective with peer review (e.g., IEEE Fellow)' },
          { value: 1, label: 'Professional association with criteria' },
          { value: 0, label: 'No exclusive memberships' }
        ]
      }
    ]
  },
  {
    id: 'media',
    title: 'Media Coverage',
    description: 'Published material about you in professional or major trade publications',
    questions: [
      {
        id: 'media_level',
        question: 'Has your work been featured in media?',
        options: [
          { value: 3, label: 'Major international media (CNN, NYT, Forbes)' },
          { value: 2, label: 'National media or top trade publications' },
          { value: 1, label: 'Regional media or trade publications' },
          { value: 0, label: 'No significant media coverage' }
        ]
      }
    ]
  },
  {
    id: 'judging',
    title: 'Judging Experience',
    description: 'Participation as a judge of the work of others',
    questions: [
      {
        id: 'judging_role',
        question: 'Have you served as a judge or reviewer?',
        options: [
          { value: 3, label: 'Major competitions/grants (NSF, NIH panels)' },
          { value: 2, label: 'Peer review for top journals' },
          { value: 1, label: 'Conference reviewer or minor competitions' },
          { value: 0, label: 'No judging experience' }
        ]
      }
    ]
  },
  {
    id: 'contributions',
    title: 'Original Contributions',
    description: 'Original contributions of major significance in your field',
    questions: [
      {
        id: 'contribution_impact',
        question: 'What is the impact of your original contributions?',
        options: [
          { value: 3, label: 'Breakthrough with wide adoption (patents, methods used globally)' },
          { value: 2, label: 'Significant impact (100+ citations, implemented by others)' },
          { value: 1, label: 'Some impact (published research, minor innovations)' },
          { value: 0, label: 'No documented original contributions' }
        ]
      }
    ]
  }
];

export default function EB1AAssessment() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleResponse = (questionId: string, value: number) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const calculateResults = () => {
    const scores = Object.values(responses);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = EB1A_CRITERIA.length * 3;
    const percentage = (totalScore / maxScore) * 100;
    
    // Store results in sessionStorage for results page
    sessionStorage.setItem('assessmentResults', JSON.stringify({
      visaType: 'EB1A',
      totalScore,
      maxScore,
      percentage,
      responses,
      criteriaCount: scores.filter(s => s > 0).length
    }));
    
    router.push('/results');
  };

  const currentCriterion = EB1A_CRITERIA[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-slate-900">EB-1A Assessment</h2>
            <span className="text-sm text-slate-600">
              {currentStep + 1} of {EB1A_CRITERIA.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / EB1A_CRITERIA.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {currentCriterion.title}
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            {currentCriterion.description}
          </p>
          
          {currentCriterion.questions.map((question) => (
            <div key={question.id}>
              <p className="font-medium text-slate-800 mb-4">
                {question.question}
              </p>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      responses[question.id] === option.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={() => handleResponse(question.id, option.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        {responses[question.id] === option.value ? (
                          <CheckCircle className="w-5 h-5 text-indigo-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm text-slate-900">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentStep === 0) {
                router.push('/');
              } else {
                setCurrentStep(currentStep - 1);
              }
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? 'Back to Home' : 'Previous'}
          </button>
          
          {currentStep === EB1A_CRITERIA.length - 1 ? (
            <button
              onClick={calculateResults}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              See Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={responses[currentCriterion.questions[0].id] === undefined}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}