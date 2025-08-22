import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { InstructorLayout } from "~/components/InstructorLayout";

export function meta() {
  return [
    { title: "Settings - RRC AI Tutor" },
    { name: "description", content: "Manage instructor profile and course access settings" },
  ];
}

export default function InstructorSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isGrantAccessModalOpen, setIsGrantAccessModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [staffDeleteConfirmation, setStaffDeleteConfirmation] = useState<{isOpen: boolean; staffId: number | null; staffName: string; courseId: number | null}>({
    isOpen: false,
    staffId: null,
    staffName: "",
    courseId: null
  });
  const [editingStaff, setEditingStaff] = useState<{id: number; name: string; email: string; role: string; courseId: number} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Mock instructor data - in real app this would come from authentication/API
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@rrc.ca",
    department: "Computer Science",
    employeeId: "EMP001234"
  });

  // Mock course access data - in real app this would come from API
  const [courseAccess, setCourseAccess] = useState([
    {
      id: 1,
      courseName: "Computer Programming 101",
      courseCode: "PROG-1400",
      staffMembers: [
        { id: 1, name: "Dr. Sarah Johnson", role: "Lead Instructor", email: "sarah.johnson@rrc.ca" },
        { id: 2, name: "Prof. Mike Chen", role: "Teaching Assistant", email: "mike.chen@rrc.ca" },
        { id: 3, name: "Dr. Lisa Wang", role: "Co-Instructor", email: "lisa.wang@rrc.ca" }
      ]
    },
    {
      id: 2,
      courseName: "Database Design",
      courseCode: "DB-2100",
      staffMembers: [
        { id: 1, name: "Dr. Sarah Johnson", role: "Lead Instructor", email: "sarah.johnson@rrc.ca" },
        { id: 4, name: "Prof. James Smith", role: "Teaching Assistant", email: "james.smith@rrc.ca" }
      ]
    },
    {
      id: 3,
      courseName: "Web Development",
      courseCode: "WEB-1500",
      staffMembers: [
        { id: 5, name: "Dr. Emma Davis", role: "Lead Instructor", email: "emma.davis@rrc.ca" },
        { id: 6, name: "Prof. Alex Rodriguez", role: "Teaching Assistant", email: "alex.rodriguez@rrc.ca" },
        { id: 1, name: "Dr. Sarah Johnson", role: "Guest Instructor", email: "sarah.johnson@rrc.ca" }
      ]
    }
  ]);

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      employeeId: profileData.employeeId // Keep existing ID
    };
    
    setProfileData(updatedProfile);
    // In real app, would make API call to update profile
    console.log('Profile updated:', updatedProfile);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    // In real app, would make API call to change password
    console.log('Password change requested');
    alert('Password changed successfully!');
    e.currentTarget.reset();
  };

  const toggleDropdown = (staffId: number, courseId: number) => {
    const dropdownId = `${courseId}-${staffId}`;
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleEditStaff = (staff: any, courseId: number) => {
    setEditingStaff({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
      courseId: courseId
    });
    setIsEditStaffModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDeleteStaff = (staff: any, courseId: number) => {
    setStaffDeleteConfirmation({
      isOpen: true,
      staffId: staff.id,
      staffName: staff.name,
      courseId: courseId
    });
    setOpenDropdown(null);
  };

  const confirmDeleteStaff = () => {
    if (staffDeleteConfirmation.courseId && staffDeleteConfirmation.staffId) {
      setCourseAccess(courseAccess.map(course => 
        course.id === staffDeleteConfirmation.courseId 
          ? {
              ...course,
              staffMembers: course.staffMembers.filter(staff => staff.id !== staffDeleteConfirmation.staffId)
            }
          : course
      ));
    }
    setStaffDeleteConfirmation({ isOpen: false, staffId: null, staffName: "", courseId: null });
  };

  const cancelDeleteStaff = () => {
    setStaffDeleteConfirmation({ isOpen: false, staffId: null, staffName: "", courseId: null });
  };

  const handleEditStaffSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingStaff) {
      const updatedStaff = {
        id: editingStaff.id,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as string
      };

      setCourseAccess(courseAccess.map(course => 
        course.id === editingStaff.courseId 
          ? {
              ...course,
              staffMembers: course.staffMembers.map(staff => 
                staff.id === editingStaff.id ? updatedStaff : staff
              )
            }
          : course
      ));
    }
    
    setIsEditStaffModalOpen(false);
    setEditingStaff(null);
  };

  const handleGrantAccessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newStaff = {
      id: Date.now(), // Simple ID generation for demo
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string
    };

    const courseId = parseInt(formData.get("courseId") as string);
    
    setCourseAccess(courseAccess.map(course => 
      course.id === courseId 
        ? {
            ...course,
            staffMembers: [...course.staffMembers, newStaff]
          }
        : course
    ));
    
    setIsGrantAccessModalOpen(false);
    e.currentTarget.reset();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Lead Instructor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Co-Instructor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Teaching Assistant':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Guest Instructor':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const sidebarSections = [
    { id: "profile", name: "Profile Information", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "access", name: "Course Access", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" }
  ];

  const renderProfileSection = () => (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Personal Information</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Update your personal details and contact information</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={profileData.name}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={profileData.email}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  defaultValue={profileData.department}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Employee ID (read-only) */}
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={profileData.employeeId}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-600 text-slate-500 dark:text-slate-400"
                  disabled
                  readOnly
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Employee ID cannot be changed</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Change Password</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Update your account password for security</p>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderCourseAccessSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course Access Management</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">View staff members who have access to each course</p>
          </div>
          <button 
            onClick={() => setIsGrantAccessModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Grant Access
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          {courseAccess.map((course) => (
            <div key={course.id} className="border border-slate-200 dark:border-gray-700 rounded-lg">
              <div className="p-4 bg-slate-50 dark:bg-gray-700/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white">{course.courseName}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{course.courseCode}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {course.staffMembers.length} staff member{course.staffMembers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-gray-700">
                {course.staffMembers.map((staff) => (
                  <div key={staff.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{staff.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(staff.role)}`}>
                        {staff.role}
                      </span>
                      <div className="relative" ref={openDropdown === `${course.id}-${staff.id}` ? dropdownRef : null}>
                        <button 
                          onClick={() => toggleDropdown(staff.id, course.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                        
                        {openDropdown === `${course.id}-${staff.id}` && (
                          <div className="absolute right-0 top-8 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-700 py-1 z-10">
                            <button
                              onClick={() => handleEditStaff(staff, course.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit Staff
                            </button>
                            <button
                              onClick={() => handleDeleteStaff(staff, course.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove Access
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "access":
        return renderCourseAccessSection();
      default:
        return renderProfileSection();
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
                Dashboard
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-slate-900 dark:text-white font-medium">
              Settings
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your profile and course access settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  {section.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>

        {/* Grant Access Modal */}
        {isGrantAccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Grant Course Access</h3>
                <button
                  onClick={() => setIsGrantAccessModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleGrantAccessSubmit} className="space-y-4">
                <div>
                  <label htmlFor="courseId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Course
                  </label>
                  <select
                    id="courseId"
                    name="courseId"
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a course</option>
                    {courseAccess.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseName} ({course.courseCode})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="john.smith@rrc.ca"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a role</option>
                    <option value="Lead Instructor">Lead Instructor</option>
                    <option value="Co-Instructor">Co-Instructor</option>
                    <option value="Teaching Assistant">Teaching Assistant</option>
                    <option value="Guest Instructor">Guest Instructor</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsGrantAccessModalOpen(false)}
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Grant Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Staff Modal */}
        {isEditStaffModalOpen && editingStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Edit Staff Member</h3>
                <button
                  onClick={() => {
                    setIsEditStaffModalOpen(false);
                    setEditingStaff(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleEditStaffSubmit} className="space-y-4">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    id="editName"
                    name="name"
                    defaultValue={editingStaff.name}
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="editEmail"
                    name="email"
                    defaultValue={editingStaff.email}
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="editRole" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    id="editRole"
                    name="role"
                    defaultValue={editingStaff.role}
                    required
                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Lead Instructor">Lead Instructor</option>
                    <option value="Co-Instructor">Co-Instructor</option>
                    <option value="Teaching Assistant">Teaching Assistant</option>
                    <option value="Guest Instructor">Guest Instructor</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditStaffModalOpen(false);
                      setEditingStaff(null);
                    }}
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Staff Confirmation Modal */}
        {staffDeleteConfirmation.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Remove Course Access</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Are you sure you want to remove course access for this staff member? This action cannot be undone.
                </p>
                <div className="bg-slate-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {staffDeleteConfirmation.staffName}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDeleteStaff}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteStaff}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Remove Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorLayout>
  );
}
