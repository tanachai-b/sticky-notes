import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";

import {
  Board,
  FileSaveStatus,
  NoteData,
  ToolBar,
  ToolButton,
} from "./components";
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
    <Container>
      <Board notes={notes} onNotesChange={handleNotesChange} />

      <ToolBar>
        <ToolButton icon="note_add" label="New" onClick={handleNew} />
        <ToolButton icon="folder_open" label="Open" onClick={handleOpen} />
        <ToolButton icon="save_as" label="Save As" onClick={handleSaveAs} />
      </ToolBar>

      <FileSaveStatus fileName={fileHandle?.name} isSaving={isSaving} />
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "h-full",

        "flex",
        "flex-col",

        "text-x13",

        "relative",
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
