export const colors = {
    black: "\x1b[0;90m",
    red: "\x1b[0;91m",
    green: "\x1b[0;92m",
    yellow: "\x1b[0;93m",
    blue: "\x1b[0;94m",
    purple: "\x1b[0;95m",
    cyan: "\x1b[0;96m",
    white: "\x1b[0;97m",
    brightBlack: "\x1b[0;90m",
    brightRed: "\x1b[0;91m",
    brightGreen: "\x1b[0;92m",
    brightYellow: "\x1b[0;93m",
    brightBlue: "\x1b[0;94m",
    brightPurple: "\x1b[0;95m",
    brightCyan: "\x1b[0;96m",
    brightWhite: "\x1b[0;97m",
    reset: "\x1b[0m",
};

export type Colors = typeof colors;

export const colorfull = (color: keyof typeof colors, text: string) => {
    if (!colors[color]) {
        throw new Error(`Invalid color: ${color}`);
    }
    return `${colors[color]}${text}${colors.reset}`;
};
