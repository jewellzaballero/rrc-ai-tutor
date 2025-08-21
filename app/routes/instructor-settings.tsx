import { InstructorLayout } from "~/components/InstructorLayout";
import { useState } from "react";

export default function InstructorSettings() {
  const [selectedTab, setSelectedTab] = useState("courses");

  // Mock data
  const myCourses = [
    {
      id: 1,
      code: "PROG-1400",
      name: "Computer Programming 101",
      semester: "Fall 2024",
      students: 45,
      status: "Active",
      startDate: "2024-09-01",
      endDate: "2024-12-15"
    },
    {
      id: 2,
      code: "PROG-2400",
      name: "Advanced Programming",
      semester: "Fall 2024",
      students: 32,
      status: "Active",
      startDate: "2024-09-01",
      endDate: "2024-12-15"
    },
    {
      id: 3,
      code: "PROG-1200",
      name: "Programming Fundamentals",
      semester: "Winter 2025",
      students: 0,
      status: "Upcoming",
      startDate: "2025-01-15",
      endDate: "2025-04-30"
    }
  ];

  const availableCourses = [
    { id: 4, code: "DB-2100", name: "Database Design", semester: "Winter 2025" },
    { id: 5, code: "WEB-1500", name: "Web Development", semester: "Winter 2025" },
    { id: 6, code: "PROG-3400", name: "Software Engineering", semester: "Winter 2025" }
  ];

  const enrolledStudents = [
    { id: 1, name: "John Smith", email: "jsmith@rrc.ca", course: "PROG-1400", enrolled: "2024-08-15", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sjohnson@rrc.ca", course: "PROG-1400", enrolled: "2024-08-15", status: "Active" },
    { id: 3, name: "Mike Chen", email: "mchen@rrc.ca", course: "PROG-1400", enrolled: "2024-08-20", status: "Active" },
    { id: 4, name: "Emily Davis", email: "edavis@rrc.ca", course: "PROG-2400", enrolled: "2024-08-15", status: "Active" },
    { id: 5, name: "Alex Brown", email: "abrown@rrc.ca", course: "PROG-2400", enrolled: "2024-08-18", status: "Dropped" }
  ];

  const courseStaff = [
    { id: 1, name: "Dr. Jane Smith", email: "jane.smith@rrc.ca", role: "Instructor", course: "PROG-1400", permissions: ["Full Access"] },
    { id: 2, name: "Tom Wilson", email: "tom.wilson@rrc.ca", role: "Teaching Assistant", course: "PROG-1400", permissions: ["View Analytics", "Grade Assignments"] },
    { id: 3, name: "Prof. Lisa Garcia", email: "lisa.garcia@rrc.ca", role: "Course Coordinator", course: "PROG-2400", permissions: ["Full Access"] },
    { id: 4, name: "Mark Thompson", email: "mark.thompson@rrc.ca", role: "Teaching Assistant", course: "PROG-2400", permissions: ["View Analytics"] }
  ];

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage courses, students, and user permissions
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab("courses")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "courses"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setSelectedTab("students")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "students"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                Student Management
              </button>
              <button
                onClick={() => setSelectedTab("roles")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "roles"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                Role Management
              </button>
            </nav>
          </div>
        </div>

        {/* My Courses Tab */}
        {selectedTab === "courses" && (
          <div className="space-y-8">
            {/* Current Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">My Courses</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Courses you're currently teaching or scheduled to teach
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2">
                    Request New Course
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Semester</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Students</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Dates</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                      {myCourses.map((course) => (
                        <tr key={course.id}>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{course.code}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{course.semester}</td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{course.students}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              course.status === "Upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" :
                              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }`}>
                              {course.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                            {course.startDate} to {course.endDate}
                          </td>
                          <td className="py-4 text-sm space-x-2">
                            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                              Edit
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Available Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Available Courses</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Request to teach additional courses
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCourses.map((course) => (
                    <div key={course.id} className="border border-slate-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{course.code}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{course.semester}</p>
                      <button className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-600">
                        Request to Teach
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Management Tab */}
        {selectedTab === "students" && (
          <div className="space-y-8">
            {/* Add Students */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Students</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Enroll students in your courses
                </p>
              </div>
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Course
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="">Select course...</option>
                      {myCourses.filter(c => c.status === "Active").map((course) => (
                        <option key={course.id} value={course.code}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Student Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="student@rrc.ca"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                    >
                      Add Student
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Enrolled Students */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Enrolled Students</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Manage student enrollments across your courses
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <select className="px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="">All Courses</option>
                      {myCourses.map((course) => (
                        <option key={course.id} value={course.code}>
                          {course.code}
                        </option>
                      ))}
                    </select>
                    <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm">
                      Export List
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Student</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Enrolled</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                      {enrolledStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{student.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{student.email}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{student.course}</td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{student.enrolled}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm space-x-2">
                            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                              View Progress
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                              Remove
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
        )}

        {/* Role Management Tab */}
        {selectedTab === "roles" && (
          <div className="space-y-8">
            {/* Add Staff Member */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Staff Member</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Grant access to instructors, TAs, and administrators
                </p>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="instructor@rrc.ca"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Course
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                        <option value="">Select course...</option>
                        {myCourses.map((course) => (
                          <option key={course.id} value={course.code}>
                            {course.code} - {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Role
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                        <option value="">Select role...</option>
                        <option value="instructor">Co-Instructor</option>
                        <option value="ta">Teaching Assistant</option>
                        <option value="coordinator">Course Coordinator</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Permissions
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 dark:border-gray-600 text-slate-600 focus:ring-slate-600 dark:bg-gray-700" />
                          <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">View Analytics</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 dark:border-gray-600 text-slate-600 focus:ring-slate-600 dark:bg-gray-700" />
                          <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Manage Materials</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 dark:border-gray-600 text-slate-600 focus:ring-slate-600 dark:bg-gray-700" />
                          <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Grade Assignments</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 dark:border-gray-600 text-slate-600 focus:ring-slate-600 dark:bg-gray-700" />
                          <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Full Access</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                    >
                      Add Staff Member
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Current Staff */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course Staff</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Manage access for instructors, TAs, and administrators
                </p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Staff Member</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Role</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Course</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Permissions</th>
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                      {courseStaff.map((staff) => (
                        <tr key={staff.id}>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{staff.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{staff.email}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              staff.role === "Instructor" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" :
                              staff.role === "Teaching Assistant" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                            }`}>
                              {staff.role}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{staff.course}</td>
                          <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                            {staff.permissions.join(", ")}
                          </td>
                          <td className="py-4 text-sm space-x-2">
                            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                              Edit
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                              Remove
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
        )}
      </div>
    </InstructorLayout>
  );
}
