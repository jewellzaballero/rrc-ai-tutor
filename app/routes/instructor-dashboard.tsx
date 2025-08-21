import { Link } from "react-router";

export default function InstructorDashboard() {
  // Mock data for demonstration
  const courses = [
    {
      id: 1,
      name: "Computer Programming 101",
      code: "PROG-1400",
      activeStudents: 45,
      totalQuestions: 234,
      avgEngagement: 78,
      recentActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Database Design",
      code: "DB-2100",
      activeStudents: 38,
      totalQuestions: 189,
      avgEngagement: 82,
      recentActivity: "1 hour ago"
    },
    {
      id: 3,
      name: "Web Development",
      code: "WEB-1500",
      activeStudents: 52,
      totalQuestions: 312,
      avgEngagement: 74,
      recentActivity: "30 minutes ago"
    }
  ];

  const commonQuestions = [
    {
      question: "How do I fix null pointer exceptions?",
      frequency: 28,
      course: "PROG-1400",
      trend: "up"
    },
    {
      question: "What's the difference between JOIN types in SQL?",
      frequency: 24,
      course: "DB-2100", 
      trend: "stable"
    },
    {
      question: "How to center a div with CSS?",
      frequency: 19,
      course: "WEB-1500",
      trend: "down"
    },
    {
      question: "When should I use arrays vs lists?",
      frequency: 17,
      course: "PROG-1400",
      trend: "up"
    }
  ];

  const materialUsage = [
    {
      name: "Programming Fundamentals.pdf",
      course: "PROG-1400",
      queries: 156,
      lastUsed: "5 minutes ago",
      effectiveness: 92
    },
    {
      name: "SQL Reference Guide.pdf",
      course: "DB-2100",
      queries: 143,
      lastUsed: "12 minutes ago",
      effectiveness: 88
    },
    {
      name: "JavaScript Basics Slides",
      course: "WEB-1500",
      queries: 98,
      lastUsed: "1 hour ago",
      effectiveness: 85
    },
    {
      name: "Assignment 3 Instructions",
      course: "PROG-1400",
      queries: 76,
      lastUsed: "2 hours ago",
      effectiveness: 79
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Instructor Dashboard</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI Tutor Management Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Students</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">135</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Questions Today</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">89</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Engagement</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">78%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Materials Used</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Engagement by Course */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Engagement</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Student activity and AI tutor usage by course</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</h3>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{course.avgEngagement}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span>{course.code} • {course.activeStudents} students</span>
                        <span>{course.totalQuestions} questions</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.avgEngagement}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last activity: {course.recentActivity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Common Questions</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Most frequently asked questions and misunderstood topics</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {commonQuestions.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      item.trend === 'up' ? 'bg-red-100 dark:bg-red-900/20' :
                      item.trend === 'down' ? 'bg-green-100 dark:bg-green-900/20' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <svg className={`w-3 h-3 ${
                        item.trend === 'up' ? 'text-red-600 dark:text-red-400' :
                        item.trend === 'down' ? 'text-green-600 dark:text-green-400' :
                        'text-gray-500 dark:text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.trend === 'up' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        ) : item.trend === 'down' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        )}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.question}</p>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.course}</span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.frequency} times</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Materials Monitoring */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">AI Training Materials</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Monitor which materials are being used for AI training and retrieval</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Queries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Effectiveness
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Last Used
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {materialUsage.map((material, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg mr-3">
                            <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{material.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                        {material.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                        {material.queries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                material.effectiveness >= 90 ? 'bg-green-500' :
                                material.effectiveness >= 80 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${material.effectiveness}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{material.effectiveness}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {material.lastUsed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
