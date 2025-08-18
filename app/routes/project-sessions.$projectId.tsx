import { Link, useParams } from "react-router";
import { useState } from "react";
import { SideNavigation } from "../components/SideNavigation";

export function meta() {
  return [
    { title: "Project Sessions - RRC AI Tutor" },
    { name: "description", content: "View your AI chat sessions for this project" },
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

export default function ProjectSessions() {
  const params = useParams();
  const projectId = params.projectId;
  const projectTitle = "Project";
  
  const [sessions, setSessions] = useState<ChatSession[]>(sampleSessions);

  const toggleFavourite = (sessionId: string) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId
          ? { ...session, isFavourite: !session.isFavourite }
          : session
      )
    );
  };

  const favouriteSessions = sessions.filter(session => session.isFavourite);
  const recentSessions = sessions
    .filter(session => !session.isFavourite)
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideNavigation />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Link
                    to="/projects"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projectTitle} Sessions
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Your AI chat sessions and study history for this project
                </p>
              </div>
              <Link
                to={`/chat?sessionId=new&course=${encodeURIComponent(projectTitle)}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                New Chat Session
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {/* Project Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sessions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Favourites</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{favouriteSessions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
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
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Favourites Section */}
          {favouriteSessions.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Favourite Sessions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favouriteSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onToggleFavourite={toggleFavourite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Sessions</h2>
            </div>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onToggleFavourite={toggleFavourite}
                  isCompact
                />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {sessions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No chat sessions yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start your first AI tutoring session for this project
              </p>
              <Link 
                to="/chat"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Start First Session
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: ChatSession;
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
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full whitespace-nowrap">
              {session.topic}
            </span>
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
