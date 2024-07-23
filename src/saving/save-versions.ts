import { NoteColor } from "src/configs";

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
    color: NoteColor;
    x: number;
    y: number;
    rotate: number;
    zIndex: number;
  }[];
};
