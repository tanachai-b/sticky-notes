import { allUpdaters, allVersions } from "./save-updaters";
import { Save_v0_2_0 } from "./save-versions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSave(input: any): Save_v0_2_0 {
  const version = getVersion(input);

  const startIndex = Math.max(allVersions.indexOf(version), 0);
  const updaters = allUpdaters.slice(startIndex);

  let output = input;
  updaters.forEach((updater) => (output = updater?.(output) ?? output));

  return output;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getVersion(input: any): string {
  if (input.appName === "sticky-notes" && input.appVersion != null) return input.appVersion;

  return "0.1.0";
}
