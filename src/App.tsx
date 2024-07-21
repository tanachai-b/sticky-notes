import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { Board, FileSaveStatus, NoteData, ToolBar, ToolButton } from "./components";
import { useFileSystemApi } from "./hooks";
import { sampleNotes } from "./sampleData";

export default function App() {
  const [notes, setNotes] = useState<NoteData[]>([]);

  const { fileName, isSaved, onNew, onOpen, onSaveAs, onNotesChange } = useFileSystemApi({
    notes,
    setNotes,
  });

  useEffect(() => {
    if (notes.length === 0) setNotes(sampleNotes);
  }, []);

  usePreventCloseUnsaved(!isSaved);

  return (
    <Container>
      <Board
        notes={notes}
        onNotesChange={(notes) => {
          setNotes(notes);
          onNotesChange();
        }}
      />

      <ToolBar>
        <ToolButton icon="note_add" label="New" onClick={onNew} />

        <ToolButton icon="folder_open" label="Open" onClick={onOpen} />

        <ToolButton icon="save_as" label="Save As" onClick={onSaveAs} />
      </ToolBar>

      <FileSaveStatus fileName={fileName} isSaving={!isSaved} />
    </Container>
  );
}

function usePreventCloseUnsaved(isUnsaved: boolean) {
  useEffect(() => {
    window.onbeforeunload = () => (isUnsaved ? "" : null);
  }, [isUnsaved]);
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "h-full",

        "flex",
        "flex-col",

        "text-[13px]",
        "select-none",

        "relative",
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
