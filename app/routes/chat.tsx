import { useSearchParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import React from "react";
import { Header } from "../components/Header";

export function meta() {
  return [
    { title: "AI Chat - RRC AI Tutor" },
    { name: "description", content: "Chat with your AI tutor for personalized help" },
  ];
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  course: string;
  messageCount: number;
  lastActivity: string;
}

interface QuizFormData {
  modules: string[];
  subUnits: string[];
  questionCount: number;
  questionTypes: string[];
}

export default function Chat() {
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get("sessionId");
  const courseParam = searchParams.get("course");
  const courseIdParam = searchParams.get("courseId");
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionIdParam);
  const [showNewQuizForm, setShowNewQuizForm] = useState(sessionIdParam === 'new');
  const [quizFormData, setQuizFormData] = useState<QuizFormData | null>(null);

  // If no session is selected, navigate to courses
  if (!currentSessionId) {
    navigate("/courses");
    return null;
  }

  // Show new quiz form for new sessions
  if (showNewQuizForm && currentSessionId === 'new') {
    return (
      <NewQuizForm 
        courseName={courseParam}
        courseId={courseIdParam}
        onSubmit={(formData) => {
          // Create a new quiz and navigate to course sessions
          setQuizFormData(formData);
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

  // Show the chat interface for the selected session
  return <ChatInterface 
    sessionId={currentSessionId} 
    courseName={courseParam}
    courseId={courseIdParam}
    quizData={quizFormData}
    onBackToSessions={() => setCurrentSessionId(null)} 
  />;
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

// Chat Interface Component
function ChatInterface({ sessionId, courseName, courseId, quizData, onBackToSessions }: { sessionId: string; courseName?: string | null; courseId?: string | null; quizData?: QuizFormData | null; onBackToSessions: () => void }) {
  const currentSession = sessionId === 'new' ? null : recentSessions.find(s => s.id === sessionId);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
      <Header 
        title={currentSession ? currentSession.title : courseName ? `New ${courseName} Chat Session` : "New AI Chat Session"}
        subtitle={currentSession 
          ? currentSession.course 
          : courseName 
            ? `Start a fresh conversation about ${courseName} with your AI tutor`
            : "Start a fresh conversation with your AI tutor"
        }
      >
        {courseId ? (
          <Link
            to={`/course-sessions/${courseId}`}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <button
            onClick={onBackToSessions}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </Header>
      
      {/* Status Indicator */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2">
        <div className="flex justify-end">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            AI Tutor Online
          </div>
        </div>
      </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {sessionId === 'new' ? (
            // Welcome message for new session
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-3xl">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 max-w-lg">
                  <p className="text-sm leading-relaxed text-gray-900 dark:text-white">
                    {quizData ? (
                      <>
                        Hi! I'm your AI tutor. I see you've created a personalized quiz{courseName ? ` for ${courseName}` : ''}. Here's what your quiz will cover:
                        <br /><br />
                        <strong>📚 Modules:</strong> {quizData.modules.join(', ')}
                        {quizData.subUnits.length > 0 && (
                          <>
                            <br />
                            <strong>📖 Sub-units:</strong> {quizData.subUnits.join(', ')}
                          </>
                        )}
                        <br />
                        <strong>🔢 Questions:</strong> {quizData.questionCount} questions
                        <br />
                        <strong>❓ Question Types:</strong> {quizData.questionTypes.map(type => type.replace('-', ' ')).join(', ')}
                        <br /><br />
                        I'm ready to help you prepare for this quiz! What would you like to study first?
                      </>
                    ) : courseName ? (
                      `Hi! I'm your AI tutor. I'm ready to help you with ${courseName}. What specific topics or concepts would you like to explore together?`
                    ) : (
                      "Hi! I'm your AI tutor. I'm here to help you with your studies. What would you like to learn about today?"
                    )}
                  </p>
                  <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                    Just now
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Show existing session messages
            sampleMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-3xl ${message.isUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-purple-100 dark:bg-purple-900'
                  }`}>
                    {message.isUser ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`rounded-2xl px-4 py-3 max-w-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className={`text-xs mt-2 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator (only for existing sessions) */}
          {sessionId !== 'new' && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-3xl">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <textarea
                  placeholder="Ask your AI tutor anything about your studies..."
                  rows={1}
                  className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                  }}
                />
                <button className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22,2 15,22 11,13 2,9" />
                </svg>
                Send
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

const sampleMessages = [
  {
    id: 1,
    content: "Hi! I'm your AI tutor. I'm here to help you with your studies. What would you like to learn about today?",
    isUser: false,
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    content: "Hi! I'm working on calculus and I'm having trouble understanding derivatives. Can you help me?",
    isUser: true,
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    content: "Absolutely! Derivatives are a fundamental concept in calculus. Let me break it down for you.\n\nA derivative represents the rate of change of a function at a specific point. Think of it like the slope of a tangent line to a curve.\n\nFor example, if you have f(x) = x², the derivative f'(x) = 2x tells you how steep the curve is at any point x.\n\nWould you like me to walk through some specific examples or explain any particular aspect in more detail?",
    isUser: false,
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    content: "That's really helpful! Could you show me how to find the derivative of f(x) = 3x³ + 2x - 1?",
    isUser: true,
    timestamp: "10:05 AM",
  },
  {
    id: 5,
    content: "Great question! Let me solve this step by step using the power rule.\n\nFor f(x) = 3x³ + 2x - 1:\n\n1. For 3x³: Using the power rule (d/dx[xⁿ] = nxⁿ⁻¹)\n   d/dx[3x³] = 3 × 3x²⁻¹ = 9x²\n\n2. For 2x: d/dx[2x] = 2 × 1 = 2\n\n3. For -1 (constant): d/dx[-1] = 0\n\nTherefore: f'(x) = 9x² + 2\n\nTry this with another function and let me know if you need help!",
    isUser: false,
    timestamp: "10:06 AM",
  },
];

const quickSuggestions = [
  "Explain this concept",
  "Show me an example", 
  "Check my work",
  "What's the next step?",
  "Help with homework",
];

const recentSessions: ChatSession[] = [
  {
    id: "1",
    title: "Calculus Derivatives Help",
    preview: "Got help understanding the power rule and chain rule for derivatives. Worked through several practice problems and examples.",
    timestamp: "2 days ago",
    course: "Mathematics Fundamentals",
    messageCount: 23,
    lastActivity: "Jan 15, 2024"
  },
  {
    id: "2", 
    title: "Integration Techniques",
    preview: "Learned about integration by parts and substitution methods with step-by-step examples and practice problems.",
    timestamp: "5 days ago",
    course: "Mathematics Fundamentals", 
    messageCount: 18,
    lastActivity: "Jan 12, 2024"
  },
  {
    id: "3",
    title: "Programming Logic Concepts", 
    preview: "Understanding loops, conditionals, and functions in JavaScript. Worked through coding examples and debugging.",
    timestamp: "1 week ago",
    course: "Computer Science",
    messageCount: 31,
    lastActivity: "Jan 10, 2024"
  },
  {
    id: "4",
    title: "Chemistry Stoichiometry",
    preview: "Balancing chemical equations and calculating molar relationships. Solved practice problems step by step.",
    timestamp: "1 week ago", 
    course: "General Chemistry",
    messageCount: 15,
    lastActivity: "Jan 9, 2024"
  },
  {
    id: "5",
    title: "Business Analytics Discussion",
    preview: "Analyzing data trends and creating visualizations. Discussed statistical methods and interpretation techniques.",
    timestamp: "2 weeks ago",
    course: "Business Administration",
    messageCount: 27,
    lastActivity: "Jan 3, 2024"
  }
];
