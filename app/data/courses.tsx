export interface Course {
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

export interface ArchivedCourse {
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

export const sampleCourses: Course[] = [
  {
    id: 1,
    courseCode: "MATH-1200",
    title: "Mathematics Fundamentals",
    description: "Fundamental concepts in algebra and introductory calculus including functions, graphing, limits, derivatives, and applications to real-world problems.",
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

export const archivedCourses: ArchivedCourse[] = [
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

// Utility function to get course by ID
export function getCourseById(courseId: string | number): Course | ArchivedCourse | undefined {
  const id = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId;
  
  // First check active courses
  const activeCourse = sampleCourses.find(course => course.id === id);
  if (activeCourse) return activeCourse;
  
  // Then check archived courses
  return archivedCourses.find(course => course.id === id);
}
