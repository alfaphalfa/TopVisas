"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

// O-1A criteria for sciences, education, business, or athletics
const O1A_CRITERIA = [
  {
    id: "awards",
    title: "Awards & Prizes",
    description:
      "Receipt of nationally or internationally recognized prizes or awards for excellence",
    questions: [
      {
        id: "award_level",
        question:
          "What is the highest level of award or prize you have received?",
        options: [
          {
            value: 3,
            label:
              "Major international award (Nobel Prize, Fields Medal, Olympic Medal)",
          },
          {
            value: 2,
            label: "Significant national/international award in your field",
          },
          { value: 1, label: "Regional or specialized field award" },
          { value: 0, label: "No significant awards" },
        ],
      },
      {
        id: "award_prestige",
        question:
          "Can you document the prestige and selection criteria of your awards?",
        options: [
          {
            value: 3,
            label: "Yes, with extensive documentation of competitive selection",
          },
          { value: 2, label: "Yes, with basic documentation" },
          { value: 1, label: "Partially documented" },
          { value: 0, label: "No documentation available" },
        ],
      },
    ],
  },
  {
    id: "membership",
    title: "Professional Memberships",
    description:
      "Membership in associations requiring outstanding achievements",
    questions: [
      {
        id: "membership_exclusivity",
        question: "Are you a member of exclusive professional associations?",
        options: [
          {
            value: 3,
            label:
              "Extremely selective association (e.g., National Academy of Sciences)",
          },
          {
            value: 2,
            label: "Selective association with peer review (e.g., IEEE Fellow)",
          },
          {
            value: 1,
            label: "Professional association with membership criteria",
          },
          { value: 0, label: "No exclusive memberships" },
        ],
      },
    ],
  },
  {
    id: "media",
    title: "Media Coverage",
    description:
      "Published material in professional or major trade publications or major media",
    questions: [
      {
        id: "media_coverage",
        question: "Has there been media coverage about you and your work?",
        options: [
          {
            value: 3,
            label: "Major international media (CNN, BBC, Nature, Science)",
          },
          { value: 2, label: "National media or top trade publications" },
          { value: 1, label: "Regional media or specialized publications" },
          { value: 0, label: "No significant media coverage" },
        ],
      },
      {
        id: "media_focus",
        question: "What was the focus of the media coverage?",
        options: [
          {
            value: 3,
            label: "Featured story specifically about my work and achievements",
          },
          {
            value: 2,
            label: "Substantial coverage with quotes and discussion of my work",
          },
          { value: 1, label: "Mentioned as part of broader coverage" },
          { value: 0, label: "Not applicable" },
        ],
      },
    ],
  },
  {
    id: "judging",
    title: "Judging Experience",
    description: "Participation as judge of the work of others in the field",
    questions: [
      {
        id: "judging_level",
        question: "Have you served as a judge or peer reviewer?",
        options: [
          {
            value: 3,
            label:
              "Major grant panels (NSF, NIH) or top journal editorial board",
          },
          {
            value: 2,
            label: "Peer reviewer for respected journals or conferences",
          },
          { value: 1, label: "Occasional review work or minor competitions" },
          { value: 0, label: "No judging experience" },
        ],
      },
    ],
  },
  {
    id: "contributions",
    title: "Original Contributions",
    description:
      "Original scientific, scholarly, or business-related contributions of major significance",
    questions: [
      {
        id: "contribution_impact",
        question: "What is the impact of your original contributions?",
        options: [
          {
            value: 3,
            label:
              "Breakthrough innovation widely adopted (patents, methods used globally)",
          },
          {
            value: 2,
            label:
              "Significant contributions (100+ citations, implementations by others)",
          },
          {
            value: 1,
            label:
              "Some original contributions (published research, minor innovations)",
          },
          { value: 0, label: "No documented original contributions" },
        ],
      },
      {
        id: "contribution_evidence",
        question: "How can you demonstrate the impact?",
        options: [
          {
            value: 3,
            label:
              "Patents, licenses, widespread adoption, testimonials from leaders",
          },
          {
            value: 2,
            label: "Citations, implementation by others, peer recognition",
          },
          { value: 1, label: "Publications and some peer acknowledgment" },
          { value: 0, label: "Limited evidence" },
        ],
      },
    ],
  },
  {
    id: "authorship",
    title: "Scholarly Articles",
    description:
      "Authorship of scholarly articles in professional journals or major media",
    questions: [
      {
        id: "publication_record",
        question: "What is your publication record?",
        options: [
          {
            value: 3,
            label: "50+ publications with 1000+ citations, h-index > 20",
          },
          {
            value: 2,
            label: "20+ publications with 500+ citations, h-index 10-20",
          },
          { value: 1, label: "5-20 publications with some citations" },
          { value: 0, label: "Few or no publications" },
        ],
      },
    ],
  },
  {
    id: "critical_role",
    title: "Critical/Essential Role",
    description:
      "Employment in a critical or essential capacity for distinguished organizations",
    questions: [
      {
        id: "role_importance",
        question:
          "Have you held critical roles in distinguished organizations?",
        options: [
          { value: 3, label: "C-level or equivalent at renowned organization" },
          { value: 2, label: "Senior/Lead role at respected organization" },
          { value: 1, label: "Important contributor at known organization" },
          { value: 0, label: "No particularly distinguished roles" },
        ],
      },
    ],
  },
  {
    id: "high_salary",
    title: "High Remuneration",
    description: "Command high salary or remuneration for services",
    questions: [
      {
        id: "salary_level",
        question: "How does your compensation compare to others in your field?",
        options: [
          {
            value: 3,
            label: "Top 5% in my field (can document with statistics)",
          },
          { value: 2, label: "Top 10-20% in my field" },
          { value: 1, label: "Above average for my experience level" },
          { value: 0, label: "Average or below average" },
        ],
      },
    ],
  },
];

