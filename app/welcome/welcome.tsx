import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Subtle Instructor Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          to="/instructor/signin"
          className="group flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <span>Instructor</span>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Hero Section */}
          <header className="space-y-6">
            <div className="w-24 h-24 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              RRC AI Tutor
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Your intelligent learning companion for Red River College courses. 
              Get personalized tutoring, instant answers, and academic support powered by AI.
            </p>
          </header>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Instant Help
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate answers to your questions 24/7. No waiting for office hours.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Personalized Learning
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored explanations that adapt to your learning style and pace.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Course Integration
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Seamlessly integrated with your RRC curriculum and course materials.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sign in with your RRC student credentials to access your personalized AI tutor.
            </p>
            <Link
              to="/signin"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors text-center"
            >
              Sign In to Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


