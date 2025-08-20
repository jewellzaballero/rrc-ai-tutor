import { Link } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { type Course, type ArchivedCourse, sampleCourses, archivedCourses } from "../data/courses";

export function meta() {
  return [
    { title: "Courses - RRC AI Tutor" },
    { name: "description", content: "Manage your learning courses and assignments" },
  ];
}

export default function Courses() {
  const [isArchivedExpanded, setIsArchivedExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Courses"
        subtitle="Manage your learning courses and assignments"
      />

      {/* Main Content */}
      <main className="p-6 overflow-y-auto flex-1">
          {/* Active Courses Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Courses</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Computer Science - Winter 2025</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Course Cards */}
              {sampleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow h-full flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${course.iconBg}`}>
                      {course.icon}
                    </div>
                  </div>
                  
                  {/* Course Header */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                        {course.courseCode}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                      {course.title}
                    </h3>
                  </div>

                  {/* Course Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as any,
                    overflow: 'hidden'
                  }}>
                    {course.description}
                  </p>
                  
                  {/* Progress Section */}
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course Metadata */}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span>Due: {course.dueDate}</span>
                    <span>{course.modulesCompleted}/{course.totalModules} modules</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link 
                    to={course.hasSessionHistory 
                      ? `/course-sessions/${course.id}?title=${encodeURIComponent(course.title)}`
                      : `/course-setup?course=${encodeURIComponent(course.title)}&courseId=${course.id}`
                    }
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors block text-center"
                  >
                    {course.hasSessionHistory ? 'View Course' : 'Set Up Course'}
                  </Link>
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archived Courses Section */}
          {archivedCourses.length > 0 && (
            <div className="mb-12">
              <button
                onClick={() => setIsArchivedExpanded(!isArchivedExpanded)}
                className="flex items-center gap-3 mb-6 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors group"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Archived Courses</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">({archivedCourses.length} past courses)</span>
                <div className="ml-auto">
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
                    className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                      isArchivedExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>
              
              {isArchivedExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archivedCourses.map((course) => (
                  <div
                    key={`archived-${course.id}`}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-6 opacity-90 hover:opacity-100 transition-all h-full flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${course.iconBg} opacity-75`}>
                          {course.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {course.completed && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                              Completed
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {course.semester} {course.year}
                          </span>
                        </div>
                      </div>
                      
                      {/* Course Header */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">
                            {course.courseCode}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>{course.instructor}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                          {course.title}
                        </h3>
                      </div>

                      {/* Course Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as any,
                        overflow: 'hidden'
                      }}>
                        {course.description}
                      </p>
                      
                      {/* Grade Section */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Final Grade</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-lg">{course.finalGrade}</span>
                        </div>
                      </div>

                      {/* Course Metadata */}
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span>{course.semester} {course.year}</span>
                        <span>{course.modulesCompleted}/{course.totalModules} modules</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link 
                        to={`/course-sessions/${course.id}?title=${encodeURIComponent(course.title)}&archived=true`}
                        className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors block text-center"
                      >
                        View Sessions
                      </Link>
                    </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Empty State (if no courses) */}
          {sampleCourses.length === 0 && archivedCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No courses yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by creating your first learning course
              </p>
              <Link 
                to="/course-setup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Create Your First Course
              </Link>
            </div>
          )}
        </main>
    </div>
  );
}


