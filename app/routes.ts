import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/start-learning", "routes/start-learning.tsx"),
  route("/courses", "routes/courses.tsx"),
  route("/course-sessions/:courseId", "routes/course-sessions.$courseId.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/course-selection", "routes/course-selection.tsx"),
  route("/course-setup", "routes/course-setup.tsx")
] satisfies RouteConfig;
