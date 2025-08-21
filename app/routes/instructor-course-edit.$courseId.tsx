import { InstructorLayout } from "~/components/InstructorLayout";
import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";

export default function InstructorCourseEdit() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data for demonstration
  const courses = [
    { 
      id: "1", 
      name: "Computer Programming 101", 
      code: "PROG-1400",
      semester: "Fall 2024",
      status: "Active",
      students: 45,
      materials: 8
    },
    { 
      id: "2", 
      name: "Database Design", 
      code: "DB-2100",
      semester: "Fall 2024", 
      status: "Active",
      students: 38,
      materials: 6
    },
    { 
      id: "3", 
      name: "Web Development", 
      code: "WEB-1500",
      semester: "Fall 2024",
      status: "Active", 
      students: 52,
      materials: 12
    },
    { 
      id: "4", 
      name: "Advanced Programming", 
      code: "PROG-2400",
      semester: "Winter 2025",
      status: "Upcoming", 
      students: 0,
      materials: 3
    }
  ];

  const courseStudents = [
    { id: 1, studentNumber: "ST001234", name: "John Smith", email: "jsmith@rrc.ca", enrolledDate: "2024-08-15" },
    { id: 2, studentNumber: "ST001235", name: "Sarah Johnson", email: "sjohnson@rrc.ca", enrolledDate: "2024-08-15" },
    { id: 3, studentNumber: "ST001236", name: "Mike Chen", email: "mchen@rrc.ca", enrolledDate: "2024-08-20" },
    { id: 4, studentNumber: "ST001237", name: "Emily Davis", email: "edavis@rrc.ca", enrolledDate: "2024-08-15" },
    { id: 5, studentNumber: "ST001238", name: "Alex Brown", email: "abrown@rrc.ca", enrolledDate: "2024-08-18" },
    { id: 6, studentNumber: "ST001239", name: "Lisa Wilson", email: "lwilson@rrc.ca", enrolledDate: "2024-08-22" },
    { id: 7, studentNumber: "ST001240", name: "David Garcia", email: "dgarcia@rrc.ca", enrolledDate: "2024-08-25" },
    { id: 8, studentNumber: "ST001241", name: "Jessica Martinez", email: "jmartinez@rrc.ca", enrolledDate: "2024-08-28" }
  ];

  // Find the current course
  const currentCourse = courses.find(c => c.id === courseId);

  // State for form data
  const [courseData, setCourseData] = useState({
    name: currentCourse?.name || "",
    code: currentCourse?.code || "",
    semester: currentCourse?.semester || ""
  });

  const semesterOptions = [
    "Fall 2024",
    "Winter 2025", 
    "Spring 2025",
    "Summer 2025",
    "Fall 2025"
  ];

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRemoveStudent = (studentId: number) => {
    // Handle student removal logic here
    console.log('Remove student:', studentId);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving course data:', courseData);
    navigate(`/instructor-course-materials/${courseId}`);
  };

  if (!currentCourse) {
    return (
      <InstructorLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Course Not Found</h1>
            <Link 
              to="/instructor-materials" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              ← Back to Course Materials
            </Link>
          </div>
        </div>
      </InstructorLayout>
    );
  }

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Link 
              to="/instructor-materials" 
              className="hover:text-slate-800 dark:hover:text-slate-200"
            >
              Course Materials
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              to={`/instructor-course-materials/${courseId}`}
              className="hover:text-slate-800 dark:hover:text-slate-200"
            >
              {currentCourse.code}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 dark:text-white">Edit Course</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Course</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Update course information and manage enrolled students
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/instructor-course-materials/${courseId}`}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-gray-600 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Course Information Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Information</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Update basic course details
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Name */}
              <div>
                <label htmlFor="course-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  id="course-name"
                  value={courseData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter course name"
                />
              </div>

              {/* Course Code */}
              <div>
                <label htmlFor="course-code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Course Code
                </label>
                <input
                  type="text"
                  id="course-code"
                  value={courseData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter course code"
                />
              </div>

              {/* Semester */}
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Semester
                </label>
                <select
                  id="semester"
                  value={courseData.semester}
                  onChange={(e) => handleInputChange('semester', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select semester...</option>
                  {semesterOptions.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status (Read-only for now) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <div className="px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700/50">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    currentCourse.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {currentCourse.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Students */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Enrolled Students</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Manage students enrolled in this course
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-3 py-2 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-600 text-sm">
                  Add Student
                </button>
                <button className="px-3 py-2 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-600 text-sm">
                  Import CSV
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {courseStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-gray-700">
                      <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Student Number</th>
                      <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Student Name</th>
                      <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Email</th>
                      <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Enrolled</th>
                      <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                    {courseStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">
                          {student.studentNumber}
                        </td>
                        <td className="py-4 text-sm text-slate-900 dark:text-white">
                          {student.name}
                        </td>
                        <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                          {student.email}
                        </td>
                        <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                          {student.enrolledDate}
                        </td>
                        <td className="py-4 text-sm">
                          <button
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
                            title="Remove student"
                          >
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
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No students enrolled</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Add students to get started with this course.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
