import * as path from "path";
export const rootPath = (paths: string) =>
  path.resolve(__dirname, ...paths.split("/"));

export const hasFlag = (name: string) =>
  process.argv.find((x) => x === "--" + name);

export const flagValue = (name: string, defaultsTo?: any) => {
  const index = process.argv.findIndex((x: string) => x === "--" + name);
  if (index === -1) return defaultsTo;
  const val = process.argv[index + 1];
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};
