import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Sign In - RRC AI Tutor" },
    { name: "description", content: "Sign in to your RRC AI Tutor account" },
  ];
}

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentNumber = formData.get("studentNumber");
    const password = formData.get("password");

    // Here you would typically validate credentials
    // For now, we'll just redirect to courses page
    console.log("Login attempt:", { studentNumber, password });
    
    navigate("/courses");
  };

  return (
    <main className="flex items-center justify-center min-h-screen pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 max-w-md mx-auto px-4">
        <header className="flex flex-col items-center gap-9">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your RRC AI Tutor account
            </p>
          </div>
        </header>

        <div className="w-full space-y-6">
          <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="studentNumber" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Student Number
                </label>
                <input
                  id="studentNumber"
                  name="studentNumber"
                  type="number"
                  required
                  pattern="[0-9]*"
                  placeholder="Enter your student number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  // Here you would typically navigate to forgot password page
                  // For now, we'll just show an alert
                  alert("Forgot password functionality coming soon!");
                }}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline focus:outline-none focus:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm hover:underline focus:outline-none focus:underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
