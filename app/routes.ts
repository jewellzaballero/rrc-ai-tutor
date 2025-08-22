import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/instructor/signin", "routes/instructor/signin.tsx"),
  route("/instructor/courses", "routes/instructor/courses.tsx"),
  route("/instructor/course/:courseId", "routes/instructor/course.$courseId.tsx"),
  route("/instructor/settings", "routes/instructor/settings.tsx"),
  route("/courses", "routes/courses.tsx"),
  route("/course-sessions/:courseId", "routes/course-sessions.$courseId.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/quiz", "routes/quiz.tsx"),
  route("/quiz-taking", "routes/quiz-taking.tsx"),
  route("/course-setup", "routes/course-setup.tsx")
] satisfies RouteConfig;
