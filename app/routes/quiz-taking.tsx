import { useSearchParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import { Header } from "../components/Header";

export function meta() {
  return [
    { title: "Taking Quiz - RRC AI Tutor" },
    { name: "description", content: "Take your personalized practice quiz" },
  ];
}

interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'true-false' | 'fill-in-blank' | 'essay';
  options?: string[];
  correctAnswer?: string | number;
  module: string;
  subUnit?: string;
}

interface QuizConfig {
  modules: string[];
  subUnits: string[];
  questionCount: number;
  questionTypes: string[];
}

export default function QuizTaking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const courseParam = searchParams.get("course");
  const courseIdParam = searchParams.get("courseId");
  const configParam = searchParams.get("config");
  
  // Parse quiz configuration from URL params
  let quizConfig: QuizConfig;
  try {
    quizConfig = configParam ? JSON.parse(decodeURIComponent(configParam)) : {
      modules: ["Derivatives"],
      subUnits: ["Power Rule", "Chain Rule"],
      questionCount: 10,
      questionTypes: ["multiple-choice"]
    };
  } catch (error) {
    // Fallback to default config if parsing fails
    quizConfig = {
      modules: ["Derivatives"],
      subUnits: ["Power Rule", "Chain Rule"],
      questionCount: 10,
      questionTypes: ["multiple-choice"]
    };
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes

  // Generate quiz questions based on configuration
  const generateQuestions = (): QuizQuestion[] => {
    const sampleQuestions: QuizQuestion[] = [
      {
        id: 1,
        question: "What is the derivative of x³?",
        type: "multiple-choice",
        options: ["3x²", "x²", "3x", "3x³"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Power Rule"
      },
      {
        id: 2,
        question: "Find the derivative of sin(2x) using the chain rule.",
        type: "multiple-choice",
        options: ["2cos(2x)", "cos(2x)", "-2sin(2x)", "2sin(2x)"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Chain Rule"
      },
      {
        id: 3,
        question: "The power rule states that d/dx[xⁿ] = nxⁿ⁻¹",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Power Rule"
      },
      {
        id: 4,
        question: "What is the derivative of 5x² + 3x - 7?",
        type: "short-answer",
        correctAnswer: "10x + 3",
        module: "Derivatives",
        subUnit: "Power Rule"
      },
      {
        id: 5,
        question: "The derivative of e^x is ______.",
        type: "fill-in-blank",
        correctAnswer: "e^x",
        module: "Derivatives",
        subUnit: "Exponential Functions"
      },
      {
        id: 6,
        question: "Find the derivative of cos(x²).",
        type: "multiple-choice",
        options: ["-2x sin(x²)", "-sin(x²)", "2x cos(x²)", "-cos(x²)"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Chain Rule"
      },
      {
        id: 7,
        question: "What is the derivative of ln(x)?",
        type: "multiple-choice",
        options: ["1/x", "ln(x)", "x", "1"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Logarithmic Functions"
      },
      {
        id: 8,
        question: "The derivative represents the instantaneous rate of change of a function.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Concept"
      },
      {
        id: 9,
        question: "Find the derivative of √x.",
        type: "multiple-choice",
        options: ["1/(2√x)", "√x", "2√x", "1/√x"],
        correctAnswer: 0,
        module: "Derivatives",
        subUnit: "Power Rule"
      },
      {
        id: 10,
        question: "Explain the chain rule and provide an example of when you would use it.",
        type: "essay",
        module: "Derivatives",
        subUnit: "Chain Rule"
      }
    ];

    // Filter questions based on configuration and return the requested number
    return sampleQuestions
      .filter(q => quizConfig.modules.includes(q.module))
      .filter(q => quizConfig.questionTypes.includes(q.type))
      .slice(0, quizConfig.questionCount);
  };

  const [questions] = useState<QuizQuestion[]>(generateQuestions());

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    // Calculate score (simplified)
    const correctAnswers = questions.reduce((count, question) => {
      const userAnswer = userAnswers[question.id];
      if (question.correctAnswer !== undefined && userAnswer === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
    
    // In a real app, you would save the quiz results here
    console.log(`Quiz completed! Score: ${correctAnswers}/${questions.length}`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          title={`${courseParam} Quiz`}
          subtitle="Review your quiz configuration and start when ready"
        >
          <Link
            to={courseIdParam ? `/course-sessions/${courseIdParam}` : "/courses"}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </Header>

        <main className="p-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Quiz Ready!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your personalized {courseParam} quiz has been generated
              </p>
            </div>

            {/* Quiz Configuration Summary */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Topics Covered</h3>
                <div className="space-y-1">
                  {quizConfig.modules.map((module, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      • {module}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quiz Details</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div>Questions: {questions.length}</div>
                  <div>Time Limit: 30 minutes</div>
                  <div>Question Types: {quizConfig.questionTypes.map(type => type.replace('-', ' ')).join(', ')}</div>
                </div>
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="text-center">
              <button
                onClick={() => setQuizStarted(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Start Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (quizCompleted) {
    const correctAnswers = questions.reduce((count, question) => {
      const userAnswer = userAnswers[question.id];
      if (question.correctAnswer !== undefined && userAnswer === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          title="Quiz Complete!"
          subtitle="Review your results below"
        >
          <Link
            to={courseIdParam ? `/course-sessions/${courseIdParam}` : "/courses"}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </Header>

        <main className="p-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 80 
                ? 'bg-green-100 dark:bg-green-900' 
                : percentage >= 60 
                ? 'bg-yellow-100 dark:bg-yellow-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              <span className={`text-2xl font-bold ${
                percentage >= 80 
                  ? 'text-green-600 dark:text-green-400' 
                  : percentage >= 60 
                  ? 'text-yellow-600 dark:text-yellow-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {percentage}%
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You answered {correctAnswers} out of {questions.length} questions correctly
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to={`/quiz?course=${encodeURIComponent(courseParam || '')}&courseId=${courseIdParam}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Take Another Quiz
              </Link>
              <Link
                to={courseIdParam ? `/course-sessions/${courseIdParam}` : "/courses"}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Course
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Quiz taking interface
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
        subtitle={`${courseParam} Quiz • ${formatTime(timeRemaining)} remaining`}
      >
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
              navigate(courseIdParam ? `/course-sessions/${courseIdParam}` : "/courses");
            }
          }}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </Header>

      <main className="p-6 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {currentQuestion.module} • {currentQuestion.subUnit || 'General'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Input based on question type */}
          <div className="space-y-3">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={index}
                    checked={userAnswers[currentQuestion.id] === index}
                    onChange={() => handleAnswerChange(currentQuestion.id, index)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-900 dark:text-white">{option}</span>
                </label>
              ))
            )}

            {currentQuestion.type === 'true-false' && currentQuestion.options && (
              currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={index}
                    checked={userAnswers[currentQuestion.id] === index}
                    onChange={() => handleAnswerChange(currentQuestion.id, index)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-900 dark:text-white">{option}</span>
                </label>
              ))
            )}

            {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'fill-in-blank') && (
              <input
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Enter your answer..."
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            )}

            {currentQuestion.type === 'essay' && (
              <textarea
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Write your detailed answer here..."
                rows={6}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Submit Quiz
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
