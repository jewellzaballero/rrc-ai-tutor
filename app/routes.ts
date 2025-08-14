import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/projects", "routes/projects.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/course-selection", "routes/course-selection.tsx")
] satisfies RouteConfig;
