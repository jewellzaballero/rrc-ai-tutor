import { useSearchParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import React from "react";
import { Header } from "../components/Header";

export function meta() {
  return [
    { title: "Create Quiz - RRC AI Tutor" },
    { name: "description", content: "Create a personalized practice quiz" },
  ];
}

interface QuizFormData {
  modules: string[];
  subUnits: string[];
  questionCount: number;
  questionTypes: string[];
}

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseParam = searchParams.get("course");
  const courseIdParam = searchParams.get("courseId");

  return (
    <NewQuizForm 
      courseName={courseParam}
      courseId={courseIdParam}
      onSubmit={(formData) => {
        // Create a new quiz and navigate to course sessions
        // In a real app, you'd save the quiz to your data store here
        alert(`Quiz "${courseParam} Practice Quiz" created successfully with ${formData.questionCount} questions!`);
        if (courseIdParam) {
          navigate(`/course-sessions/${courseIdParam}`);
        } else {
          navigate("/courses");
        }
      }}
      onCancel={() => {
        if (courseIdParam) {
          navigate(`/course-sessions/${courseIdParam}`);
        } else {
          navigate("/courses");
        }
      }}
    />
  );
}

// New Quiz Form Component
function NewQuizForm({ 
  courseName, 
  courseId, 
  onSubmit, 
  onCancel 
}: { 
  courseName?: string | null; 
  courseId?: string | null; 
  onSubmit: (formData: QuizFormData) => void; 
  onCancel: () => void; 
}) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedSubUnits, setSelectedSubUnits] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['multiple-choice']);

  // Sample data - these would typically come from the course configuration
  const availableModules = [
    "Functions and Graphs",
    "Limits and Continuity", 
    "Derivatives",
    "Integration",
    "Applications of Calculus"
  ];

  const availableSubUnits: Record<string, string[]> = {
    "Functions and Graphs": ["Linear Functions", "Quadratic Functions", "Exponential Functions", "Logarithmic Functions"],
    "Limits and Continuity": ["Understanding Limits", "Limit Laws", "Continuity", "Limits at Infinity"],
    "Derivatives": ["Definition of Derivative", "Power Rule", "Product Rule", "Chain Rule", "Implicit Differentiation"],
    "Integration": ["Antiderivatives", "Substitution Method", "Integration by Parts", "Definite Integrals"],
    "Applications of Calculus": ["Optimization", "Related Rates", "Area Under Curves", "Volume of Solids"]
  };

  const questionTypes = [
    { id: 'multiple-choice', label: 'Multiple Choice' },
    { id: 'short-answer', label: 'Short Answer' },
    { id: 'true-false', label: 'True/False' },
    { id: 'fill-in-blank', label: 'Fill in the Blank' },
    { id: 'essay', label: 'Essay Questions' }
  ];

  const questionCounts = [5, 10, 15, 25];

  const handleModuleChange = (module: string) => {
    setSelectedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const handleSubUnitChange = (subUnit: string) => {
    setSelectedSubUnits(prev => 
      prev.includes(subUnit) 
        ? prev.filter(s => s !== subUnit)
        : [...prev, subUnit]
    );
  };

  const handleQuestionTypeChange = (type: string) => {
    setSelectedQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      modules: selectedModules,
      subUnits: selectedSubUnits,
      questionCount,
      questionTypes: selectedQuestionTypes
    });
  };

  const getAvailableSubUnits = () => {
    return selectedModules.flatMap(module => availableSubUnits[module] || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Create New Quiz"
        subtitle={courseName ? `Create a personalized ${courseName} practice quiz` : "Create a personalized practice quiz"}
      >
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      </Header>

      <main className="p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Modules Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M2 3h20l-2 14H4L2 3z" />
                <path d="M2 3l2 14h16" />
              </svg>
              Select Modules
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose the topics to include in your quiz.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableModules.map((module) => (
                <label key={module} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module)}
                    onChange={() => handleModuleChange(module)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{module}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-units Selection */}
          {selectedModules.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                  <rect x="9" y="3" width="6" height="8" rx="1" />
                </svg>
                Select Sub-units
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose specific subtopics to focus your quiz questions on.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {getAvailableSubUnits().map((subUnit) => (
                  <label key={subUnit} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedSubUnits.includes(subUnit)}
                      onChange={() => handleSubUnitChange(subUnit)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{subUnit}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Question Count */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12h-4v-4" />
              </svg>
              Number of Questions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">How many questions should your quiz include?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {questionCounts.map((count) => (
                <label key={count} className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  questionCount === count 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}>
                  <input
                    type="radio"
                    name="questionCount"
                    value={count}
                    checked={questionCount === count}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <span className={`text-lg font-semibold ${
                    questionCount === count 
                      ? 'text-purple-700 dark:text-purple-300' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Question Types */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 dark:text-orange-400">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Question Types
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select the types of questions to include in your quiz.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questionTypes.map((type) => (
                <label key={type.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedQuestionTypes.includes(type.id)}
                    onChange={() => handleQuestionTypeChange(type.id)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedModules.length === 0 || selectedQuestionTypes.length === 0}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Create Quiz
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
