import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { Board, Copyright, FileSaveStatus, ToolBar, ToolButton } from "./components";
import { NoteData } from "./configs";
import { useFileSystemApi } from "./hooks";
import { sampleNotes } from "./sampleNotes";

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

  const isAllowFileActions = fileName == null || isSaved;

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
        <ToolButton icon="note_add" tooltip="New" isEnabled={isAllowFileActions} onClick={onNew} />

        <ToolButton
          icon="folder_open"
          tooltip="Open"
          isEnabled={isAllowFileActions}
          onClick={onOpen}
        />

        <ToolButton
          icon="save_as"
          tooltip="Save As"
          isEnabled={isAllowFileActions}
          onClick={onSaveAs}
        />
      </ToolBar>

      <FileSaveStatus fileName={fileName} isSaving={!isSaved} />

      <Copyright />
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
        "size-full",
        "bg-[#101010]",

        "grid",

        "select-none",
        "touch-none",

        "overflow-clip",

        "relative",
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
