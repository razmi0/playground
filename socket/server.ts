import { runner } from "./runner.ts";
//
console.log(`Server running at http://localhost:8080`);
Deno.serve({ port: 8080 }, runner);
