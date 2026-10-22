import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route(":role/login", "routes/login.tsx"),
  route(":role/dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
