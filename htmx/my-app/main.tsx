import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import htmx from "./src/htmx.tsx";

const app = new Hono();
app.use(logger());

/**
 * Htmx routes
 */
app.route("/hx", htmx);
/**
 * Serve static files
 */
app.get(
    "/*",
    serveStatic({
        root: "./public",
        onNotFound: (path, c) => {
            console.log(`${path} is not found, you access ${c.req.path}`);
        },
    })
);

Deno.serve({ port: 8000 }, app.fetch);
