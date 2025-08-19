import { Link, useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";

export function meta() {
  return [
    { title: "Course Setup - RRC AI Tutor" },
    { name: "description", content: "Configure your learning course preferences" },
  ];
}

export default function CourseSetup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseCode = searchParams.get("course") || "Selected Course";
  const courseName = searchParams.get("courseName") || "";
  const courseId = searchParams.get("courseId");
  
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [learningStyles, setLearningStyles] = useState<string[]>([]);
  const [improvementAreas, setImprovementAreas] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Here you would process the form data and create the course
    console.log("Course setup data:", Object.fromEntries(formData));
    
    // Navigate to course sessions page after setup completion
    if (courseId) {
      navigate(`/course-sessions/${courseId}?title=${encodeURIComponent(courseCode)}`);
    } else {
      // Fallback to chat if no courseId provided
      navigate("/chat");
    }
  };

  const handleCheckboxChange = (
    value: string,
    selectedArray: string[],
    setterFunction: (value: string[]) => void
  ) => {
    if (selectedArray.includes(value)) {
      setterFunction(selectedArray.filter(item => item !== value));
    } else {
      setterFunction([...selectedArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Course Setup"
        subtitle={
          <>
            Configure your learning preferences for <span className="font-medium">{courseCode}</span>
            {courseName && <span className="text-gray-500 dark:text-gray-500"> - {courseName}</span>}
          </>
        }
      >
        <Link
          to="/courses"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </Header>

      {/* Main Content */}
      <main className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Hidden course information */}
            <input type="hidden" name="courseCode" value={courseCode} />
            <input type="hidden" name="courseName" value={courseName} />
            {courseId && <input type="hidden" name="courseId" value={courseId} />}
            {/* Course Materials Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                </div>
                Additional Course Materials
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Optional)</span>
              </h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supported formats: PDF, DOC, DOCX, TXT, PPT, PPTX (Max 10MB)
                </p>
                <input
                  type="file"
                  name="courseMaterials"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Choose Files
                </label>
              </div>
            </div>

            {/* Modules/Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                Current Module or Topic of Interest
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleModules.map((module) => (
                  <label
                    key={module}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="modules"
                      value={module}
                      checked={selectedModules.includes(module)}
                      onChange={() => handleCheckboxChange(module, selectedModules, setSelectedModules)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{module}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                Learning Style Preferences
              </h3>
              <div className="space-y-4">
                {learningStyleOptions.map((style) => (
                  <label
                    key={style.value}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="learningStyles"
                      value={style.value}
                      checked={learningStyles.includes(style.value)}
                      onChange={() => handleCheckboxChange(style.value, learningStyles, setLearningStyles)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{style.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{style.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 dark:text-orange-400">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                Areas for Improvement
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select the areas where you would like additional support and focused learning
              </p>
              <div className="space-y-4">
                {assessmentOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="improvementAreas"
                      value={option.value}
                      checked={improvementAreas.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value, improvementAreas, setImprovementAreas)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Formats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600 dark:text-teal-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
                Preferred Content Formats
              </h3>
              <div className="space-y-4">
                {preferredFormatsOptions.map((format) => (
                  <label
                    key={format.value}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="formats"
                      value={format.value}
                      checked={formats.includes(format.value)}
                      onChange={() => handleCheckboxChange(format.value, formats, setFormats)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{format.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{format.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/courses"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Courses
              </Link>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Complete Setup
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </main>
    </div>
  );
}

const sampleModules = [
  "Introduction & Fundamentals",
  "Basic Concepts",
  "Advanced Theory",
  "Practical Applications",
  "Problem Solving",
  "Case Studies",
  "Laboratory Work",
  "Research Methods",
  "Final Project",
  "Review & Assessment"
];

const learningStyleOptions = [
  {
    value: "visual",
    label: "Visual Learning",
    description: "Diagrams, infographics, charts, and visual representations"
  },
  {
    value: "text",
    label: "Text-Based Learning",
    description: "Written content, reading materials, and textual explanations"
  },
  {
    value: "audio",
    label: "Audio-Based Learning",
    description: "Spoken explanations, podcasts, and audio recordings"
  }
];

const assessmentOptions = [
  {
    value: "practical",
    label: "Practical Assessments",
    description: "Hands-on projects, lab work, and real-world applications"
  },
  {
    value: "standardized",
    label: "Standardized Tests",
    description: "Multiple choice, formal exams, and structured assessments"
  },
  {
    value: "memorization",
    label: "Memorization",
    description: "Recall of facts, formulas, and procedural knowledge"
  }
];

const preferredFormatsOptions = [
  {
    value: "summaries",
    label: "Summaries",
    description: "Concise overviews and key point compilations"
  },
  {
    value: "bullets",
    label: "Bullet Points",
    description: "Structured lists and organized information"
  },
  {
    value: "qa",
    label: "Q&A Style",
    description: "Question and answer format for interactive learning"
  }
];
