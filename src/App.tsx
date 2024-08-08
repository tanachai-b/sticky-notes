import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import {
  Board,
  Copyright,
  FileSaveStatus,
  Toasts,
  ToolBar,
  ToolButton,
  useToast,
} from "./components";
import { NoteData } from "./configs";
import { useFileSystemApi } from "./hooks";
import { sampleNotes } from "./sampleNotes";

export default function App() {
  const { toasts, addToast, clearToasts } = useToast();

  const [notes, setNotes] = useState<NoteData[]>([]);

  const { fileName, isSaved, isAllowFileActions, onNew, onOpen, onSaveAs, onNotesChange } =
    useFileSystemApi({
      notes,
      setNotes,
      clearToasts,
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
        addToast={addToast}
      />

      <ToolBar>
        <ToolButton icon="draft" tooltip="New" isEnabled={isAllowFileActions} onClick={onNew} />

        <ToolButton
          icon="folder_open"
          tooltip="Open"
          isEnabled={isAllowFileActions}
          onClick={onOpen}
        />

        <ToolButton
          icon="save"
          tooltip="Save As"
          isEnabled={isAllowFileActions}
          onClick={onSaveAs}
        />
      </ToolBar>

      <FileSaveStatus fileName={fileName} isSaving={!isSaved} />

      <Copyright />

      <Toasts toasts={toasts} />
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
        "bg-[#202020]",

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
