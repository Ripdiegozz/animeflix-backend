import Elysia, { redirect, t } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Logestic } from "logestic";
// import jwt from "@elysiajs/jwt"; Prepare the JWT service for future use

/**
 * The main application instance.
 */
export const App = new Elysia()
  // Enable CORS for all routes and methods
  .use(
    cors({
      // Allow all origins (can be changed to a specific origin or an array of origins)
      origin: "*",
      // Allow only GET methods
      methods: ["GET"],
    })
  )
  // Enable Swagger for the API documentation at /api/v1/swagger
  .use(
    swagger({
      documentation: {
        info: {
          title: "Animeflix REST API",
          version: "0.0.1",
          description:
            "REST API specification for Animeflix - A simple anime and manga streaming service",
        },
        tags: [
          { name: "Default", description: "Default API endpoints, such as '/' or '404'" },
          { name: "/anime", description: "Anime endpoints for the API to interact with anime data" },
          { name: "/manga", description: "Manga endpoints for the API to interact with manga data" },
          { name: "/health", description: "Health check endpoints for the API" },
        ],
      },
      scalarConfig: {
        theme: "alternate",
      },
      provider: "scalar",
    })
  )
  // Log all requests to the console
  .use(Logestic.preset("fancy"))
  // Enable system routing
  .use(
    autoroutes({
      routesDir: "routes",
      prefix: "/api/v1",
      generateTags: true,
    })
  )
  // Define the routes for the API
  .get("/", () => Bun.file("src/static/index.html"), {
    tags: ["Default"],
    response: {
      200: t.Any({ description: "Index page retrieved correctly." }),
    },
  }) // Root route
  .get("/404", () => Bun.file("src/static/404.html"), {
    tags: ["Default"],
    response: {
      200: t.Any({ description: "404 page retrieved correctly." }),
    },
  }) // 404 route
  .onError(({ code }) => {
    // Handle errors
    if (code === "NOT_FOUND") return redirect("/404");
  })
  .listen(8080);

console.log("🦊 Animeflix REST API is running on http://localhost:8080/ 🚀");
console.log(
  "📚 Check the API documentation at http://localhost:8080/swagger 📖"
);
