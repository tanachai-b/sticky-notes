import { allUpdaters, allVersions } from "./save-updaters";
import { Save_v0_2_0 } from "./save-versions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSave(input: any): Save_v0_2_0 {
  const version = getVersion(input) ?? "0.1.1";

  const startIndex = Math.max(
    allVersions.findIndex((v) => v === version),
    0,
  );
  const updaters = allUpdaters.slice(startIndex);

  let output = input;
  updaters.forEach((updater) => (output = updater?.(output) ?? output));

  return output;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getVersion(input: any) {
  if (input.appName !== "sticky-notes") return "0.1.1";

  const version = input.appVersion;
  if (version == null) throw new Error("Invalid save file!");

  return version;
}
