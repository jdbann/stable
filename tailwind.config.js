const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      indigo: {
        1: "#131620",
        2: "#15192d",
        3: "#192140",
        4: "#1c274f",
        5: "#1f2c5c",
        6: "#22346e",
        7: "#273e89",
        8: "#2f4eb2",
        9: "#3e63dd",
        10: "#5373e7",
        11: "#849dff",
        12: "#eef1fd",
      },
      slate: {
        1: "#151718",
        2: "#1a1d1e",
        3: "#202425",
        4: "#26292b",
        5: "#2b2f31",
        6: "#313538",
        7: "#3a3f42",
        8: "#4c5155",
        9: "#697177",
        10: "#787f85",
        11: "#9ba1a6",
        12: "#ecedee",
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
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
    screens: {
      lg: "1024px",
    },
  },
  plugins: [
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
