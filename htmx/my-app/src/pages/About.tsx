import { Header } from "@/components/Header.tsx";
import { Fragment } from "hono/jsx";

export const About = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <h1>About</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
                    cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib
                </p>
            </main>
            <footer></footer>
        </Fragment>
    );
};
