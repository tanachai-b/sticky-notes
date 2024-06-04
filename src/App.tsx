import cx from "classnames";
import { useEffect, useState } from "react";

import { Board, FileName, NoteData, ToolBar, ToolButton } from "./components";
import { useFileSystemApi } from "./hooks";
import { sampleData } from "./sampleData";

export default function App() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [isSampleData, setIsSampleData] = useState<boolean>(true);

  const {
    fileHandle,
    isSaving,
    handleNew,
    handleOpen,
    handleSaveAs,
    resetWriteTimer,
  } = useFileSystemApi({ notes, setNotes, isSampleData });

  useEffect(() => setNotes(sampleData), []);

  useEffect(() => {
    window.onbeforeunload = isSaving
      ? () => "There are unsaved changes!"
      : () => {};
  }, [isSaving]);

  async function handleNotesChange(notes: NoteData[]) {
    setNotes(notes);
    setIsSampleData(false);

    resetWriteTimer(notes);
  }

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "select-none", "text-x13")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className={cx("grow", "relative", "size-full", "flex")}>
        <Board
          className={cx("absolute", "size-full")}
          notes={notes}
          onNotesChange={(notes) => handleNotesChange(notes)}
        />

        <ToolBar className={cx("absolute", "size-full")}>
          <ToolButton icon="note_add" text="New" onClick={handleNew} />
          <ToolButton icon="folder_open" text="Open" onClick={handleOpen} />
          <ToolButton icon="save_as" text="Save As" onClick={handleSaveAs} />
        </ToolBar>

        <FileName
          className={cx("absolute", "size-full")}
          fileName={fileHandle?.name}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
