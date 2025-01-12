import { Hono } from "hono";
import { logger } from "hono/logger";
import Counter from "./components/Counter.tsx";

const htmx = new Hono();
htmx.use(logger());

/**
 * HTMX routes
 */
htmx.get("/load", (c) => c.html(<App />));
htmx.get("/counter/:n", (c) => {
    const n = parseInt(c.req.param("n"));
    return c.html(<Counter add={n} />);
});

/**
 * HTMX components
 */
const App = () => {
    return (
        <body>
            <header>
                <h1>Home page</h1>
            </header>
            <main>
                <Counter add={0} />
            </main>
        </body>
    );
};

export default htmx;
