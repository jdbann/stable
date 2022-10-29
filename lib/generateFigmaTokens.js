const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

function transformValues(node, fn) {
  if (node === undefined) return undefined;

  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, fn(value)])
  );
}

function transformLeaf(node, fn) {
  if (node === undefined) return undefined;

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

function tokenBuilder(type, fn = (value) => value) {
  return (value) => ({
    value: fn(value),
    type,
  });
}

function filterKeys(source, ...keys) {
  return keys.reduce((obj, key) => ({ ...obj, [key]: source[key] }), {});
}

const colorToken = tokenBuilder("color");
const sizingToken = tokenBuilder("sizing", remToPx);
const spacingToken = tokenBuilder("spacing", remToPx);

const figmaTokens = {
  base: {
    colors: transformLeaf(fullConfig.theme.colors, colorToken),
    sizing: transformLeaf(
      filterKeys(
        fullConfig.theme,
        "height",
        "maxHeight",
        "minHeight",
        "width",
        "maxWidth",
        "minWidth"
      ),
      sizingToken
    ),
    spacing: transformValues(fullConfig.theme.spacing, spacingToken),
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
