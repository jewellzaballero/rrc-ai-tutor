import { InstructorLayout } from "~/components/InstructorLayout";
import { Link } from "react-router";

export default function InstructorMaterials() {
  // Mock data for demonstration
  const courses = [
    { 
      id: 1, 
      name: "Computer Programming 101", 
      code: "PROG-1400",
      semester: "Fall 2024",
      status: "Active",
      students: 45,
      materials: 8
    },
    { 
      id: 2, 
      name: "Database Design", 
      code: "DB-2100",
      semester: "Fall 2024", 
      status: "Active",
      students: 38,
      materials: 6
    },
    { 
      id: 3, 
      name: "Web Development", 
      code: "WEB-1500",
      semester: "Fall 2024",
      status: "Active", 
      students: 52,
      materials: 12
    },
    { 
      id: 4, 
      name: "Advanced Programming", 
      code: "PROG-2400",
      semester: "Winter 2025",
      status: "Upcoming", 
      students: 0,
      materials: 3
    }
  ];

  const materials = [
    {
      id: 1,
      name: "Programming Fundamentals.pdf",
      course: "PROG-1400",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "Active",
      trainingStatus: "Trained",
      downloads: 156
    },
    {
      id: 2,
      name: "SQL Reference Guide.pdf",
      course: "DB-2100",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-12",
      status: "Active",
      trainingStatus: "Training",
      downloads: 143
    },
    {
      id: 3,
      name: "JavaScript Basics Slides.pptx",
      course: "WEB-1500",
      type: "PowerPoint",
      size: "5.2 MB",
      uploadDate: "2024-01-10",
      status: "Active",
      trainingStatus: "Trained",
      downloads: 98
    },
    {
      id: 4,
      name: "Assignment 3 Instructions.docx",
      course: "PROG-1400",
      type: "Word",
      size: "156 KB",
      uploadDate: "2024-01-08",
      status: "Draft",
      trainingStatus: "Pending",
      downloads: 76
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log('Files selected:', Array.from(files).map(f => f.name));
    }
  };

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Course Materials</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage courses and upload files used to train course-specific AI tutors
          </p>
        </div>

        {/* Course Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Courses</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Overview of your courses and their materials
                </p>
              </div>
              <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-colors">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Course
                </div>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course Name</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course Code</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Semester</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Students</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Materials</th>
                    <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 text-sm font-medium">
                        <Link 
                          to={`/instructor-course-materials/${course.id}`}
                          className="text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 hover:underline transition-all cursor-pointer"
                        >
                          {course.name}
                        </Link>
                      </td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                        {course.code}
                      </td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                        {course.semester}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          course.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : course.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                        {course.students}
                      </td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                        {course.materials} files
                      </td>
                      <td className="py-4 text-sm space-x-3">
                        <Link
                          to={`/instructor-course-materials/${course.id}`}
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 inline-block"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
