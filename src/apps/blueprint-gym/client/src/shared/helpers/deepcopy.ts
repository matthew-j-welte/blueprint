export function json_deepcopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}
