import { NoteData } from "src/configs";
import { Save_v0_8_0 } from "./save-versions";

export function encodeSave(notes: NoteData[]): Save_v0_8_0 {
  return {
    app: "sticky-notes",
    saveApi: "0.8.0",
    notes: notes
      .sort((a, b) => a.text.localeCompare(b.text))
      .map(({ key, ...rest }) => ({ ...rest })),
  };
}
