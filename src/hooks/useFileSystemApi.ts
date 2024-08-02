import { useEffect, useState } from "react";
import { useTrigger } from "src/common-hooks";
import { NoteData } from "src/configs";
import { generateSave, updateSave } from "src/saving";

export function useFileSystemApi({
  notes,
  setNotes,
  clearToasts,
}: {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
  clearToasts: () => void;
}) {
  const filePickerOptions: OpenFilePickerOptions = {
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  };

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const fileName = fileHandle?.name;

  const saveInterval = 500;
  const [lastChangeTime, setLastChangeTime] = useState<number>(Date.now());
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const isAllowFileActions = fileName == null || isSaved;

  const triggerAutoSave = useTrigger(autoSave);

  useEffect(() => {
    const interval = setInterval(triggerAutoSave, saveInterval);
    return () => clearInterval(interval);
  }, []);

  function confirmUnsavedChanges() {
    return confirm("There's some unsaved changes!");
  }

  async function onNew() {
    if (!isSaved && !confirmUnsavedChanges()) return;

    setFileHandle(undefined);
    setNotes([]);
    clearToasts();
  }

  async function onOpen() {
    if (!isSaved && !confirmUnsavedChanges()) return;

    try {
      const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
      await fileHandle.createWritable();

      const file = await fileHandle.getFile();
      const text = await file.text();

      const save = JSON.parse(text);
      const updatedSave = updateSave(save);
      const notes = updatedSave.notes;

      setFileHandle(fileHandle);
      setNotes(notes);
      clearToasts();
    } catch (error) {
      console.error(error);
    }
  }

  async function onSaveAs() {
    if (fileHandle && !isSaved && !confirmUnsavedChanges()) return;

    try {
      const fileHandle = await window.showSaveFilePicker(filePickerOptions);
      await fileHandle.createWritable();
      setFileHandle(fileHandle);

      const save = JSON.stringify(generateSave(notes), undefined, 2);

      const writable = await fileHandle.createWritable();
      await writable.write(save);
      await writable.close();
    } catch (error) {
      console.error(error);
    }
  }

  function onNotesChange() {
    setIsSaved(false);
    setLastChangeTime(Date.now());
  }

  async function autoSave() {
    if (!fileHandle) return;

    const timeDiff = Date.now() - lastChangeTime;
    if (isSaved || isSaving || timeDiff < saveInterval) return;

    try {
      setIsSaving(true);

      const save = JSON.stringify(generateSave(notes), undefined, 2);

      const writable = await fileHandle.createWritable();
      await writable.write(save);
      await writable.close();

      setIsSaving(false);
      setIsSaved(true);
    } catch (error) {
      setIsSaving(false);
      console.error(error);
    }
  }

  return {
    fileName,
    isSaved,
    isAllowFileActions,
    onNew,
    onOpen,
    onSaveAs,
    onNotesChange,
  };
}
