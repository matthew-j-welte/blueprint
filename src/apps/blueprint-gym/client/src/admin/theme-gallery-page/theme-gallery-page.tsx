export default function ThemeGalleryPage() {
  return <h1>ThemeGal</h1>;
}

// import { Component, OnInit } from '@angular/core';
// import { UniqueQueue } from 'src/app/shared/helpers/data_structures';
// import { ThemeService, SentrainThemeFields, SentrainThemeInfo } from 'src/app/theme.service';
// import { ALL_THEMES, PurpleNurple } from 'src/app/themes';

// interface ColorPicker {
//   label: string;
//   fieldName: string;
// }

// const CACHED_THEME_KEY = 'cachedTheme';

// @Component({
//   selector: 'app-theme-gallery-page',
//   templateUrl: './theme-gallery-page.component.html',
//   styleUrls: ['./theme-gallery-page.component.scss'],
// })
// export class ThemeGalleryPageComponent implements OnInit {
//   public theme: SentrainThemeFields = {
//     navbarBackground: '',
//     navbarTextColor: '',
//     bodyBackground: '',
//     bodyHeaderColor: '',
//     cardBackground: '',
//     jumbotronBackground: '',
//     jumbotronHeaderColor: '',
//     jumbotronIconColor: '',
//     jumbotronSubheaderColor: '',
//     jumbotronTextColor: '',
//     bodyTextColor: '',
//     textPrimary: '',
//     textDanger: '',
//     textInfo: '',
//     textWarning: '',
//     textSuccess: '',
//   };
//   public themeMap: { [key: string]: string };
//   public themeKeys: ColorPicker[];
//   public interfacesSourceCode: string;
//   public sassSourceCode: string;
//   public colors: string[] = [];
//   public globalColor: string;
//   public relatedColors: string[] = [];
//   public themeName: string;
//   public themes = ALL_THEMES;
//   public copiedColor: string | undefined;
//   public editting: string | undefined;

//   private relatedColorsQueue = new UniqueQueue<string>(18);

//   constructor(private readonly themeService: ThemeService) {}

//   ngOnInit(): void {
//     const cachedTheme = localStorage.getItem(CACHED_THEME_KEY);
//     if (cachedTheme) {
//       const theme: SentrainThemeInfo = JSON.parse(cachedTheme);
//       const themeInd = this.themes.findIndex((x) => x.themeName === theme.themeName);
//       if (themeInd !== -1) {
//         this.editting = theme.themeName ?? '';
//       }
//       this.themeMap = { ...theme.themeFields };
//       this.themeName = theme.themeName ?? '';
//       Object.values(this.themeMap)
//         .filter((x) => x)
//         .forEach((x) => this.relatedColorsQueue.push(x));
//       this.relatedColors = this.relatedColorsQueue.toList();
//     } else {
//       this.themeMap = {};
//     }
//     this.themeKeys = Object.keys(this.theme)
//       .map(
//         (themeKey) =>
//           ({
//             fieldName: themeKey,
//             label: themeKey
//               .split('')
//               .map((k) => (k === k.toUpperCase() ? ' ' + k : k))
//               .join('')
//               .trim(),
//           } as ColorPicker)
//       )
//       .sort((a, b) => (a.fieldName < b.fieldName ? -1 : a.fieldName > b.fieldName ? 1 : 0));
//   }

//   public submit(): void {
//     if (!this.isThemeValid()) {
//       return;
//     }

//     if (this.editting) {
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
//   }

//   public initializeThemeToEdit(theme: SentrainThemeInfo): void {
//     if (!theme) {
//       this.stopEditting();
//       return;
//     }
//     this.clearTheme();
//     this.editting = theme.themeName ?? '';
//     this.themeMap = { ...theme.themeFields };
//     this.themeName = theme.themeName ?? '';
//     this.relatedColorsQueue.clear();
//     Object.values(this.themeMap)
//       .filter((x) => x)
//       .forEach((x) => this.relatedColorsQueue.push(x));
//     this.relatedColors = this.relatedColorsQueue.toList();
//     this.cacheThemeInfo();
//   }

//   public stopEditting(): void {
//     this.editting = undefined;
//     this.clearTheme();
//   }

//   public setGlobalColor(color: string): void {
//     this.globalColor = color;
//   }

//   public setCardColor(fieldKey: string, color: string): void {
//     this.themeMap[fieldKey] = color;
//     if (color) {
//       this.relatedColorsQueue.push(color);
//       this.relatedColors = this.relatedColorsQueue.toList();
//     }
//     this.cacheThemeInfo();
//   }

//   public clearTheme(): void {
//     this.themeMap = {};
//     this.themeName = '';
//     this.relatedColorsQueue.clear();
//     this.relatedColors = this.relatedColorsQueue.toList();
//     localStorage.removeItem(CACHED_THEME_KEY);
//   }

//   public setUserActiveTheme(): void {
//     if (this.isThemeValid()) {
//       this.themeService.setTheme({ ...this.themeMap } as unknown as SentrainThemeFields);
//     }
//   }

//   public copyTheme(): void {
//     this.editting = undefined;
//     this.themeName = '';
//   }

//   public getRandomColor(): string {
//     const [r, g, b] = [1, 2, 3].map((_) => Math.floor(Math.random() * 255));
//     return `rgb(${r}, ${g}, ${b})`;
//   }

//   private isThemeValid(): boolean {
//     const keysEqual = () => Object.keys(this.themeMap).length === Object.keys(this.theme).length;
//     const allValuesHaveColors = () => Object.values(this.themeMap).every((x) => x.includes('rgb'));
//     const allColorsFilledOut = keysEqual() && allValuesHaveColors();

//     if (!allColorsFilledOut) {
//       // TODO: Make reusable alert service
//       alert('Fill out your colors DH');
//       return false;
//     }
//     if (this.themeName === undefined || this.themeName === '') {
//       // TODO: Make reusable alert service
//       alert('Fill out a name DH');
//       return false;
//     }
//     return true;
//   }

//   private generateThemesSourceCode(): void {
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
//           .join(',\n') +
//         ',\n  },\n};'
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
//           sassSourceCodeLines = [...sassSourceCodeLines, `$${t}: var(--${t});`, ...variations, ''];
//         }
//       });

//     this.sassSourceCode = sassSourceCodeLines.join('\n');
//     this.interfacesSourceCode = `import { SentrainThemeInfo } from './theme.service';

// ${interfaceSourceCode.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('\n\n')}

// export const ALL_THEMES = [${themeNames.join(', ')}];
// `;
//   }

//   private cacheThemeInfo(): void {
//     localStorage.setItem(
//       CACHED_THEME_KEY,
//       JSON.stringify({
//         themeFields: { ...this.themeMap } as unknown as SentrainThemeFields,
//         themeName: this.themeName,
//       } as SentrainThemeInfo)
//     );
//   }
// }
