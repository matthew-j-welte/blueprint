import { useEffect, useState } from "react";
import { UniqueQueue } from "../../shared/helpers/data-structures";
import { ColorPicker, ThemeFields, ThemeInfo } from "../admin.models";
import { ALL_THEMES } from "../themes";

export default function ThemeGalleryPage() {
  const CACHED_THEME_KEY = "cachedTheme";
  const theme: ThemeFields = {
    navbarBackground: "",
    navbarTextColor: "",
    bodyBackground: "",
    bodyHeaderColor: "",
    cardBackground: "",
    jumbotronBackground: "",
    jumbotronHeaderColor: "",
    jumbotronIconColor: "",
    jumbotronSubheaderColor: "",
    jumbotronTextColor: "",
    bodyTextColor: "",
    textPrimary: "",
    textDanger: "",
    textInfo: "",
    textWarning: "",
    textSuccess: "",
  };
  const [themeMap, set_themeMap] = useState<{ [key: string]: string }>();
  const [themeKeys, set_themeKeys] = useState<ColorPicker[]>();
  const [interfacesSourceCode, set_interfacesSourceCode] = useState<string>();
  const [sassSourceCode, set_sassSourceCode] = useState<string>();
  const [colors, set_colors] = useState<string[]>();
  const [globalColor, set_globalColor] = useState<string>();
  const [relatedColors, set_relatedColors] = useState<string[]>();
  const [themeName, set_themeName] = useState<string>();
  const [themes, set_themes] = useState<ThemeInfo[]>(ALL_THEMES);
  const [copiedColor, set_copiedColor] = useState<string | undefined>();
  const [editting, set_editting] = useState<string | undefined>();

  const [relatedColorsQueue, set_relatedColorsQueue] = useState<UniqueQueue<string>>(new UniqueQueue<string>(18));

  useEffect(() => {
    const cachedTheme = localStorage.getItem(CACHED_THEME_KEY);
    if (cachedTheme) {
      const theme: ThemeInfo = JSON.parse(cachedTheme);
      const themeInd = themes.findIndex((x) => x.themeName === theme.themeName);
      if (themeInd !== -1) {
        set_editting(theme.themeName ?? "");
      }
      set_themeMap({ ...theme.themeFields });
      set_themeName(theme.themeName ?? "");
      const _relatedColorsQueue = relatedColorsQueue;
      Object.values(themeMap ?? {})
        .filter((x) => x)
        .forEach((x) => set_relatedColorsQueue(_relatedColorsQueue.push(x)));
      set_relatedColors(_relatedColorsQueue.toList());
    } else {
      set_themeMap({});
    }
    set_themeKeys(
      Object.keys(theme)
        .map(
          (themeKey) =>
            ({
              fieldName: themeKey,
              label: themeKey
                .split("")
                .map((k) => (k === k.toUpperCase() ? " " + k : k))
                .join("")
                .trim(),
            } as ColorPicker)
        )
        .sort((a, b) => (a.fieldName < b.fieldName ? -1 : a.fieldName > b.fieldName ? 1 : 0))
    );
  }, []);

  //   const submit = (): void => {
  //     if (!isThemeValid()) {
  //       return;
  //     }

  //     if (editting) {
  //       const ind = this.themes.findIndex((x) => x.themeName === this.editting);
  //       if (ind !== -1) {
  //         this.themes.splice(ind, 1);
  //       }
  //     }
  //     this.themes.push({
  //       themeName: this.themeName,
  //       themeFields: { ...this.themeMap } as unknown as SentrainThemeFields,
  //     });

  //     this.generateThemesSourceCode();
  //     this.cacheThemeInfo();
  //   };

  //   const initializeThemeToEdit = (theme: SentrainThemeInfo): void => {
  //     if (!theme) {
  //       this.stopEditting();
  //       return;
  //     }
  //     this.clearTheme();
  //     this.editting = theme.themeName ?? "";
  //     this.themeMap = { ...theme.themeFields };
  //     this.themeName = theme.themeName ?? "";
  //     this.relatedColorsQueue.clear();
  //     Object.values(this.themeMap)
  //       .filter((x) => x)
  //       .forEach((x) => this.relatedColorsQueue.push(x));
  //     this.relatedColors = this.relatedColorsQueue.toList();
  //     this.cacheThemeInfo();
  //   };

  //   const stopEditting = (): void => {
  //     this.editting = undefined;
  //     this.clearTheme();
  //   };

  //   const setGlobalColor = (color: string): void => {
  //     this.globalColor = color;
  //   };

  //   const setCardColor = (fieldKey: string, color: string): void => {
  //     this.themeMap[fieldKey] = color;
  //     if (color) {
  //       this.relatedColorsQueue.push(color);
  //       this.relatedColors = this.relatedColorsQueue.toList();
  //     }
  //     this.cacheThemeInfo();
  //   };

  //   const clearTheme = (): void => {
  //     this.themeMap = {};
  //     this.themeName = "";
  //     this.relatedColorsQueue.clear();
  //     this.relatedColors = this.relatedColorsQueue.toList();
  //     localStorage.removeItem(CACHED_THEME_KEY);
  //   };

  //   const setUserActiveTheme = (): void => {
  //     if (this.isThemeValid()) {
  //       this.themeService.setTheme({ ...this.themeMap } as unknown as SentrainThemeFields);
  //     }
  //   };

  //   const copyTheme = (): void => {
  //     this.editting = undefined;
  //     this.themeName = "";
  //   };

  //   const getRandomColor = (): string => {
  //     const [r, g, b] = [1, 2, 3].map((_) => Math.floor(Math.random() * 255));
  //     return `rgb(${r}, ${g}, ${b})`;
  //   };

  //   const isThemeValid = (): boolean => {
  //     const keysEqual = () => Object.keys(this.themeMap).length === Object.keys(this.theme).length;
  //     const allValuesHaveColors = () => Object.values(this.themeMap).every((x) => x.includes("rgb"));
  //     const allColorsFilledOut = keysEqual() && allValuesHaveColors();

  //     if (!allColorsFilledOut) {
  //       // TODO: Make reusable alert service
  //       alert("Fill out your colors DH");
  //       return false;
  //     }
  //     if (this.themeName === undefined || this.themeName === "") {
  //       // TODO: Make reusable alert service
  //       alert("Fill out a name DH");
  //       return false;
  //     }
  //     return true;
  //   };

  //   const generateThemesSourceCode = (): void => {
  //     const themeNames: string[] = [];
  //     const interfaceSourceCode = this.themes.map((t) => {
  //       if (t.themeName) {
  //         themeNames.push(t.themeName);
  //       }
  //       return (
  //         `export const ${t.themeName}: SentrainThemeInfo = {\n  themeName: '${t.themeName}',\n  themeFields: {\n` +
  //         Object.keys(t.themeFields)
  //           .map((key) => {
  //             return `    ${key}: '${(t.themeFields as any)[key]}'`;
  //           })
  //           .join(",\n") +
  //         ",\n  },\n};"
  //       );
  //     });

  //     let sassSourceCodeLines: string[] = [];
  //     Object.keys(this.theme)
  //       .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  //       .forEach((t) => {
  //         if (t) {
  //           const variations = this.themeService.colorVariations.map(
  //             (variation) => `$${t}${variation}: var(--${t}${variation});`
  //           );
  //           sassSourceCodeLines = [...sassSourceCodeLines, `$${t}: var(--${t});`, ...variations, ""];
  //         }
  //       });

  //     this.sassSourceCode = sassSourceCodeLines.join("\n");
  //     this.interfacesSourceCode = `import { SentrainThemeInfo } from './theme.service';

  // ${interfaceSourceCode.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join("\n\n")}

  // export const ALL_THEMES = [${themeNames.join(", ")}];
  // `;
  //   };

  //   const cacheThemeInfo = (): void => {
  //     localStorage.setItem(
  //       CACHED_THEME_KEY,
  //       JSON.stringify({
  //         themeFields: { ...this.themeMap } as unknown as SentrainThemeFields,
  //         themeName: this.themeName,
  //       } as SentrainThemeInfo)
  //     );
  //   };

  return <h1>ThemeGal</h1>;
}
