// /** @jsx h */
// /** @jsxFrag Fragment */
// import { Fragment, h, renderToString } from "https://deno.land/x/jsx@v0.1.5/mod.ts";
// import { SpinnerConfig, Spinner } from "./main.ts";
// // import { Spinner } from "./main.ts";

// //
// const SpinnerJSX = ({}: SpinnerConfig) => {
//     const spinner = new Spinner();
//     const { intervalTime, iterator, interval, encoder } = spinner.cfg;
//     return (
//         <div>
//             <p>Spinner</p>
//         </div>
//     );
// };

// const rendered = new TextEncoder().encode(await renderToString(<SpinnerJSX />));
// Deno.stdout.write(rendered);

// // xxx(<Spinner></Spinner>);
