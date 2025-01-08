import { type Colors, colorfull } from "../colorfull/main.ts";

const STDOUT = Deno.stdout;

export type SpinnerConfig = {
    asciispinner: string[];
    spinnerColor: keyof Colors;
    spinnerText: string;
    intervalTime: number;
    iterator: { i: number };
    interval: ReturnType<typeof setInterval> | null;
    encoder: TextEncoder;
    variant: "gross" | "default";
};

/**
 * @exemple
 * ```ts
 * const spinner = new Spinner();
 * spinner.start();
 * // Do some work here
 * spinner.stop();
 * ```
 * The default config is SpinnerConfig type :
 * ```ts
 * {
 *  asciispinner: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
 *  spinnerColor: "blue",
 *  spinnerText: "Loading",
 *  intervalTime: 100,
 *  iterator: { i: 0 },
 *  interval: null,
 *  encoder: new TextEncoder(),
 *  variant: "default",
 * }
 *```
 * Available themes : "gross" or "default"
 */
export class Spinner {
    public cfg: SpinnerConfig;

    private sp_default = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    private sp_gross = ["▖", "▘", "▝", "▗"];

    constructor(config: Partial<SpinnerConfig> = {}) {
        const defaultConfig: SpinnerConfig = {
            asciispinner: this.sp_default,
            spinnerColor: "blue",
            spinnerText: "Loading",
            intervalTime: 100,
            iterator: { i: 0 },
            interval: null,
            encoder: new TextEncoder(),
            variant: "default",
        };

        if (config.variant === "gross") {
            defaultConfig.asciispinner = this.sp_gross;
        }

        this.cfg = { ...defaultConfig, ...config };
    }

    /**
     *
     */

    start = () => {
        if (this.cfg.interval) {
            clearInterval(this.cfg.interval);
        }
        this.padlog(`  ${this.cfg.spinnerText}`);
        this.cfg.interval = setInterval(() => {
            this.padlog(colorfull(this.cfg.spinnerColor, this.cfg.asciispinner[this.moduloIdx()]));
        }, this.cfg.intervalTime);
    };

    moduloIdx = () => this.cfg.iterator.i++ % this.cfg.asciispinner.length;

    encode = (str: string) => this.cfg.encoder.encode(str);

    stop = () => {
        if (this.cfg.interval) {
            clearInterval(this.cfg.interval);
            this.cfg.interval = null;
        }

        this.cfg.iterator.i = 0;
        this.clearLine();
    };

    padlog = (str: string) => STDOUT.writeSync(this.encode(`\r${str}`));

    clearLine() {
        STDOUT.writeSync(this.encode(`\r`)); // Move back to the beginning
        STDOUT.writeSync(this.encode(" ".repeat(80))); // Clear the line
        STDOUT.writeSync(this.encode(`\r`)); // Move back to the beginning again
    }
}
