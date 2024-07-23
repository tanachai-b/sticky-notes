import { updateTo_v0_2_0, updateTo_v0_3_0, updateTo_v0_4_0 } from "./save-updaters";
import { Save_v0_4_0 } from "./save-versions";

const saveUpdaters = {
  "0.1.0": updateTo_v0_2_0,
  "0.2.0": updateTo_v0_3_0,
  "0.3.0": updateTo_v0_4_0,
  "0.4.0": undefined,
};

const allVersions = Object.keys(saveUpdaters);
const allUpdaters = Object.values(saveUpdaters);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSave(input: any): Save_v0_4_0 {
  const version = getVersion(input);

  const startIndex = Math.max(allVersions.indexOf(version), 0);
  const updaters = allUpdaters.slice(startIndex);

  let output = input;
  updaters.forEach((updater) => (output = updater?.(output) ?? output));

  return output;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getVersion(input: any): string {
  if (input.app === "sticky-notes" && input.saveApi != null) return input.saveApi;

  if (input.appName === "sticky-notes" && input.appVersion != null) return input.appVersion;

  return "0.1.0";
}
