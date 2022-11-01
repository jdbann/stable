const plugin = require("tailwindcss/plugin");
const colorSchemePlugin = require("./lib/tailwind/colorSchemePlugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "var(--font-inter)",
      serif: "var(--font-fraunces)",
    },
    fontSize: {
      sm: [
        "0.875rem",
        {
          fontWeight: 300,
          lineHeight: "1rem",
        },
      ],
      base: [
        "1rem",
        {
          fontWeight: 300,
          lineHeight: "1.5rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          fontWeight: 300,
          lineHeight: "1.5rem",
        },
      ],
      "h-sm": [
        "1.5rem",
        {
          fontWeight: 300,
          lineHeight: "2rem",
        },
      ],
      "h-md": [
        "2.25rem",
        {
          fontWeight: 400,
          lineHeight: "2.5rem",
        },
      ],
      "h-lg": [
        "3.75rem",
        {
          fontWeight: 600,
          lineHeight: "4rem",
        },
      ],
    },

    container: {
      center: true,
      padding: "1.5rem",
    },

    screens: {
      lg: "1024px",
    },

    spacing: {
      0: 0,
      1: "0.25rem",
      2: "0.5rem",
      4: "1rem",
      6: "1.5rem",
      8: "2rem",
      12: "3rem",
    },

    height: undefined,
    maxHeight: undefined,
    minHeight: undefined,

    width: undefined,
    maxWidth: ({ theme, breakpoints }) => ({
      ...breakpoints(theme("screens")),
    }),
    minWidth: undefined,
  },
  plugins: [
    colorSchemePlugin({ scales: ["indigo", "slate"] }),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          area: (value) => ({
            gridArea: value,
          }),
        },
        { values: {} }
      );
    }),
  ],
};
