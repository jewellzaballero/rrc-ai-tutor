import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/courses", "routes/courses.tsx"),
  route("/course-sessions/:courseId", "routes/course-sessions.$courseId.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/course-setup", "routes/course-setup.tsx")
] satisfies RouteConfig;
