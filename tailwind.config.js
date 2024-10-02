/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        black: {
          primary: "#0a0b1e",
          hover: "#20212c",
        },
        white: {
          primary: "#ffffff",
          hover: "#f4f7fD",
        },
        red: {
          primary: "#EA5555",
          hover: "#FF9898",
        },
        grey: {
          primary: "#686D76",
          hover: "#E4EBFA",
        },
        green: {
          primary: "#16a34a",
          hover: "#4ade80",
        },
      },
    },
    fontSize: {
      s: "12px",
      m: "15px",
      l: "1rem",
      xl: "24px",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
