import { InstructorLayout } from "~/components/InstructorLayout";
import { Link, useParams } from "react-router";

export default function InstructorCourseMaterials() {
  const { courseId } = useParams();

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

  const allMaterials = [
    {
      id: 1,
      name: "Programming Fundamentals.pdf",
      courseId: "1",
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
      courseId: "2",
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
      courseId: "3",
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
      courseId: "1",
      course: "PROG-1400",
      type: "Word",
      size: "156 KB",
      uploadDate: "2024-01-08",
      status: "Draft",
      trainingStatus: "Pending",
      downloads: 76
    },
    {
      id: 5,
      name: "Java Syntax Guide.pdf",
      courseId: "1",
      course: "PROG-1400",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2024-01-20",
      status: "Active",
      trainingStatus: "Trained",
      downloads: 201
    },
    {
      id: 6,
      name: "Database Normalization Examples.pdf",
      courseId: "2",
      course: "DB-2100",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "2024-01-18",
      status: "Active",
      trainingStatus: "Trained",
      downloads: 89
    }
  ];

  // Find the current course
  const currentCourse = courses.find(c => c.id === courseId);
  
  // Filter materials for this course
  const courseMaterials = allMaterials.filter(m => m.courseId === courseId);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Files selected for', currentCourse?.name, ':', Array.from(files).map(f => f.name));
    }
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
          <Link 
            to="/instructor-materials" 
            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Courses
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{currentCourse.name}</h1>
              <div className="flex items-center mt-2 space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <span>{currentCourse.code}</span>
                <span>•</span>
                <span>{currentCourse.semester}</span>
                <span>•</span>
                <span>{currentCourse.students} students</span>
                <span>•</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  currentCourse.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {currentCourse.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{courseMaterials.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Materials</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Upload New Materials</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Add files to train the AI tutor for {currentCourse.name}
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* File Upload */}
              <div>
                <label htmlFor="files" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Files
                </label>
                <input
                  type="file"
                  id="files"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 dark:file:bg-gray-600 file:text-slate-700 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-gray-500"
                />
              </div>

              {/* Material Type */}
              <div>
                <label htmlFor="material-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Material Type
                </label>
                <select
                  id="material-type"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select type...</option>
                  <option value="lecture">Lecture Notes</option>
                  <option value="assignment">Assignment</option>
                  <option value="reference">Reference Material</option>
                  <option value="lab">Lab Instructions</option>
                  <option value="slides">Slides</option>
                </select>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-slate-900 dark:text-white">
                      Drop files here, or <span className="text-slate-600 underline">click to browse</span>
                    </span>
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  PDF, DOC, DOCX, PPT, PPTX, TXT up to 50MB each
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-colors"
              >
                Upload Materials
              </button>
            </div>
          </div>
        </div>

        {/* Course Materials List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Course Materials</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Materials uploaded for {currentCourse.name}
                </p>
              </div>
              <div className="flex space-x-3">
                <select className="px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
                <button className="px-3 py-2 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-600 text-sm">
                  Export List
                </button>
              </div>
            </div>
          </div>
          
          {courseMaterials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      AI Training
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                  {courseMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-slate-100 dark:bg-gray-700 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{material.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{material.type} • {material.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          material.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {material.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          material.trainingStatus === 'Trained' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : material.trainingStatus === 'Training'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {material.trainingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                        {material.downloads} queries
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {material.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
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
          ) : (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No materials uploaded yet</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Upload your first material using the form above to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </InstructorLayout>
  );
}
