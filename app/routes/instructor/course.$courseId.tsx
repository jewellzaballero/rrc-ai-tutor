import { useParams, Link } from "react-router";
import { useState } from "react";
import { InstructorLayout } from "~/components/InstructorLayout";

export function meta() {
  return [
    { title: "Course Dashboard - RRC AI Tutor" },
    { name: "description", content: "Manage individual course settings and monitor student engagement" },
  ];
}

export default function CourseDashboard() {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("analytics");
  
  // Mock data - in real app this would come from API based on courseId
  const course = {
    id: parseInt(courseId || "1"),
    name: "Computer Programming 101",
    code: "PROG-1400",
    description: "Introduction to programming concepts and fundamentals",
    semester: "Fall 2024",
    activeStudents: 45,
    totalQuestions: 234,
    avgEngagement: 78,
    recentActivity: "2 hours ago"
  };

  const recentQuestions = [
    {
      id: 1,
      question: "How do I fix null pointer exceptions in Java?",
      student: "John D.",
      timestamp: "5 minutes ago",
      status: "answered"
    },
    {
      id: 2,
      question: "What's the difference between public and private methods?",
      student: "Sarah M.",
      timestamp: "12 minutes ago",
      status: "answered"
    },
    {
      id: 3,
      question: "How do arrays work in programming?",
      student: "Mike R.",
      timestamp: "25 minutes ago",
      status: "pending"
    },
    {
      id: 4,
      question: "Can you explain loops and iteration?",
      student: "Emma L.",
      timestamp: "1 hour ago",
      status: "answered"
    }
  ];

  const materials = [
    {
      id: 1,
      name: "Programming Fundamentals.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      queries: 156,
      references: 89,
      effectiveness: 92
    },
    {
      id: 2,
      name: "Java Syntax Guide.pdf",
      type: "PDF",
      size: "1.8 MB", 
      uploadDate: "2024-01-20",
      queries: 89,
      references: 67,
      effectiveness: 87
    },
    {
      id: 3,
      name: "Assignment 1 Instructions.docx",
      type: "Document",
      size: "542 KB",
      uploadDate: "2024-01-25",
      queries: 45,
      references: 23,
      effectiveness: 79
    },
    {
      id: 4,
      name: "Code Examples.zip",
      type: "Archive",
      size: "3.2 MB",
      uploadDate: "2024-01-30",
      queries: 78,
      references: 45,
      effectiveness: 85
    }
  ];

  const students = [
    {
      id: 1,
      studentNumber: "S2024001",
      name: "John Doe",
      email: "john.doe@college.edu",
      questionsAsked: 23,
      engagement: 85,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      studentNumber: "S2024002",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@college.edu",
      questionsAsked: 31,
      engagement: 92,
      lastActivity: "45 minutes ago"
    },
    {
      id: 3,
      studentNumber: "S2024003",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@college.edu",
      questionsAsked: 18,
      engagement: 67,
      lastActivity: "1 day ago"
    },
    {
      id: 4,
      studentNumber: "S2024004",
      name: "Emma Liu",
      email: "emma.liu@college.edu",
      questionsAsked: 27,
      engagement: 78,
      lastActivity: "3 hours ago"
    },
    {
      id: 5,
      studentNumber: "S2024005",
      name: "David Johnson",
      email: "david.johnson@college.edu",
      questionsAsked: 15,
      engagement: 54,
      lastActivity: "2 days ago"
    }
  ];

  const studentEngagement = [
    { day: "Mon", engagement: 75 },
    { day: "Tue", engagement: 82 },
    { day: "Wed", engagement: 68 },
    { day: "Thu", engagement: 91 },
    { day: "Fri", engagement: 73 },
    { day: "Sat", engagement: 45 },
    { day: "Sun", engagement: 38 }
  ];

  const moduleInteractions = [
    { module: "Introduction to Programming", interactions: 127, avgTime: "8.5 min" },
    { module: "Variables and Data Types", interactions: 98, avgTime: "6.2 min" },
    { module: "Control Structures", interactions: 156, avgTime: "12.1 min" },
    { module: "Functions and Methods", interactions: 203, avgTime: "15.3 min" },
    { module: "Object-Oriented Programming", interactions: 89, avgTime: "18.7 min" }
  ];

  const tabs = [
    { id: "analytics", name: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: "materials", name: "Materials", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "students", name: "Students", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Students</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{course.activeStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Questions</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{course.totalQuestions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Engagement</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{course.avgEngagement}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4a2.25 2.25 0 014.5 0v.236m-4.5 0c.94-.196 2.478-.231 4.5-.231s3.56.035 4.5.231M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4a2.25 2.25 0 00-4.5 0v.236m4.5 0c1.94.196 3.798.47 5.638.777a6.003 6.003 0 01-4.399 5.472m0-13.155a2.25 2.25 0 00-2.25 2.25v.236m2.25-.236a2.25 2.25 0 012.25 2.25v.236m-2.25-.236c.94.196 2.478.231 4.5.231s3.56-.035 4.5-.231" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Engagement Rate</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {Math.round((students.filter(s => s.questionsAsked > 0).length / students.length) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Questions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Questions</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Latest student questions and AI responses</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentQuestions.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          item.status === 'answered' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            item.status === 'answered' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {item.status === 'answered' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{item.question}</p>
                          <div className="flex items-center mt-1 space-x-4">
                            <span className="text-xs text-slate-500 dark:text-slate-400">{item.student}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Engagement Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Weekly Engagement</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Student activity throughout the week</p>
                </div>
                <div className="p-6">
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {studentEngagement.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-700"
                          style={{ height: `${(day.engagement / 100) * 80}%`, minHeight: '8px' }}
                          title={`${day.day}: ${day.engagement}%`}
                        ></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module Interactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Interaction per Module</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Student engagement with different course modules</p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                    <thead className="bg-slate-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Module
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Interactions
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Avg Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                      {moduleInteractions.map((module, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                            {module.module}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                            {module.interactions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                            {module.avgTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case "materials":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Materials</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage uploaded files and their usage by the AI tutor</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Material
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                  <thead className="bg-slate-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        File Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        File Size
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        References
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                    {materials.map((material) => (
                      <tr key={material.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg mr-3">
                              <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{material.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                          {material.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-900 dark:text-white">
                          {material.references}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                          {material.uploadDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded text-sm"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${material.name}"?`)) {
                                // Handle delete in real app
                                console.log('Deleting material:', material.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "students":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Students</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage student enrollments and view their activity</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Student
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                  <thead className="bg-slate-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Student Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Questions Asked
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Last Activity
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-gray-700">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                          {student.studentNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{student.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                          {student.questionsAsked}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-slate-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    student.engagement >= 80 ? 'bg-green-500' :
                                    student.engagement >= 60 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${student.engagement}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {student.engagement}%
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 dark:text-slate-400">
                          {student.lastActivity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded text-sm"
                            onClick={() => {
                              // Handle edit in real app
                              console.log('Editing student:', student.id);
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded text-sm"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove "${student.name}" from this course?`)) {
                                // Handle delete in real app
                                console.log('Deleting student:', student.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Breadcrumb */}
        <nav className="flex mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/instructor/courses" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                Courses
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-slate-900 dark:text-white font-medium">
              {course.name}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{course.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{course.code}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">•</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {course.semester}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{course.description}</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Settings
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </InstructorLayout>
  );
}
