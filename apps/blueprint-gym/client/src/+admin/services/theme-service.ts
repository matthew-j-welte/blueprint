import { ThemeFields } from "../admin.models";

const colorVariations = ["Light", "Lighter", "Dark", "Darker", "Fade"];
const shadeVariationMap: { [key: string]: number } = {
  Light: 10,
  Lighter: 30,
  Dark: -10,
  Darker: -30,
};

const setTheme = (theme: any | ThemeFields): void => {
  Object.keys(theme).forEach((k) => {
    document.documentElement.style.setProperty(`--${k}`, theme[k]);
    // Add dynamic variables
    let [red, green, blue] = theme[k]
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((x: string) => +x.trim());

    colorVariations.map((variableVariation) => {
      if (variableVariation === "Fade") {
        const variationKey = `--${k}Fade`;
        const shadedRGB = `rgba(${red}, ${green}, ${blue}, .21)`;
        document.documentElement.style.setProperty(variationKey, shadedRGB);
      } else {
        const increment = shadeVariationMap[variableVariation];
        const incrementer = (num: number, inc: number) => (num + inc > 255 ? 255 : num + inc < 0 ? 0 : num + inc);

        red = incrementer(red, increment);
        green = incrementer(green, increment);
        blue = incrementer(blue, increment);

        const variationKey = `--${k}${variableVariation}`;
        const shadedRGB = `rgb(${red}, ${green}, ${blue})`;
        document.documentElement.style.setProperty(variationKey, shadedRGB);
      }
    });
  });
};

export const ThemeService = {
  colorVariations,
  shadeVariationMap,
  setTheme,
};
