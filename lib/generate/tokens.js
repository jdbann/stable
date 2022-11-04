const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../../tailwind.config.js");

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

function excludeKeys(source, ...keys) {
  return filterKeys(
    source,
    ...Object.keys(source).filter((key) => !keys.includes(key))
  );
}

function filterKeys(source, ...keys) {
  return keys.reduce((obj, key) => ({ ...obj, [key]: source[key] }), {});
}

const borderRadiusToken = tokenBuilder("borderRadius");
const borderWidthToken = tokenBuilder("borderWidth");
const colorToken = tokenBuilder("color");
const sizingToken = tokenBuilder("sizing", remToPx);
const spacingToken = tokenBuilder("spacing", remToPx);

const figmaTokens = {
  base: {
    borderRadius: transformValues(
      fullConfig.theme.borderRadius,
      borderRadiusToken
    ),
    borderWidth: transformLeaf(
      filterKeys(fullConfig.theme, "borderWidth", "ringWidth"),
      borderWidthToken
    ),
    colors: transformLeaf(
      excludeKeys(fullConfig.theme.colors, "dark", "light"),
      tokenBuilder(
        "color",
        (value) =>
          `{theme.colors.${value.replace(
            /var\(--colors-(?<scale>[a-z]+)-(?<step>\d+)(?:,.+)?\)/,
            "$<scale>.$<step>"
          )}}`
      )
    ),
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
  dark: {
    theme: {
      colors: transformLeaf(fullConfig.theme.colors.dark, colorToken),
    },
  },
  light: {
    theme: {
      colors: transformLeaf(fullConfig.theme.colors.light, colorToken),
    },
  },
};

console.log(JSON.stringify(figmaTokens));
