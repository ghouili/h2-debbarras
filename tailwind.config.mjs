import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "var(--font-noto-serif)",
          "Noto Serif",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        body: [
          "var(--font-source-code-pro)",
          "Source Code Pro",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
  plugins: [animate],
};
