import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                romantic: {
                    primary: "#ff4d6d",
                    secondary: "#ff8fa3",
                    accent: "#ffb3c1",
                    dark: "#140b12",
                    light: "#fff0f3",
                    muted: "#ffccd5",
                },
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Quicksand", "sans-serif"],
                cursive: ["Dancing Script", "cursive"],
            },
        },
    },
    plugins: [],
};

export default config;
