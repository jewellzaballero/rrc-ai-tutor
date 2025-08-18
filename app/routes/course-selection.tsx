import { Link } from "react-router";
import { useState } from "react";
import { SideNavigation } from "../components/SideNavigation";

export function meta() {
  return [
    { title: "Course Selection - RRC AI Tutor" },
    { name: "description", content: "Select a course to create a new course" },
  ];
}

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  program: string;
  term: string;
  credits: number;
  instructor: string;
  schedule: string;
}

export default function CourseSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");

  // Filter courses based on search term and program
  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = selectedProgram === "all" || course.program === selectedProgram;
    
    return matchesSearch && matchesProgram;
  });

  // Get unique programs for filter dropdown
  const programs = [...new Set(sampleCourses.map(course => course.program))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideNavigation />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Selection</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Choose a course to create your new course
                </p>
              </div>
              <Link
                to="/courses"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Courses
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search courses by name, code, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Program Filter */}
              <div className="md:w-64">
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="all">All Programs</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredCourses.length} of {sampleCourses.length} courses
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow h-[420px] flex flex-col"
              >
                {/* Course Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {course.code}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {course.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {course.description}
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">{course.program}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">{course.term}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.instructor}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.schedule}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link
                    to={`/course-setup?course=${encodeURIComponent(course.code)}&courseName=${encodeURIComponent(course.name)}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
                  >
                    Create Course
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search terms or filters
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedProgram("all");
                }}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const sampleCourses: Course[] = [
  {
    id: "1",
    code: "COMP-1000",
    name: "Introduction to Computer Programming",
    description: "Learn fundamental programming concepts using modern programming languages. Topics include variables, control structures, functions, and basic data structures.",
    program: "Computer Science Technology",
    term: "Fall 2024",
    credits: 4,
    instructor: "Dr. Sarah Johnson",
    schedule: "Mon/Wed 9:00-10:30 AM"
  },
  {
    id: "2",
    code: "MATH-1200",
    name: "Calculus for Technology",
    description: "Differential and integral calculus with applications to technology and engineering. Emphasis on practical problem-solving techniques.",
    program: "Engineering Technology",
    term: "Fall 2024",
    credits: 3,
    instructor: "Prof. Michael Chen",
    schedule: "Tue/Thu 1:00-2:30 PM"
  },
  {
    id: "3",
    code: "BUS-2100",
    name: "Business Analytics",
    description: "Introduction to data analysis and visualization for business decision-making. Covers statistical methods, data mining, and business intelligence tools.",
    program: "Business Administration",
    term: "Winter 2025",
    credits: 3,
    instructor: "Dr. Emily Rodriguez",
    schedule: "Mon/Wed/Fri 11:00-12:00 PM"
  },
  {
    id: "4",
    code: "NURS-1500",
    name: "Fundamentals of Nursing Practice",
    description: "Basic principles of nursing care including assessment, planning, intervention, and evaluation. Laboratory and clinical components included.",
    program: "Practical Nursing",
    term: "Fall 2024",
    credits: 5,
    instructor: "Prof. Jennifer Lee",
    schedule: "Tue/Thu 8:00-11:00 AM"
  },
  {
    id: "5",
    code: "ELEC-2300",
    name: "Digital Electronics",
    description: "Study of digital logic circuits, Boolean algebra, combinational and sequential logic. Hands-on experience with modern digital systems.",
    program: "Electrical Engineering Technology",
    term: "Winter 2025",
    credits: 4,
    instructor: "Dr. Robert Kim",
    schedule: "Mon/Wed 2:00-4:00 PM"
  },
  {
    id: "6",
    code: "WELD-1100",
    name: "Introduction to Welding",
    description: "Basic welding techniques including SMAW, GMAW, and GTAW processes. Safety procedures and metallurgy fundamentals covered.",
    program: "Welding Technology",
    term: "Fall 2024",
    credits: 4,
    instructor: "Prof. David Martinez",
    schedule: "Tue/Thu 9:00-12:00 PM"
  },
  {
    id: "7",
    code: "CHEM-1400",
    name: "General Chemistry",
    description: "Fundamental principles of chemistry including atomic structure, chemical bonding, stoichiometry, and thermodynamics with laboratory work.",
    program: "Chemical Technology",
    term: "Fall 2024",
    credits: 4,
    instructor: "Dr. Lisa Wang",
    schedule: "Mon/Wed/Fri 10:00-11:00 AM"
  },
  {
    id: "8",
    code: "AUTO-1800",
    name: "Automotive Systems",
    description: "Comprehensive study of modern automotive systems including engine operation, electrical systems, and diagnostic procedures.",
    program: "Automotive Technology",
    term: "Winter 2025",
    credits: 5,
    instructor: "Prof. James Thompson",
    schedule: "Tue/Thu 1:00-4:00 PM"
  },
  {
    id: "9",
    code: "COMP-2500",
    name: "Database Design and Management",
    description: "Design and implementation of relational databases. Topics include normalization, SQL, database security, and performance optimization.",
    program: "Computer Science Technology",
    term: "Winter 2025",
    credits: 3,
    instructor: "Dr. Amanda Garcia",
    schedule: "Mon/Wed 3:00-4:30 PM"
  },
  {
    id: "10",
    code: "MECH-2200",
    name: "Thermodynamics",
    description: "Principles of thermodynamics applied to mechanical systems. Energy conversion, heat transfer, and power cycles in engineering applications.",
    program: "Mechanical Engineering Technology",
    term: "Fall 2024",
    credits: 4,
    instructor: "Prof. Kevin Brown",
    schedule: "Tue/Thu 10:00-12:00 PM"
  },
  {
    id: "11",
    code: "ACCT-1300",
    name: "Financial Accounting Principles",
    description: "Introduction to financial accounting concepts, principles, and practices. Preparation and analysis of financial statements.",
    program: "Business Administration",
    term: "Fall 2024",
    credits: 3,
    instructor: "Dr. Patricia Wilson",
    schedule: "Mon/Wed/Fri 2:00-3:00 PM"
  },
  {
    id: "12",
    code: "ENVR-1600",
    name: "Environmental Science",
    description: "Study of environmental systems, pollution control, sustainability practices, and environmental regulations in industrial settings.",
    program: "Environmental Technology",
    term: "Winter 2025",
    credits: 3,
    instructor: "Dr. Mark Anderson",
    schedule: "Tue/Thu 11:00-12:30 PM"
  }
];
