import { useSearchParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
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
  isFavourite?: boolean;
  duration?: string;
  topic?: string;
}



export default function Chat() {
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const sessionIdParam = searchParams.get("sessionId");
  const courseParam = searchParams.get("course");
  const courseIdParam = searchParams.get("courseId");
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionIdParam);

  // If no session is selected, navigate to courses
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
  const [currentSessionId, setCurrentSessionId] = useState<string>(sessionId);
  const [sessions, setSessions] = useState<ChatSession[]>(getSampleSessionsForCourse(courseName || ''));
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const currentSession = currentSessionId === 'new' ? null : sessions.find(s => s.id === currentSessionId);

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when session changes or component mounts
  useEffect(() => {
    // Small delay to ensure DOM has updated with new messages
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSessionId]);

  // Initial scroll to bottom when component first loads
  useEffect(() => {
    scrollToBottom();
  }, []);
  
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
  const recentSessionsList = sessions
    .filter(session => !session.isFavourite)
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
  
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
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          
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
        </div>
      </Header>
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Left Sidebar - Chat Sessions */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-50 md:z-auto w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}>
          <div className="p-4 space-y-4">
            {/* New Chat Button */}
            <button
              onClick={() => {
                setCurrentSessionId('new');
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                currentSessionId === 'new'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">New Chat</span>
              </div>
            </button>
            
            {/* Favourite Sessions */}
            {favouriteSessions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Favourites</h3>
                </div>
                <div className="space-y-2">
                  {favouriteSessions.map((session) => (
                    <SidebarSessionCard
                      key={session.id}
                      session={session}
                      isActive={currentSessionId === session.id}
                      onSelect={() => {
                        setCurrentSessionId(session.id);
                        setSidebarOpen(false);
                      }}
                      onToggleFavourite={() => toggleFavourite(session.id)}
                      courseId={courseId}
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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Sessions</h3>
              </div>
              <div className="space-y-2">
                {recentSessionsList.slice(0, 10).map((session) => (
                  <SidebarSessionCard
                    key={session.id}
                    session={session}
                    isActive={currentSessionId === session.id}
                    onSelect={() => {
                      setCurrentSessionId(session.id);
                      setSidebarOpen(false);
                    }}
                    onToggleFavourite={() => toggleFavourite(session.id)}
                    courseId={courseId}
                  />
                ))}
              </div>
          </div>
        </div>
      </div>

                {/* Right Chat Area */}
        <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                      {currentSessionId === 'new' ? (
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
                    {courseName ? (
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
            getSampleMessages(currentSessionId).map((message) => (
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
                      {currentSessionId !== 'new' && (
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

            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
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
        </div>
    </div>
  );
}

// Generate sample messages for different sessions
function getSampleMessages(sessionId: string): Array<{id: number, content: string, isUser: boolean, timestamp: string}> {
  const baseMessages = [
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

  // Add more messages for longer conversations to demonstrate scrolling
  if (sessionId === "1") {
    return [
      ...baseMessages,
      {
        id: 6,
        content: "Can you help me with the chain rule as well?",
        isUser: true,
        timestamp: "10:10 AM",
      },
      {
        id: 7,
        content: "Of course! The chain rule is used when you have a composite function - a function inside another function.\n\nThe chain rule states: If y = f(g(x)), then dy/dx = f'(g(x)) × g'(x)\n\nIn other words, you take the derivative of the outer function (keeping the inner function unchanged), then multiply by the derivative of the inner function.\n\nLet me show you an example with f(x) = (3x + 1)²",
        isUser: false,
        timestamp: "10:11 AM",
      },
      {
        id: 8,
        content: "That makes sense! So for (3x + 1)², the outer function is u² and the inner function is u = 3x + 1?",
        isUser: true,
        timestamp: "10:13 AM",
      },
      {
        id: 9,
        content: "Exactly right! You've got it!\n\n• Outer function: f(u) = u², so f'(u) = 2u\n• Inner function: g(x) = 3x + 1, so g'(x) = 3\n• Apply chain rule: f'(g(x)) × g'(x) = 2(3x + 1) × 3 = 6(3x + 1) = 18x + 6\n\nSo the derivative of (3x + 1)² is 18x + 6. You can verify this by expanding (3x + 1)² = 9x² + 6x + 1 and taking the derivative directly!",
        isUser: false,
        timestamp: "10:14 AM",
      },
      {
        id: 10,
        content: "Perfect! Let me try another one: what about sin(2x)?",
        isUser: true,
        timestamp: "10:16 AM",
      },
      {
        id: 11,
        content: "Great example for the chain rule with trigonometric functions!\n\nFor sin(2x):\n• Outer function: sin(u), so the derivative is cos(u)\n• Inner function: u = 2x, so the derivative is 2\n• Apply chain rule: cos(2x) × 2 = 2cos(2x)\n\nSo d/dx[sin(2x)] = 2cos(2x)\n\nThis pattern works for all trig functions: the derivative of sin(kx) is k×cos(kx), cos(kx) is -k×sin(kx), etc.",
        isUser: false,
        timestamp: "10:17 AM",
      },
      {
        id: 12,
        content: "This is really helpful! I think I'm starting to understand the pattern. Thank you so much!",
        isUser: true,
        timestamp: "10:19 AM",
      }
    ];
  } else if (sessionId === "2") {
    return [
      {
        id: 1,
        content: "Hi! I'm ready to help you with integration techniques. What would you like to work on?",
        isUser: false,
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        content: "I need help with integration by parts. I keep getting confused about which part to choose as u and which as dv.",
        isUser: true,
        timestamp: "9:01 AM",
      },
      {
        id: 3,
        content: "Great question! Integration by parts uses the formula: ∫u dv = uv - ∫v du\n\nThe key is choosing u and dv wisely. Use the LIATE priority:\n• L - Logarithmic functions\n• I - Inverse trig functions  \n• A - Algebraic functions\n• T - Trigonometric functions\n• E - Exponential functions\n\nChoose u as the function highest on this list, and dv as the rest.",
        isUser: false,
        timestamp: "9:02 AM",
      },
      {
        id: 4,
        content: "So for ∫x sin(x) dx, I should choose u = x (algebraic) and dv = sin(x) dx (trigonometric)?",
        isUser: true,
        timestamp: "9:04 AM",
      },
      {
        id: 5,
        content: "Perfect! You've got it exactly right!\n\nFor ∫x sin(x) dx:\n• u = x, so du = dx\n• dv = sin(x) dx, so v = -cos(x)\n\nApplying the formula:\n∫x sin(x) dx = x(-cos(x)) - ∫(-cos(x)) dx\n= -x cos(x) + ∫cos(x) dx\n= -x cos(x) + sin(x) + C\n\nThat's the complete solution!",
        isUser: false,
        timestamp: "9:05 AM",
      }
    ];
  }

  return baseMessages;
}

const sampleMessages = getSampleMessages("1");

const quickSuggestions = [
  "Explain this concept",
  "Show me an example", 
  "Check my work",
  "What's the next step?",
  "Help with homework",
];

// Sidebar Session Card Component
interface SidebarSessionCardProps {
  session: ChatSession;
  isActive: boolean;
  onSelect: () => void;
  onToggleFavourite: () => void;
  courseId?: string | null;
}

function SidebarSessionCard({ session, isActive, onSelect, onToggleFavourite }: SidebarSessionCardProps) {
  return (
    <div 
      className={`p-3 rounded-lg cursor-pointer transition-colors relative group ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium truncate ${
            isActive ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
          }`}>
            {session.title}
          </h4>
          <p className={`text-xs mt-1 line-clamp-2 ${
            isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {session.preview}
          </p>
          <div className={`flex items-center gap-3 mt-2 text-xs ${
            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500'
          }`}>
            <span>{session.timestamp}</span>
            <span>{session.messageCount} messages</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite();
          }}
          className={`ml-2 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100 ${
            session.isFavourite
              ? 'text-yellow-500 hover:text-yellow-600 opacity-100'
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={session.isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Helper function to get sessions for a specific course
function getSampleSessionsForCourse(courseName: string): ChatSession[] {
  const allSessions = [
    {
      id: "1",
      title: "Calculus Derivatives Help",
      preview: "Got help understanding the power rule and chain rule for derivatives. Worked through several practice problems.",
      timestamp: "2 days ago",
      course: "Mathematics Fundamentals",
      messageCount: 23,
      lastActivity: "Jan 15, 2024",
      isFavourite: true,
      duration: "45 min",
      topic: "Mathematics"
    },
    {
      id: "2", 
      title: "Integration Techniques",
      preview: "Learned about integration by parts and substitution methods with step-by-step examples.",
      timestamp: "5 days ago",
      course: "Mathematics Fundamentals", 
      messageCount: 18,
      lastActivity: "Jan 12, 2024",
      isFavourite: true,
      duration: "32 min",
      topic: "Mathematics"
    },
    {
      id: "3",
      title: "Limits and Continuity",
      preview: "Understanding limit theorems and how to evaluate limits using various techniques.",
      timestamp: "1 week ago",
      course: "Mathematics Fundamentals",
      messageCount: 15,
      lastActivity: "Jan 10, 2024",
      isFavourite: false,
      duration: "28 min",
      topic: "Mathematics"
    },
    {
      id: "4",
      title: "Function Analysis",
      preview: "Analyzing functions for domain, range, and behavior. Graphing techniques discussed.",
      timestamp: "1 week ago", 
      course: "Mathematics Fundamentals",
      messageCount: 21,
      lastActivity: "Jan 9, 2024",
      isFavourite: false,
      duration: "38 min",
      topic: "Mathematics"
    },
    {
      id: "5",
      title: "Programming Logic Concepts", 
      preview: "Understanding loops, conditionals, and functions in JavaScript. Worked through coding examples.",
      timestamp: "1 week ago",
      course: "Computer Science",
      messageCount: 31,
      lastActivity: "Jan 10, 2024",
      isFavourite: false,
      duration: "55 min",
      topic: "Programming"
    },
    {
      id: "6",
      title: "Chemistry Stoichiometry",
      preview: "Balancing chemical equations and calculating molar relationships. Solved practice problems.",
      timestamp: "1 week ago", 
      course: "General Chemistry",
      messageCount: 15,
      lastActivity: "Jan 9, 2024",
      isFavourite: false,
      duration: "40 min",
      topic: "Chemistry"
    }
  ];
  
  // Filter sessions for the current course (fallback to all if no specific course)
  if (!courseName) return allSessions;
  
  return allSessions.filter(session => 
    session.course.toLowerCase().includes(courseName.toLowerCase()) ||
    courseName.toLowerCase().includes(session.course.toLowerCase().split(' ')[0])
  );
}

const recentSessions: ChatSession[] = [
  {
    id: "1",
    title: "Calculus Derivatives Help",
    preview: "Got help understanding the power rule and chain rule for derivatives. Worked through several practice problems and examples.",
    timestamp: "2 days ago",
    course: "Mathematics Fundamentals",
    messageCount: 23,
    lastActivity: "Jan 15, 2024",
    isFavourite: true,
    duration: "45 min",
    topic: "Mathematics"
  },
  {
    id: "2", 
    title: "Integration Techniques",
    preview: "Learned about integration by parts and substitution methods with step-by-step examples and practice problems.",
    timestamp: "5 days ago",
    course: "Mathematics Fundamentals", 
    messageCount: 18,
    lastActivity: "Jan 12, 2024",
    isFavourite: false,
    duration: "32 min",
    topic: "Mathematics"
  },
  {
    id: "3",
    title: "Programming Logic Concepts", 
    preview: "Understanding loops, conditionals, and functions in JavaScript. Worked through coding examples and debugging.",
    timestamp: "1 week ago",
    course: "Computer Science",
    messageCount: 31,
    lastActivity: "Jan 10, 2024",
    isFavourite: false,
    duration: "55 min",
    topic: "Programming"
  },
  {
    id: "4",
    title: "Chemistry Stoichiometry",
    preview: "Balancing chemical equations and calculating molar relationships. Solved practice problems step by step.",
    timestamp: "1 week ago", 
    course: "General Chemistry",
    messageCount: 15,
    lastActivity: "Jan 9, 2024",
    isFavourite: false,
    duration: "40 min",
    topic: "Chemistry"
  },
  {
    id: "5",
    title: "Business Analytics Discussion",
    preview: "Analyzing data trends and creating visualizations. Discussed statistical methods and interpretation techniques.",
    timestamp: "2 weeks ago",
    course: "Business Administration",
    messageCount: 27,
    lastActivity: "Jan 3, 2024",
    isFavourite: false,
    duration: "50 min",
    topic: "Business"
  }
];
