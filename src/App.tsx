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
import { NoteData, Viewport } from "./configs";
import { useFileSystemApi } from "./hooks";
import { sampleNotes, sampleViewportData } from "./sampleNotes";

export default function App() {
  const { toasts, addToast, clearToasts } = useToast();

  const [viewport, setViewport] = useState<Viewport>(sampleViewportData);
  const [notes, setNotes] = useState<NoteData[]>(sampleNotes);

  const { fileName, isSaved, isAllowFileActions, onNew, onOpen, onSaveAs, stampChangeTime } =
    useFileSystemApi({
      viewport,
      notes,
      setViewport,
      setNotes,
      clearToasts,
    });

  usePreventCloseUnsaved(!isSaved);

  const onViewportChange = ({ x, y, zoom }: Viewport) => {
    const roundedViewport = {
      x: Math.round(x),
      y: Math.round(y),
      zoom: Math.round(zoom * 2) / 2,
    };
    setViewport(roundedViewport);
    stampChangeTime();
  };

  const onNotesChange = (notes: NoteData[]) => {
    const roundedNotes = notes.map(({ x, y, ...rest }) => ({
      ...rest,
      x: Math.round(x),
      y: Math.round(y),
    }));
    setNotes(roundedNotes);
    stampChangeTime();
  };

  return (
    <Container>
      <Board
        viewport={viewport}
        notes={notes}
        onViewportChange={onViewportChange}
        onNotesChange={onNotesChange}
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
