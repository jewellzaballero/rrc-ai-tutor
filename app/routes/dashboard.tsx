import type { Route } from "./+types/dashboard";
import { Link, Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - RRC AI Tutor" },
    { name: "description", content: "Your personalized RRC AI Tutor dashboard" },
  ];
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                RRC AI Tutor Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Form method="post" action="/signin">
                <input type="hidden" name="_action" value="logout" />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </Form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to continue your learning journey with AI-powered tutoring.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400"
                >
                  <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Study Sessions
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Start a new AI-powered study session or continue where you left off.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Start Learning
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Progress
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Track your learning achievements and milestones.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                <span className="text-gray-900 dark:text-white font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600 dark:text-purple-400"
                >
                  <path d="M12 2v6.5l3-1.5" />
                  <path d="m6 6 1.5 1.5L6 9" />
                  <path d="M16 8a5 5 0 1 1-5-5v5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Your latest learning activities and achievements.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Completed Math Module 3
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Quiz Score: 92%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Study streak: 5 days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Courses</span>
            </button>
            <button className="p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 dark:text-orange-400">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1h-1V4c0-.552-.448-1-1-1H4c-.552 0-1 .448-1 1v3H2c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h1v3c0 .552.448 1 1 1h15c.552 0 1-.448 1-1v-3h1z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignments</span>
            </button>
            <button className="p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resources</span>
            </button>
            <button className="p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600 dark:text-teal-400">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4" />
                  <rect x="2" y="9" width="20" height="12" rx="2" ry="2" />
                  <circle cx="12" cy="15" r="1" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
