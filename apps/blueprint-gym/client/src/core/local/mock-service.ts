import { MockData } from "./mock-data";

export function getMockDataFromViewNumber(view: number): any {
  return MockData[view];
}
