export function rgbToHex(rgb: string): string {
  const splitRgb = rgb
    .replace('rgb', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((x) => x.trim());
  let b = splitRgb.map((x) => {
    x = parseInt(x).toString(16);
    return x.length == 1 ? '0' + x : x;
  });
  return '#' + b.join('');
}
