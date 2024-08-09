import {
  Save_v0_11_0,
  Save_v0_1_0,
  Save_v0_2_0,
  Save_v0_3_0,
  Save_v0_4_0,
  Save_v0_8_0,
  Save_v0_9_0,
} from "./save-versions";

export function isSave_v0_1_0(input: unknown): input is Save_v0_1_0 {
  return (
    Array.isArray(input) &&
    (input.length === 0 ||
      ("key" in input[0] &&
        "text" in input[0] &&
        "color" in input[0] &&
        "x" in input[0] &&
        "y" in input[0] &&
        "rotate" in input[0]))
  );
}

export function isSave_v0_2_0(input: unknown): input is Save_v0_2_0 {
  return (
    typeof input === "object" &&
    input != null &&
    "appName" in input &&
    "appVersion" in input &&
    input.appName === "sticky-notes" &&
    input.appVersion === "0.2.0"
  );
}

function isLikeSave_v0_3_0(input: unknown): input is { saveApi: string } {
  return (
    typeof input === "object" &&
    input != null &&
    "app" in input &&
    "saveApi" in input &&
    input.app === "sticky-notes" &&
    typeof input.saveApi === "string"
  );
}

export function isSave_v0_3_0(input: unknown): input is Save_v0_3_0 {
  return isLikeSave_v0_3_0(input) && input.saveApi === "0.3.0";
}

export function isSave_v0_4_0(input: unknown): input is Save_v0_4_0 {
  return isLikeSave_v0_3_0(input) && input.saveApi === "0.4.0";
}

export function isSave_v0_8_0(input: unknown): input is Save_v0_8_0 {
  return isLikeSave_v0_3_0(input) && input.saveApi === "0.8.0";
}

export function isSave_v0_9_0(input: unknown): input is Save_v0_9_0 {
  return isLikeSave_v0_3_0(input) && input.saveApi === "0.9.0";
}

export function isSave_v0_11_0(input: unknown): input is Save_v0_11_0 {
  return isLikeSave_v0_3_0(input) && input.saveApi === "0.11.0";
}
