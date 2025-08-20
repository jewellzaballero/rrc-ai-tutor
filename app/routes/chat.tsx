import { useSearchParams, Link, useNavigate } from "react-router";
import { useState } from "react";
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

export default function Chat() {
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get("sessionId");
  const courseParam = searchParams.get("course");
  const courseIdParam = searchParams.get("courseId");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionIdParam);

  // If no session is selected, show the session selector
  if (!currentSessionId) {
    navigate("/courses");
    return null;
  }

  // Show the chat interface for the selected session
  return <ChatInterface 
    sessionId={currentSessionId} 
    courseName={courseParam}
    courseId={courseIdParam}
    onBackToSessions={() => setCurrentSessionId(null)} 
  />;
}

// Chat Interface Component
function ChatInterface({ sessionId, courseName, courseId, onBackToSessions }: { sessionId: string; courseName?: string | null; courseId?: string | null; onBackToSessions: () => void }) {
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
                    {courseName 
                      ? `Hi! I'm your AI tutor. I'm ready to help you with ${courseName}. What specific topics or concepts would you like to explore together?`
                      : "Hi! I'm your AI tutor. I'm here to help you with your studies. What would you like to learn about today?"
                    }
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
