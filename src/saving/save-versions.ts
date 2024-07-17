export type Save_v0_1_1 = {
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
