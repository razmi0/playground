import Counter from "@/components/Counter.tsx";
import { Header } from "@/components/Header.tsx";
import { Hono } from "hono";
import { Fragment } from "hono/jsx";

export const homeRoutes = new Hono();

homeRoutes.get("/hx/counter/:add", (c) => {
    const add = parseInt(c.req.param("add"));
    return c.render(<Counter add={add} hxPath="/hx/counter" id="counter" />);
});

export const Home = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <h1>Home</h1>
                <Counter id="counter" hxPath="/hx/counter" />
            </main>
            <footer>Footer</footer>
        </Fragment>
    );
};
