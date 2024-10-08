import { NoteColor_v0_4_0, NoteColor_v0_9_0 } from "./save-colors";

export type Save_v0_1_0 = {
  key: string;
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
}[];

export type Save_v0_2_0 = {
  appName: "sticky-notes";
  appVersion: "0.2.0";
  notes: {
    key: string;
    text: string;
    color: number;
    x: number;
    y: number;
    rotate: number;
  }[];
};

export type Save_v0_3_0 = {
  app: "sticky-notes";
  saveApi: "0.3.0";
  notes: {
    key: string;
    text: string;
    color: number;
    x: number;
    y: number;
    rotate: number;
    zIndex: number;
  }[];
};

export type Save_v0_4_0 = {
  app: "sticky-notes";
  saveApi: "0.4.0";
  notes: {
    key: string;
    text: string;
    color: NoteColor_v0_4_0;
    x: number;
    y: number;
    rotate: number;
    zIndex: number;
  }[];
};

export type Save_v0_8_0 = {
  app: "sticky-notes";
  saveApi: "0.8.0";
  notes: {
    text: string;
    color: NoteColor_v0_4_0;
    x: number;
    y: number;
    z: number;
    angle: number;
  }[];
};

export type Save_v0_9_0 = {
  app: "sticky-notes";
  saveApi: "0.9.0";
  notes: {
    text: string;
    color: NoteColor_v0_9_0;
    x: number;
    y: number;
    z: number;
    angle: number;
  }[];
};

export type Save_v0_11_0 = {
  app: "sticky-notes";
  saveApi: "0.11.0";
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
  notes: {
    text: string;
    color: NoteColor_v0_9_0;
    x: number;
    y: number;
    z: number;
    angle: number;
  }[];
};

export type Save_v0_13_0 = {
  app: "sticky-notes";
  saveApi: "0.13.0";
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
  notes: {
    x: number;
    y: number;
    z: number;
    angle: number;
    color: NoteColor_v0_9_0;
    text: string;
    strikethrough: boolean;
  }[];
};
