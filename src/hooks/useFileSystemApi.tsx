import { useState } from "react";

import { NoteData } from "../components";
import { useInterval } from "./useInterval";

export function useFileSystemApi({
  notes,
  setNotes,
}: {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
}) {
  const filePickerOptions: OpenFilePickerOptions = {
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  };

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();

  const saveInterval = 500;
  const [lastChangeTime, setLastChangeTime] = useState<number>(Date.now());
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  function confirmUnsavedChanges() {
    return confirm("There's some unsaved changes!");
  }

  async function onNew() {
    if (!isSaved && !confirmUnsavedChanges()) return;

    setFileHandle(undefined);
    setNotes([]);
  }

  async function onOpen() {
    if (!isSaved && !confirmUnsavedChanges()) return;

    try {
      const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const file = await fileHandle.getFile();
      const text = await file.text();
      setNotes(JSON.parse(text));
    } catch (e) {
      console.error(e);
    }
  }

  async function onSaveAs() {
    if (!isSaved && !confirmUnsavedChanges()) return;

    try {
      const fileHandle = await window.showSaveFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const writable = await fileHandle?.createWritable();
      await writable.write(JSON.stringify(notes, undefined, 4));
      await writable.close();
    } catch (e) {
      console.error(e);
    }
  }

  function onNotesChange() {
    setIsSaved(false);
    setLastChangeTime(Date.now());
  }

  useInterval(autoSave, saveInterval);

  async function autoSave() {
    if (!fileHandle) return;

    const timeDiff = Date.now() - lastChangeTime;
    if (isSaved || isSaving || timeDiff < saveInterval) return;

    try {
      setIsSaving(true);

      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(notes, undefined, 4));
      await writable.close();

      setIsSaving(false);
      setIsSaved(true);
    } catch (e) {
      setIsSaving(false);
      console.error(e);
    }
  }

  return {
    fileHandle,
    isSaved,
    onNew,
    onOpen,
    onSaveAs,
    onNotesChange,
  };
}
