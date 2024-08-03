import { NoteData } from "src/configs";
import {
  updateTo_v0_2_0,
  updateTo_v0_3_0,
  updateTo_v0_4_0,
  updateTo_v0_8_0,
} from "./save-updaters";
import {
  isSave_v0_1_0,
  isSave_v0_2_0,
  isSave_v0_3_0,
  isSave_v0_4_0,
  isSave_v0_8_0,
} from "./save-version-checkers";
import { Save_v0_8_0 } from "./save-versions";

export function decodeSave(input: unknown): NoteData[] {
  const updatedSave = updateSave(input);

  const notes = updatedSave.notes;
  const notesWithKeys = notes.map((note): NoteData => {
    const key = Math.floor(Math.random() * 36 ** 4).toString(36);
    return { ...note, key };
  });

  return notesWithKeys;
}

function updateSave(input: unknown): Save_v0_8_0 {
  let output = input;

  if (isSave_v0_1_0(output)) output = updateTo_v0_2_0(output);
  if (isSave_v0_2_0(output)) output = updateTo_v0_3_0(output);
  if (isSave_v0_3_0(output)) output = updateTo_v0_4_0(output);
  if (isSave_v0_4_0(output)) output = updateTo_v0_8_0(output);
  if (isSave_v0_8_0(output)) return output;

  throw new Error("Invalid save file!");
}
