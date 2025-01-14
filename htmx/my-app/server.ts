import pagesRoutes from "@pages/routes/pageRoutes.tsx";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();
app.route("/", pagesRoutes);

/* static files served at /public */
app.get(
    "/*",
    serveStatic({
        root: "./public",
    })
);

Deno.serve({ port: 5050 }, app.fetch);
