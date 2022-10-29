const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

function transformValues(node, fn) {
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, fn(value)])
  );
}

function transformLeaf(node, fn) {
  if (typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        transformLeaf(value, fn),
      ])
    );
  } else {
    return fn(node);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractFontName(variable) {
  return capitalize(variable.replace("var(--font-", "").replace(")", ""));
}

function remToPx(value) {
  return `${value}`.includes("rem")
    ? parseFloat(value.replace("rem", "")) * 16
    : value;
}

const figmaTokens = {
  base: {
    colors: transformLeaf(fullConfig.theme.colors, (value) => ({
      value,
      type: "color",
    })),
    spacing: transformValues(fullConfig.theme.spacing, (value) => ({
      value: remToPx(value),
      type: "spacing",
    })),
    typography: transformValues(fullConfig.theme.fontFamily, (familyValue) =>
      transformValues(fullConfig.theme.fontSize, (sizeValue) => ({
        value: {
          fontFamily: extractFontName(familyValue),
          fontWeight: sizeValue[1]["fontWeight"],
          lineHeight: remToPx(sizeValue[1]["lineHeight"]),
          fontSize: remToPx(sizeValue[0]),
        },
        type: "typography",
      }))
    ),
  },
};

console.log(JSON.stringify(figmaTokens));
