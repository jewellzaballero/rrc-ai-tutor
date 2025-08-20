import { Link, useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { getCourseById } from "../data/courses";

export function meta() {
  return [
    { title: "Course Sessions - RRC AI Tutor" },
    { name: "description", content: "View your AI chat sessions for this course" },
  ];
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  duration: string;
  isFavourite: boolean;
  messageCount: number;
  topic: string;
  lastActivity: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  duration: string;
  isFavourite: boolean;
  questionCount: number;
  score?: number;
  maxScore: number;
  topic: string;
  status: "completed" | "in-progress" | "not-started";
  difficulty: "easy" | "medium" | "hard";
  lastActivity: string;
}

export default function CourseSessions() {
  const params = useParams();
  const courseId = params.courseId;
  
  // Get course information from the courseId
  const course = courseId ? getCourseById(courseId) : null;
  const courseTitle = course?.title || "Course";
  const courseCode = course?.courseCode || "";
  
  const [sessions, setSessions] = useState<ChatSession[]>(sampleSessions);
  const [quizzes, setQuizzes] = useState<Quiz[]>(sampleQuizzes);

  const toggleFavourite = (sessionId: string) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId
          ? { ...session, isFavourite: !session.isFavourite }
          : session
      )
    );
  };

  const toggleQuizFavourite = (quizId: string) => {
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz.id === quizId
          ? { ...quiz, isFavourite: !quiz.isFavourite }
          : quiz
      )
    );
  };

  const favouriteSessions = sessions.filter(session => session.isFavourite);
  const recentSessions = sessions
    .filter(session => !session.isFavourite)
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

  const favouriteQuizzes = quizzes.filter(quiz => quiz.isFavourite);
  const recentQuizzes = quizzes
    .filter(quiz => !quiz.isFavourite)
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title={`${courseTitle} - Learning Hub`}
        subtitle="Your AI chat sessions, practice quizzes, and study materials for this course"
      >
        <Link
          to="/courses"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </Header>

      {/* Main Content */}
      <main className="p-6 overflow-y-auto flex-1">
          {/* Course Information */}
          {course && (
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${course.iconBg}`}>
                    {course.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
                        {courseCode}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {course.instructor}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {courseTitle}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sessions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Practice Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizzes.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5h</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side by side layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Sessions Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Chat Sessions</h2>
                </div>
                <Link
                  to={`/chat?sessionId=new&course=${encodeURIComponent(courseTitle)}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  New Session
                </Link>
              </div>

              {/* Favourite Sessions */}
              {favouriteSessions.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favourites</h3>
                  </div>
                  <div className="space-y-3">
                    {favouriteSessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        onToggleFavourite={toggleFavourite}
                        isCompact
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Sessions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sessions</h3>
                </div>
                <div className="space-y-3">
                  {recentSessions.slice(0, 5).map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onToggleFavourite={toggleFavourite}
                      isCompact
                    />
                  ))}
                </div>
                {recentSessions.length > 5 && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      View All Sessions ({recentSessions.length - 5} more)
                    </button>
                  </div>
                )}
              </div>

              {/* Sessions Empty State */}
              {sessions.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    No chat sessions yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Start your first AI tutoring session
                  </p>
                  <Link 
                    to="/chat"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                  >
                    Start First Session
                  </Link>
                </div>
              )}
            </div>

            {/* Quizzes Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Practice Quizzes</h2>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  New Quiz
                </button>
              </div>

              {/* Favourite Quizzes */}
              {favouriteQuizzes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favourites</h3>
                  </div>
                  <div className="space-y-3">
                    {favouriteQuizzes.map((quiz) => (
                      <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onToggleFavourite={toggleQuizFavourite}
                        isCompact
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Quizzes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Quizzes</h3>
                </div>
                <div className="space-y-3">
                  {recentQuizzes.slice(0, 5).map((quiz) => (
                    <QuizCard
                      key={quiz.id}
                      quiz={quiz}
                      onToggleFavourite={toggleQuizFavourite}
                      isCompact
                    />
                  ))}
                </div>
                {recentQuizzes.length > 5 && (
                  <div className="mt-4 text-center">
                    <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium">
                      View All Quizzes ({recentQuizzes.length - 5} more)
                    </button>
                  </div>
                )}
              </div>

              {/* Quizzes Empty State */}
              {quizzes.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    No quizzes yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Start your first practice quiz
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block">
                    Create First Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
    </div>
  );
}

interface SessionCardProps {
  session: ChatSession;
  onToggleFavourite: (id: string) => void;
  isCompact?: boolean;
}

interface QuizCardProps {
  quiz: Quiz;
  onToggleFavourite: (id: string) => void;
  isCompact?: boolean;
}

function SessionCard({ session, onToggleFavourite, isCompact = false }: SessionCardProps) {
  return (
    <Link 
      to={`/chat?sessionId=${session.id}`}
      className={`block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer ${
        isCompact ? '' : 'h-full'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {session.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {session.preview}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavourite(session.id);
          }}
          className={`ml-3 p-1 rounded-full transition-colors z-10 relative ${
            session.isFavourite
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={session.isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-4">
          <span>{session.timestamp}</span>
          <span>{session.messageCount} messages</span>
          <span>{session.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last activity: {session.lastActivity}
        </span>
      </div>
    </Link>
  );
}

function QuizCard({ quiz, onToggleFavourite, isCompact = false }: QuizCardProps) {
  const getStatusColor = (status: Quiz["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getDifficultyColor = (difficulty: Quiz["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    }
  };

  return (
    <div 
      className={`block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all cursor-pointer ${
        isCompact ? '' : 'h-full'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {quiz.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getDifficultyColor(quiz.difficulty)}`}>
              {quiz.difficulty}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(quiz.status)}`}>
              {quiz.status.replace("-", " ")}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {quiz.description}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavourite(quiz.id);
          }}
          className={`ml-3 p-1 rounded-full transition-colors z-10 relative ${
            quiz.isFavourite
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={quiz.isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-4">
          <span>{quiz.timestamp}</span>
          <span>{quiz.questionCount} questions</span>
          <span>{quiz.duration}</span>
          {quiz.score !== undefined && (
            <span className="font-medium">{quiz.score}/{quiz.maxScore}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last activity: {quiz.lastActivity}
        </span>
        {quiz.status === "completed" && quiz.score !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            (quiz.score / quiz.maxScore) >= 0.8 
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : (quiz.score / quiz.maxScore) >= 0.6 
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}>
            {Math.round((quiz.score / quiz.maxScore) * 100)}%
          </span>
        )}
      </div>
    </div>
  );
}

const sampleSessions: ChatSession[] = [
  {
    id: "1",
    title: "Calculus Derivatives Help",
    preview: "Got help understanding the power rule and chain rule for derivatives. Worked through several practice problems.",
    timestamp: "2 days ago",
    duration: "45 min",
    isFavourite: true,
    messageCount: 23,
    topic: "Mathematics",
    lastActivity: "Jan 15, 2024"
  },
  {
    id: "2", 
    title: "Integration Techniques",
    preview: "Learned about integration by parts and substitution methods with step-by-step examples.",
    timestamp: "5 days ago",
    duration: "32 min", 
    isFavourite: true,
    messageCount: 18,
    topic: "Mathematics",
    lastActivity: "Jan 12, 2024"
  },
    {
    id: "3",
    title: "Limits and Continuity",
    preview: "Understanding limit theorems and how to evaluate limits using various techniques.",
    timestamp: "1 week ago",
    duration: "28 min",
    isFavourite: false,
    messageCount: 15,
    topic: "Mathematics",
    lastActivity: "Jan 10, 2024"
  },
  {
    id: "4",
    title: "Function Analysis",
    preview: "Analyzing functions for domain, range, and behavior. Graphing techniques discussed.",
    timestamp: "1 week ago", 
    duration: "38 min",
    isFavourite: false,
    messageCount: 21,
    topic: "Mathematics",
    lastActivity: "Jan 9, 2024"
  },
  {
    id: "5",
    title: "Algebra Review Session",
    preview: "Quick review of algebraic manipulation and solving complex equations before calculus.",
    timestamp: "2 weeks ago",
    duration: "25 min",
    isFavourite: false,
    messageCount: 12,
    topic: "Mathematics", 
    lastActivity: "Jan 3, 2024"
  },
  {
    id: "6",
    title: "Trigonometry Applications",
    preview: "Applied trigonometric functions to real-world problems and calculus contexts.",
    timestamp: "2 weeks ago",
    duration: "41 min",
    isFavourite: true,
    messageCount: 19,
    topic: "Mathematics",
    lastActivity: "Jan 2, 2024"
  }
];

const sampleQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "Derivatives Practice Quiz",
    description: "Test your understanding of derivative rules including power rule, product rule, and chain rule.",
    timestamp: "3 days ago",
    duration: "30 min",
    isFavourite: true,
    questionCount: 15,
    score: 13,
    maxScore: 15,
    topic: "Calculus",
    status: "completed",
    difficulty: "medium",
    lastActivity: "Jan 14, 2024"
  },
  {
    id: "q2",
    title: "Limits and Continuity Assessment",
    description: "Comprehensive quiz covering limit evaluation techniques and continuity concepts.",
    timestamp: "1 week ago",
    duration: "45 min",
    isFavourite: true,
    questionCount: 20,
    score: 18,
    maxScore: 20,
    topic: "Calculus",
    status: "completed",
    difficulty: "hard",
    lastActivity: "Jan 10, 2024"
  },
  {
    id: "q3",
    title: "Basic Algebra Review",
    description: "Foundational algebra skills including equation solving and polynomial operations.",
    timestamp: "1 week ago",
    duration: "25 min",
    isFavourite: false,
    questionCount: 12,
    score: 10,
    maxScore: 12,
    topic: "Algebra",
    status: "completed",
    difficulty: "easy",
    lastActivity: "Jan 11, 2024"
  },
  {
    id: "q4",
    title: "Integration Techniques",
    description: "Practice problems for integration by parts, substitution, and partial fractions.",
    timestamp: "2 weeks ago",
    duration: "40 min",
    isFavourite: false,
    questionCount: 18,
    status: "in-progress",
    difficulty: "hard",
    topic: "Calculus",
    maxScore: 18,
    lastActivity: "Jan 5, 2024"
  },
  {
    id: "q5",
    title: "Function Properties Quiz",
    description: "Analyze domain, range, and behavior of various mathematical functions.",
    timestamp: "2 weeks ago",
    duration: "35 min",
    isFavourite: false,
    questionCount: 14,
    status: "not-started",
    difficulty: "medium",
    topic: "Functions",
    maxScore: 14,
    lastActivity: "Jan 8, 2024"
  },
  {
    id: "q6",
    title: "Trigonometry Applications",
    description: "Real-world problems involving trigonometric functions and identities.",
    timestamp: "3 weeks ago",
    duration: "30 min",
    isFavourite: true,
    questionCount: 16,
    score: 14,
    maxScore: 16,
    topic: "Trigonometry",
    status: "completed",
    difficulty: "medium",
    lastActivity: "Dec 28, 2023"
  }
];
