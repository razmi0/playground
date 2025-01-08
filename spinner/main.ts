import chalk from "chalk";

const STDOUT = Deno.stdout;

//

// private spinnerColor = chalk.blue, // private asciispinner = ["▖", "▘", "▝", "▗"],
// private spinnerText = "Loading",
// private intervalTime = 100,
// private iterator = { i: 0 },
// private interval: ReturnType<typeof setInterval> | undefined = undefined,
// private encoder = new TextEncoder()
export type SpinnerConfig = {
    asciispinner: string[];
    spinnerColor: (str: string) => string;
    spinnerText: string;
    intervalTime: number;
    iterator: { i: number };
    interval: ReturnType<typeof setInterval> | null;
    encoder: TextEncoder;
    variant: "gross" | "default";
};

export class Spinner {
    public cfg: SpinnerConfig;

    private sp_default = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    private sp_gross = ["▖", "▘", "▝", "▗"];

    constructor(config: Partial<SpinnerConfig> = {}) {
        const defaultConfig: SpinnerConfig = {
            asciispinner: this.sp_default,
            spinnerColor: chalk.blue,
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
            this.padlog(this.cfg?.spinnerColor?.(this.cfg.asciispinner[this.moduloIdx()]));
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
