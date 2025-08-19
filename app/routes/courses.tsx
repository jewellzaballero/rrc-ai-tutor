import { Link } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";

interface Course {
  id: number;
  courseCode: string;
  title: string;
  description: string;
  instructor: string;
  statusColor: string;
  progress: number;
  dueDate: string;
  modulesCompleted: number;
  totalModules: number;
  hasSessionHistory: boolean;
  iconBg: string;
  icon: React.ReactNode;
}

interface ArchivedCourse {
  id: number;
  courseCode: string;
  title: string;
  description: string;
  instructor: string;
  semester: string;
  year: string;
  finalGrade: string;
  completed: boolean;
  modulesCompleted: number;
  totalModules: number;
  iconBg: string;
  icon: React.ReactNode;
}

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
              <Link 
                to="/course-setup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                New Course
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Course Cards */}
              {sampleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
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
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-6 opacity-90 hover:opacity-100 transition-all"
                  >
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

const sampleCourses: Course[] = [
  {
    id: 1,
    courseCode: "MATH-1200",
    title: "Mathematics Fundamentals",
    description: "Complete algebra and calculus modules with AI assistance",
    instructor: "Prof. Michael Chen",
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    progress: 75,
    dueDate: "Jan 30, 2024",
    modulesCompleted: 8,
    totalModules: 12,
    hasSessionHistory: true,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 2,
    courseCode: "COMP-2500",
    title: "Computer Science Project",
    description: "Build a web application using modern frameworks",
    instructor: "Dr. Amanda Garcia",
    statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    progress: 25,
    dueDate: "Feb 15, 2024",
    modulesCompleted: 3,
    totalModules: 15,
    hasSessionHistory: false,
    iconBg: "bg-green-100 dark:bg-green-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 3,
    courseCode: "RSRH-4100",
    title: "Research Paper",
    description: "AI in Education: Current trends and future possibilities",
    instructor: "Dr. Sarah Johnson",
    statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    progress: 90,
    dueDate: "Jan 20, 2024",
    modulesCompleted: 9,
    totalModules: 10,
    hasSessionHistory: true,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  }
];

const archivedCourses: ArchivedCourse[] = [
  {
    id: 101,
    courseCode: "COMP-1500",
    title: "Data Structures & Algorithms",
    description: "Comprehensive study of fundamental data structures and algorithmic problem solving",
    instructor: "Prof. Robert Kim",
    semester: "Fall",
    year: "2023",
    finalGrade: "A-",
    completed: true,
    modulesCompleted: 10,
    totalModules: 10,
    iconBg: "bg-indigo-100 dark:bg-indigo-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="7.5,4.21 12,6.81 16.5,4.21" />
        <polyline points="7.5,19.79 7.5,14.6 3,12" />
        <polyline points="21,12 16.5,14.6 16.5,19.79" />
      </svg>
    ),
  },
  {
    id: 102,
    courseCode: "STAT-2100",
    title: "Statistics for Business",
    description: "Applied statistical methods for business analysis and decision making",
    instructor: "Dr. Emily Rodriguez",
    semester: "Fall",
    year: "2023",
    finalGrade: "B+",
    completed: true,
    modulesCompleted: 8,
    totalModules: 8,
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 103,
    courseCode: "MKTG-1800",
    title: "Digital Marketing Fundamentals",
    description: "Comprehensive introduction to digital marketing strategies and analytics",
    instructor: "Prof. Jennifer Lee",
    semester: "Summer",
    year: "2023",
    finalGrade: "A",
    completed: true,
    modulesCompleted: 6,
    totalModules: 6,
    iconBg: "bg-pink-100 dark:bg-pink-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600 dark:text-pink-400">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="M16 4L20 8" />
      </svg>
    ),
  },
  {
    id: 104,
    courseCode: "PSYC-1100", 
    title: "Introduction to Psychology", 
    description: "Fundamentals of human behavior and psychological principles",
    instructor: "Dr. Lisa Wang",
    semester: "Winter",
    year: "2023",
    finalGrade: "B",
    completed: true,
    modulesCompleted: 12,
    totalModules: 12,
    iconBg: "bg-amber-100 dark:bg-amber-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c.552 0 1-.448 1-1V9c0-.552-.448-1-1-1h-1V6a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2H2c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1h1v2a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-2h1z" />
        <circle cx="12" cy="8" r="3" />
      </svg>
    ),
  },
  {
    id: 105,
    courseCode: "CHEM-2400",
    title: "Organic Chemistry I",
    description: "Structure, properties, and reactions of organic compounds",
    instructor: "Prof. David Martinez",
    semester: "Fall",
    year: "2022",
    finalGrade: "A-",
    completed: true,
    modulesCompleted: 14,
    totalModules: 14,
    iconBg: "bg-cyan-100 dark:bg-cyan-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600 dark:text-cyan-400">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6" />
        <path d="m21 12-6-3-6 3-6-3" />
        <path d="m21 12-6 3-6-3-6 3" />
        <path d="m3 12 6-3 6 3 6-3" />
      </svg>
    ),
  },
  {
    id: 106,
    courseCode: "HIST-1300",
    title: "Canadian History",
    description: "Exploration of Canadian historical development from confederation to present",
    instructor: "Dr. Patricia Wilson",
    semester: "Winter",
    year: "2022",
    finalGrade: "B+",
    completed: true,
    modulesCompleted: 9,
    totalModules: 9,
    iconBg: "bg-red-100 dark:bg-red-900",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
      </svg>
    ),
  }
];
