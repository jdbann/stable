import { Fraunces, Inter } from "@next/font/google";

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  fallback: [
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif",
  ],
});

export const inter = Inter({
  variable: "--font-inter",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
  ],
});
