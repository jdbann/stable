const plugin = require("tailwindcss/plugin");
const colors = require("@radix-ui/colors");

function mapScales(scales, opts = {}) {
  const { flatten, scaleNameFn, keyFn, valFn } = {
    flatten: false,
    scaleNameFn: (scaleName) => scaleName,
    keyFn: (_scaleName, stepName, _stepValue) => stepName,
    valFn: (_scaleName, _stepName, stepValue) => stepValue,
    ...opts,
  };

  const transformScale = (scaleName) =>
    Object.entries(
      Object.fromEntries(
        Object.entries(colors[scaleNameFn(scaleName)])
          .map(([stepName, stepValue]) => [
            stepName.replace(scaleName, ""),
            stepValue,
          ])
          .map(([stepName, stepValue]) => [
            keyFn(scaleName, stepName, stepValue),
            valFn(scaleName, stepName, stepValue),
          ])
      )
    );

  if (flatten === true) {
    return Object.fromEntries(scales.flatMap(transformScale));
  } else {
    return Object.fromEntries(
      scales.map((scaleName) => [
        scaleName,
        Object.fromEntries(transformScale(scaleName)),
      ])
    );
  }
}

const setCssVariable = (scaleName, stepName, _stepValue) =>
  `--colors-${scaleName}-${stepName}`;
const useCssVariable = (...args) => `var(${setCssVariable(...args)})`;

const colorSchemePlugin = plugin.withOptions(
  ({ scales } = { scales: [] }) =>
    function ({ addBase, matchUtilities }) {
      matchUtilities(
        {
          "color-scheme": (scaleFn) =>
            mapScales(scales, {
              flatten: true,
              scaleNameFn: scaleFn,
              keyFn: setCssVariable,
            }),
        },
        {
          values: {
            light: (scaleName) => scaleName,
            dark: (scaleName) => `${scaleName}Dark`,
          },
        }
      );

      addBase({
        "@media (prefers-color-scheme: light)": {
          ":root": { "@apply color-scheme-light": {} },
        },

        "@media (prefers-color-scheme: dark)": {
          ":root": { "@apply color-scheme-dark": {} },
        },
      });
    },

  ({ scales } = { scales: [] }) => ({
    theme: {
      colors: {
        ...mapScales(scales, {
          valFn: useCssVariable,
        }),
        dark: mapScales(scales, {
          scaleNameFn: (scaleName) => `${scaleName}Dark`,
        }),
        light: mapScales(scales),
      },
    },
  })
);

module.exports = colorSchemePlugin;
