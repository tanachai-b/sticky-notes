import { Save_v0_1_0, Save_v0_2_0 } from "./save-versions";

const saveUpdaters = {
  "0.1.0": updateSave_v0_1_0,
  "0.2.0": undefined,
};

export const allVersions = Object.keys(saveUpdaters);
export const allUpdaters = Object.values(saveUpdaters);

function updateSave_v0_1_0(oldSaveFile: Save_v0_1_0): Save_v0_2_0 {
  return {
    appName: "sticky-notes",
    appVersion: "0.2.0",
    notes: oldSaveFile,
  };
}
