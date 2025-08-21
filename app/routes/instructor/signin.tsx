import { Link, useNavigate } from "react-router";

export default function InstructorSignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    // For demo purposes, we'll just redirect to the courses page
    navigate("/instructor/courses");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Back to Student View */}
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Student View
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-slate-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Instructor Portal
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Sign in with your RRC instructor credentials
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="instructor@rrc.ca"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-gray-600 text-slate-600 focus:ring-slate-600 dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-xl transition-colors"
              >
                Sign In to Instructor Portal
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Need help? Contact{' '}
                <a href="mailto:support@rrc.ca" className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline">
                  IT Support
                </a>
              </div>
            </div>
          </div>

          {/* Features specific to instructors */}
          <div className="mt-8 bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Instructor Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manage course content and materials
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Monitor student interactions and progress
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Customize AI responses and guidelines
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
