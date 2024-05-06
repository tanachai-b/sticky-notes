import { useMemo, useState } from "react";

import { NoteData } from "./Board/Board";

export function useFileSystemApi({
  notes,
  setNotes,
  isSampleData,
}: {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
  isSampleData: boolean;
}) {
  const filePickerOptions: OpenFilePickerOptions = {
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  };

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const [writeTimer, setWriteTimer] = useState<NodeJS.Timeout>();
  const isSaving = useMemo(() => writeTimer != null, [writeTimer]);

  const haveUnsavedChanges =
    isSaving || (!fileHandle && notes.length > 0 && !isSampleData);

  function confirmUnsavedChanges() {
    return confirm("There's some unsaved changes!");
  }

  async function handleNew() {
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    setFileHandle(undefined);
    clearTimeout(writeTimer);
    setNotes([]);
  }

  async function handleOpen() {
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    try {
      const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const file = await fileHandle.getFile();
      const text = await file.text();
      setNotes(JSON.parse(text));
    } catch (e) {
      return;
    }
  }

  async function handleSaveAs() {
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    try {
      const fileHandle = await window.showSaveFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const writable = await fileHandle?.createWritable();
      await writable.write(JSON.stringify(notes, undefined, 4));
      await writable.close();
    } catch (e) {
      return;
    }
  }

  function resetWriteTimer(notes: NoteData[]) {
    clearTimeout(writeTimer);

    if (!fileHandle) return;

    setWriteTimer(
      setTimeout(async () => {
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(notes, undefined, 4));
        await writable.close();
        setWriteTimer(undefined);
      }, 1000)
    );
  }

  return {
    fileHandle,
    isSaving,
    handleNew,
    handleOpen,
    handleSaveAs,
    resetWriteTimer,
  };
}
