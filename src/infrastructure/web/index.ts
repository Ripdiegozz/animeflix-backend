import Elysia, { redirect, t } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Logestic } from "logestic";
// import jwt from "@elysiajs/jwt"; Prepare the JWT service for future use

/**
 * The main application instance.
 */
export const App = new Elysia();

// Enable CORS for all routes and methods
App.use(
  cors({
    // Allow all origins (can be changed to a specific origin or an array of origins)
    origin: "*",
    // Allow only GET methods
    methods: ["GET"],
  })
);
// Enable Swagger for the API documentation at /api/v1/swagger
App.use(
  swagger({
    documentation: {
      info: {
        title: "Animeflix REST API",
        version: "0.0.1",
        description:
          "REST API specification for Animeflix - A simple anime and manga streaming service",
      },
      tags: [
        {
          name: "Default",
          description: "Default API endpoints, such as '/' or '404'",
        },
        {
          name: "/anime",
          description:
            "Anime endpoints for the API to interact with anime data",
        },
        {
          name: "/manga",
          description:
            "Manga endpoints for the API to interact with manga data",
        },
        { name: "/health", description: "Health check endpoints for the API" },
      ],
    },
    scalarConfig: {
      theme: "alternate",
    },
    provider: "scalar",
  })
);
// Log all requests to the console
App.use(Logestic.preset("fancy"));
// Enable system routing
App.use(
  autoroutes({
    routesDir: "routes",
    prefix: "/api",
    generateTags: true,
  })
);
// Define the routes for the API

/**
 * Root route.
 * Returns the index page.
 */
App.get("/", () => Bun.file("src/static/index.html"), {
  tags: ["Default"],
  response: {
    200: t.Any({ description: "Index page retrieved correctly." }),
  },
});

/**
 * 404 route.
 * Returns the 404 page.
 */
App.get("/404", () => Bun.file("src/static/404.html"), {
  tags: ["Default"],
  response: {
    200: t.Any({ description: "404 page retrieved correctly." }),
  },
});

// Handle errors
App.onError(({ code }) => {
  if (code === "NOT_FOUND") return redirect("/404");
});

console.log("🦊 Animeflix REST API is running on http://localhost:8080/ 🚀");
console.log(
  "📚 Check the API documentation at http://localhost:8080/swagger 📖"
);
