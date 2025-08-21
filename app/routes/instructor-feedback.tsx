import { InstructorLayout } from "~/components/InstructorLayout";
import { useState } from "react";

export default function InstructorFeedback() {
  const [selectedTab, setSelectedTab] = useState("review");

  // Mock data for flagged responses
  const flaggedResponses = [
    {
      id: 1,
      studentQuestion: "How do I handle null pointer exceptions in Java?",
      aiResponse: "You can avoid null pointer exceptions by always checking if objects are null before using them. Use if(obj != null) before calling methods.",
      flaggedBy: "Dr. Smith",
      flagDate: "2024-01-15",
      course: "PROG-1400",
      issue: "Incomplete - doesn't mention try-catch blocks or Optional class",
      status: "Pending Review",
      severity: "Medium"
    },
    {
      id: 2,
      studentQuestion: "What's the difference between INNER and OUTER JOIN?",
      aiResponse: "INNER JOIN returns all records from both tables. OUTER JOIN returns only matching records.",
      flaggedBy: "Prof. Johnson",
      flagDate: "2024-01-14",
      course: "DB-2100",
      issue: "Incorrect - definitions are backwards",
      status: "Corrected",
      severity: "High"
    },
    {
      id: 3,
      studentQuestion: "How do I center a div horizontally?",
      aiResponse: "Use text-align: center on the div element to center it horizontally.",
      flaggedBy: "Ms. Garcia",
      flagDate: "2024-01-13",
      course: "WEB-1500",
      issue: "Misleading - text-align centers content, not the div itself",
      status: "Under Review",
      severity: "Medium"
    }
  ];

  const corrections = [
    {
      id: 1,
      originalResponse: "You can avoid null pointer exceptions by always checking if objects are null...",
      correctedResponse: "You can handle null pointer exceptions in several ways: 1) Use null checks with if statements, 2) Use try-catch blocks to catch NullPointerException, 3) Use Optional class in Java 8+, 4) Initialize objects properly. Here's an example...",
      course: "PROG-1400",
      correctedBy: "Dr. Smith",
      correctionDate: "2024-01-16",
      status: "Applied"
    },
    {
      id: 2,
      originalResponse: "INNER JOIN returns all records from both tables...",
      correctedResponse: "INNER JOIN returns only the matching records from both tables. OUTER JOIN (LEFT/RIGHT/FULL) returns all records from one or both tables, including non-matching records with NULL values where no match exists.",
      course: "DB-2100",
      correctedBy: "Prof. Johnson",
      correctionDate: "2024-01-15",
      status: "Applied"
    }
  ];

  return (
    <InstructorLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Response Feedback</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Review and correct AI responses to improve teaching quality
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab("review")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "review"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                Flagged Responses ({flaggedResponses.length})
              </button>
              <button
                onClick={() => setSelectedTab("corrections")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "corrections"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                My Corrections ({corrections.length})
              </button>
              <button
                onClick={() => setSelectedTab("submit")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "submit"
                    ? "border-slate-500 text-slate-600 dark:text-slate-300 dark:border-slate-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                Submit Feedback
              </button>
            </nav>
          </div>
        </div>

        {/* Flagged Responses Tab */}
        {selectedTab === "review" && (
          <div className="space-y-6">
            {flaggedResponses.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.course}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.severity === "High" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" :
                          item.severity === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" :
                          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        }`}>
                          {item.severity} Priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Corrected" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                          item.status === "Under Review" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" :
                          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Flagged by {item.flaggedBy} on {item.flagDate}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Student Question */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student Question:</h4>
                      <div className="bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <p className="text-sm text-slate-800 dark:text-slate-200">{item.studentQuestion}</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">AI Response:</h4>
                      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-lg p-3">
                        <p className="text-sm text-slate-800 dark:text-slate-200">{item.aiResponse}</p>
                      </div>
                    </div>

                    {/* Issue Description */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Issue:</h4>
                      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-3">
                        <p className="text-sm text-slate-800 dark:text-slate-200">{item.issue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-gray-600 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700">
                      Dismiss
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2">
                      Provide Correction
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Corrections Tab */}
        {selectedTab === "corrections" && (
          <div className="space-y-6">
            {corrections.map((correction) => (
              <div key={correction.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{correction.course}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {correction.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Corrected on {correction.correctionDate}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Original Response */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Original Response:</h4>
                      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-lg p-3">
                        <p className="text-sm text-slate-800 dark:text-slate-200">{correction.originalResponse}</p>
                      </div>
                    </div>

                    {/* Corrected Response */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Correction:</h4>
                      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-lg p-3">
                        <p className="text-sm text-slate-800 dark:text-slate-200">{correction.correctedResponse}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-gray-600 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700">
                      Edit Correction
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Feedback Tab */}
        {selectedTab === "submit" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Submit AI Response Feedback</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Flag an AI response for review and provide a correction
              </p>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                {/* Course Selection */}
                <div>
                  <label htmlFor="feedback-course" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Course
                  </label>
                  <select
                    id="feedback-course"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a course...</option>
                    <option value="PROG-1400">PROG-1400 - Computer Programming 101</option>
                    <option value="DB-2100">DB-2100 - Database Design</option>
                    <option value="WEB-1500">WEB-1500 - Web Development</option>
                  </select>
                </div>

                {/* Student Question */}
                <div>
                  <label htmlFor="student-question" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Original Student Question
                  </label>
                  <textarea
                    id="student-question"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Paste the original question that the student asked..."
                  />
                </div>

                {/* AI Response */}
                <div>
                  <label htmlFor="ai-response" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    AI Response (Problematic)
                  </label>
                  <textarea
                    id="ai-response"
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Paste the AI response that needs correction..."
                  />
                </div>

                {/* Issue Description */}
                <div>
                  <label htmlFor="issue-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Issue Description
                  </label>
                  <textarea
                    id="issue-description"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Describe what's wrong with the AI response (incorrect information, misleading, incomplete, etc.)..."
                  />
                </div>

                {/* Severity */}
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Severity Level
                  </label>
                  <select
                    id="severity"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select severity...</option>
                    <option value="low">Low - Minor improvement needed</option>
                    <option value="medium">Medium - Misleading or incomplete</option>
                    <option value="high">High - Incorrect information</option>
                  </select>
                </div>

                {/* Corrected Response */}
                <div>
                  <label htmlFor="corrected-response" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Corrected Response
                  </label>
                  <textarea
                    id="corrected-response"
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Provide the corrected response that should be used to train the AI..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-gray-600 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </InstructorLayout>
  );
}
