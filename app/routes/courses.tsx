import { Link } from "react-router";
import { Header } from "../components/Header";

interface Course {
  id: number;
  title: string;
  description: string;
  statusColor: string;
  progress: number;
  dueDate: string;
  modulesCompleted: number;
  totalModules: number;
  hasSessionHistory: boolean;
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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Courses"
        subtitle="Manage your learning courses and assignments"
      />

      {/* Main Content */}
      <main className="p-6 overflow-y-auto flex-1">
          {/* Courses Grid */}
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
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {course.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
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
                  
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
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

          {/* Empty State (if no courses) */}
          {sampleCourses.length === 0 && (
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
            </div>
          )}
        </main>
    </div>
  );
}

const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    description: "Complete algebra and calculus modules with AI assistance",
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
    title: "Computer Science Project",
    description: "Build a web application using modern frameworks",
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
    title: "Research Paper",
    description: "AI in Education: Current trends and future possibilities",
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
