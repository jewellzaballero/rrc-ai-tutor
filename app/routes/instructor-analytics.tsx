import { InstructorLayout } from "~/components/InstructorLayout";

export default function InstructorAnalytics() {
  // Mock data for demonstration
  const engagementData = {
    courseEngagement: [
      { course: "PROG-1400", students: 45, sessions: 234, avgDuration: "12m", satisfaction: 4.2 },
      { course: "DB-2100", students: 38, sessions: 189, avgDuration: "15m", satisfaction: 4.5 },
      { course: "WEB-1500", students: 52, sessions: 312, avgDuration: "10m", satisfaction: 4.0 }
    ],
    moduleEngagement: [
      { module: "Variables & Data Types", course: "PROG-1400", completion: 89, avgScore: 85, difficulty: "Easy" },
      { module: "Control Structures", course: "PROG-1400", completion: 76, avgScore: 72, difficulty: "Medium" },
      { module: "Functions & Methods", course: "PROG-1400", completion: 68, avgScore: 79, difficulty: "Hard" },
      { module: "SQL Joins", course: "DB-2100", completion: 82, avgScore: 74, difficulty: "Medium" },
      { module: "Database Normalization", course: "DB-2100", completion: 64, avgScore: 68, difficulty: "Hard" }
    ],
    studentCohorts: [
      { cohort: "Fall 2024 - Section A", students: 28, avgEngagement: 85, topPerformers: 8, struggling: 3 },
      { cohort: "Fall 2024 - Section B", students: 24, avgEngagement: 78, topPerformers: 6, struggling: 5 },
      { cohort: "Fall 2024 - Section C", students: 31, avgEngagement: 92, topPerformers: 12, struggling: 2 }
    ]
  };

  const highFrictionTopics = [
    { topic: "Null Pointer Exceptions", course: "PROG-1400", frequency: 45, avgResolutionTime: "8m", successRate: 76 },
    { topic: "SQL JOIN Types", course: "DB-2100", frequency: 38, avgResolutionTime: "12m", successRate: 82 },
    { topic: "CSS Grid Layout", course: "WEB-1500", frequency: 31, avgResolutionTime: "15m", successRate: 68 },
    { topic: "Array vs ArrayList", course: "PROG-1400", frequency: 28, avgResolutionTime: "6m", successRate: 85 },
    { topic: "Database Constraints", course: "DB-2100", frequency: 24, avgResolutionTime: "10m", successRate: 73 }
  ];

  const learningStyles = [
    { style: "Visual Learners", percentage: 42, preference: "Diagrams & Charts" },
    { style: "Practical Learners", percentage: 35, preference: "Code Examples" },
    { style: "Theoretical Learners", percentage: 23, preference: "Detailed Explanations" }
  ];

  const languageUsage = [
    { language: "English", percentage: 85, regions: ["North America", "UK"] },
    { language: "French", percentage: 12, regions: ["Quebec", "France"] },
    { language: "Spanish", percentage: 3, regions: ["Latin America"] }
  ];

  const quizPerformance = [
    { quiz: "Java Basics", course: "PROG-1400", attempts: 145, avgScore: 78, passRate: 89 },
    { quiz: "SQL Fundamentals", course: "DB-2100", attempts: 124, avgScore: 82, passRate: 92 },
    { quiz: "HTML/CSS Basics", course: "WEB-1500", attempts: 167, avgScore: 75, passRate: 85 },
    { quiz: "Object-Oriented Programming", course: "PROG-1400", attempts: 98, avgScore: 71, passRate: 78 }
  ];

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Comprehensive insights into student engagement, learning patterns, and performance metrics
          </p>
        </div>

        {/* Course Engagement Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Engagement Overview</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Student activity and satisfaction metrics by course
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Students</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Sessions</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Avg Duration</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Satisfaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {engagementData.courseEngagement.map((course, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">{course.course}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{course.students}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{course.sessions}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{course.avgDuration}</td>
                      <td className="py-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-slate-900 dark:text-white mr-2">{course.satisfaction}</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= Math.floor(course.satisfaction) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Module Engagement */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Module Performance</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Completion rates and average scores by module
              </p>
            </div>
            <div className="p-6 space-y-4">
              {engagementData.moduleEngagement.map((module, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">{module.module}</h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{module.course}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span>Completion: {module.completion}%</span>
                      <span>Avg Score: {module.avgScore}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        module.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        module.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${module.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Cohorts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Student Cohort Performance</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Engagement metrics by class section
              </p>
            </div>
            <div className="p-6 space-y-6">
              {engagementData.studentCohorts.map((cohort, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">{cohort.cohort}</h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{cohort.students} students</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">{cohort.topPerformers}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Top Performers</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{cohort.avgEngagement}%</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Avg Engagement</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-red-600 dark:text-red-400">{cohort.struggling}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Need Support</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High Friction Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">High Friction Topics</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Topics where students frequently seek help and struggle most
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Topic</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Help Requests</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Avg Resolution</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Success Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {highFrictionTopics.map((topic, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">{topic.topic}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{topic.course}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{topic.frequency}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{topic.avgResolutionTime}</td>
                      <td className="py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          topic.successRate >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          topic.successRate >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {topic.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Styles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Learning Preferences</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Student learning style distribution</p>
            </div>
            <div className="p-6 space-y-4">
              {learningStyles.map((style, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{style.style}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{style.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${style.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{style.preference}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Language Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Language Usage</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Preferred interaction languages</p>
            </div>
            <div className="p-6 space-y-4">
              {languageUsage.map((lang, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{lang.language}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{lang.regions.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quiz Performance</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Assessment completion and scores</p>
            </div>
            <div className="p-6 space-y-4">
              {quizPerformance.map((quiz, index) => (
                <div key={index} className="border border-slate-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">{quiz.quiz}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{quiz.course}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="font-medium">Attempts:</span> {quiz.attempts}
                    </div>
                    <div>
                      <span className="font-medium">Avg:</span> {quiz.avgScore}%
                    </div>
                    <div>
                      <span className="font-medium">Pass:</span> {quiz.passRate}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
