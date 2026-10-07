import { services } from "./services";
import { pages } from "./pages";
import { legalPages } from "./legal";
import { articles } from "./articles";
export const staticRoutes = [
  "/",
  "/capabilities",
  "/expertise",
  "/insights",
  "/opportunities",
  ...services.map((s) => `/capabilities/${s.slug}`),
  ...pages.map((p) => p.path),
  ...legalPages.map((p) => p.path),
  ...articles.map((a) => `/insights/${a.slug}`),
];
export const allRoutes = [...staticRoutes, "/contact", "/thank-you"];
