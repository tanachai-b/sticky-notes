import { Save_v0_1_0, Save_v0_2_0, Save_v0_3_0 } from "./save-versions";

const saveUpdaters = {
  "0.1.0": updateTo_v0_2_0,
  "0.2.0": updateTo_v0_3_0,
  "0.3.0": undefined,
};

export const allVersions = Object.keys(saveUpdaters);
export const allUpdaters = Object.values(saveUpdaters);

function updateTo_v0_2_0(oldSave: Save_v0_1_0): Save_v0_2_0 {
  return {
    appName: "sticky-notes",
    appVersion: "0.2.0",
    notes: oldSave,
  };
}

function updateTo_v0_3_0(oldSave: Save_v0_2_0): Save_v0_3_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.3.0",
    notes: oldSave.notes.map((note, index) => ({ ...note, zIndex: index })),
  };
}
