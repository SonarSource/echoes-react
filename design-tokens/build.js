import { registerTransforms, transforms } from "@tokens-studio/sd-transforms";
import * as fs from "fs";
import StyleDictionary from "style-dictionary";

registerTransforms(StyleDictionary, {});

const DESIGN_TOKENS_PATH = "design-tokens/tokens";
const BUILD_PATH = "src/generated/";
const NAME_PREFIX = "design-tokens-";
const LAYER1_NAME = `${NAME_PREFIX}layer1`;
const CUSTOM_TRANSFORM_GROUP = "sonar-design-tokens";
const CUSTOM_FILTER_NO_COLOR = "sonar-no-color";
const CUSTOM_FILTER_NO_CORE = "sonar-exclude-core";

StyleDictionary.registerTransformGroup({
  name: CUSTOM_TRANSFORM_GROUP,
  transforms: ["attribute/cti", ...transforms, "name/cti/kebab"],
});

StyleDictionary.registerFilter({
  name: CUSTOM_FILTER_NO_COLOR,
  matcher: (token) => token.attributes.category !== "color",
});

StyleDictionary.registerFilter({
  name: CUSTOM_FILTER_NO_CORE,
  matcher: (token) => !token.filePath.includes(`core.json`),
});

// Build Layer 1
StyleDictionary.extend({
  source: [`${DESIGN_TOKENS_PATH}/core.json`],
  platforms: {
    echoes: {
      transformGroup: CUSTOM_TRANSFORM_GROUP,
      buildPath: BUILD_PATH,
      files: [
        {
          destination: `${LAYER1_NAME}.css`,
          format: "css/variables",
          filter: CUSTOM_FILTER_NO_COLOR,
          options: {
            showFileHeader: true,
            selector: ":root",
          },
        },
        {
          destination: `${LAYER1_NAME}.json`,
          format: "json/nested",
          filter: CUSTOM_FILTER_NO_COLOR,
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

// Build themed layers
const $themes = JSON.parse(
  fs.readFileSync(`${DESIGN_TOKENS_PATH}/$themes.json`, "utf-8")
);
$themes.forEach((theme) => {
  StyleDictionary.extend({
    source: Object.entries(theme.selectedTokenSets)
      .filter(([, val]) => val !== "disabled")
      .map(([tokenset]) => `${DESIGN_TOKENS_PATH}/${tokenset}.json`),
    platforms: {
      echoes: {
        transformGroup: CUSTOM_TRANSFORM_GROUP,
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `${NAME_PREFIX}${theme.name}.css`,
            format: "css/variables",
            filter: CUSTOM_FILTER_NO_CORE,
            options: {
              showFileHeader: true,
              selector: `html[data-theme='${theme.name}']`,
            },
          },
        ],
      },
    },
  }).buildAllPlatforms();
});
