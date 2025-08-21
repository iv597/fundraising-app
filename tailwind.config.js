/** @type {import('tailwindcss').Config} */
const { themes } = require("daisyui/src/theming/themes");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    ...themes["light"],
                    fontFamily: "Open Sans, sans-serif",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
