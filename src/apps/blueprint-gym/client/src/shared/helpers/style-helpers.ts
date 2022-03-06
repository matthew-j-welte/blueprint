export function rgbToHex(rgb: string): string {
  const splitRgb = rgb
    .replace("rgb", "")
    .replace("(", "")
    .replace(")", "")
    .split(",")
    .map((x) => x.trim());
  let b = splitRgb.map((x) => {
    x = parseInt(x).toString(16);
    return x.length == 1 ? "0" + x : x;
  });
  return "#" + b.join("");
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}