export default function O1Assessment() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showConsultation, setShowConsultation] = useState(false);

  const handleResponse = (questionId: string, value: number) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const calculateResults = () => {
    const criteria = O1A_CRITERIA;
    const criteriaMet: Array<{id: string; title: string; score: number}> = [];

    // Calculate which criteria are met (score > 0 for at least one question)
    criteria.forEach((criterion) => {
      const scores = criterion.questions.map((q) => responses[q.id] || 0);
      const maxScore = Math.max(...scores);
      if (maxScore > 0) {
        criteriaMet.push({
          id: criterion.id,
          title: criterion.title,
          score: maxScore,
        });
      }
    });

    const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
    const maxPossibleScore = criteria.reduce(
      (acc, c) => acc + c.questions.length * 3,
      0,
    );
    const percentage = (totalScore / maxPossibleScore) * 100;

    // Store results
    sessionStorage.setItem(
      "assessmentResults",
      JSON.stringify({
        visaType: "O-1A",
        totalScore,
        maxScore: maxPossibleScore,
        percentage,
        responses,
        criteriaMet,
        criteriaCount: criteriaMet.length,
        totalCriteria: criteria.length,
        needsConsultation: true, // O-1A always needs consultation
      }),
    );

    router.push("/results");
  };

  const currentCriteria = O1A_CRITERIA;
  const currentCriterion = currentCriteria[currentStep];
  const totalQuestions = currentCriteria.reduce(
    (acc, c) => acc + c.questions.length,
    0,
  );
  const answeredQuestions = Object.keys(responses).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-slate-900 mr-3">
                O-1A Assessment
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Sciences, Education, Business, or Athletics
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>
                Criterion {currentStep + 1} of {currentCriteria.length}
              </span>
              <span>
                {answeredQuestions} of {totalQuestions} questions answered
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(answeredQuestions / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Consultation Warning for O-1A */}
        {currentStep === 0 && !showConsultation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium mb-1">
                  Important: O-1A Consultation Requirement
                </p>
                <p className="text-sm text-amber-700">
                  O-1A petitions require a written consultation from a peer
                  group in your field of expertise. This assessment helps
                  evaluate eligibility but does not replace the mandatory
                  consultation.
                </p>
                <button
                  onClick={() => setShowConsultation(true)}
                  className="text-sm text-amber-600 underline mt-2"
                >
                  Learn more about consultation requirements
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {currentCriterion.title}
            </h3>
            <p className="text-sm text-slate-600">
              {currentCriterion.description}
            </p>
          </div>

          <div className="space-y-6">
            {currentCriterion.questions.map((question, qIndex) => (
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
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={responses[question.id] === option.value}
                        onChange={() =>
                          handleResponse(question.id, option.value)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          {responses[question.id] === option.value ? (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-slate-900">
                            {option.label}
                          </span>
                          {option.value === 3 && (
                            <span className="ml-2 text-xs text-green-600 font-medium">
                              Strongest
                            </span>
                          )}
                          {option.value === 0 && (
                            <span className="ml-2 text-xs text-red-600 font-medium">
                              Does not meet
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {qIndex < currentCriterion.questions.length - 1 && (
                  <div className="border-t border-slate-200 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentStep === 0) {
                router.push("/");
              } else {
                setCurrentStep(currentStep - 1);
              }
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? "Back to Home" : "Previous"}
          </button>

          {currentStep === currentCriteria.length - 1 ? (
            <button
              onClick={calculateResults}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              See Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                !currentCriterion.questions.every(
                  (q) => responses[q.id] !== undefined,
                )
              }
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 flex justify-center space-x-2">
          {currentCriteria.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-blue-500"
                  : index < currentStep
                    ? "bg-blue-300"
                    : "bg-slate-300"
              }`}
              aria-label={`Go to criterion ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConsultation(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                O-1A Consultation Requirements
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-medium text-slate-900 mb-2">
                    For O-1A (Sciences, Business, Education, Athletics):
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>
                      Written consultation from a peer group in your field
                    </li>
                    <li>
                      If no appropriate peer group exists, expert opinion
                      letters may suffice
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                  <p className="text-blue-800">
                    <strong>Note:</strong> Consultations must be obtained before
                    filing the petition. Processing time varies but typically
                    takes 2-4 weeks.
                  </p>
                </div>
                <button
                  onClick={() => setShowConsultation(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
