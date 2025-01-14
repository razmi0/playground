import { About } from "@/pages/About.tsx";
import { Home, homeRoutes } from "@/pages/Home.tsx";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";
import { Layout } from "./src/layout/layout.tsx";

const app = new Hono();
app.route("", homeRoutes);

/* logger */
app.use(logger())
    /* ssr routes */
    .get("/*", jsxRenderer())
    .get("/", (c) =>
        c.render(
            <Layout title="Home">
                <Home />
            </Layout>
        )
    )
    .get("/about", (c) =>
        c.render(
            <Layout title="About">
                <About />
            </Layout>
        )
    )
    /* static */
    .get(
        "/*",
        serveStatic({
            root: "./public",
            onNotFound: (path, c) => {
                console.log(`${path} is not found, you access ${c.req.path}`);
            },
        })
    );
Deno.serve({ port: 5050 }, app.fetch);
