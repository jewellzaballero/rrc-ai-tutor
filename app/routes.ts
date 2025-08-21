import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/instructor-signin", "routes/instructor-signin.tsx"),
  route("/instructor-dashboard", "routes/instructor-dashboard.tsx"),
  route("/instructor-materials", "routes/instructor-materials.tsx"),
  route("/instructor-course-materials/:courseId", "routes/instructor-course-materials.$courseId.tsx"),
  route("/instructor-course-edit/:courseId", "routes/instructor-course-edit.$courseId.tsx"),
  route("/instructor-analytics", "routes/instructor-analytics.tsx"),
  route("/instructor-feedback", "routes/instructor-feedback.tsx"),
  route("/instructor-settings", "routes/instructor-settings.tsx"),
  route("/courses", "routes/courses.tsx"),
  route("/course-sessions/:courseId", "routes/course-sessions.$courseId.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/quiz", "routes/quiz.tsx"),
  route("/quiz-taking", "routes/quiz-taking.tsx"),
  route("/course-setup", "routes/course-setup.tsx")
] satisfies RouteConfig;
