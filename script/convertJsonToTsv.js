import fs from "fs/promises";

const jsonString = await fs.readFile("./JSON.json", { encoding: "utf8" });
const json = JSON.parse(jsonString);

const output = convertJsonToTsv(json);

console.log(output);
await fs.writeFile("./TSV.txt", output.toString());

function convertJsonToTsv(json) {
  const headers = Array.from(
    new Set(
      json.reduce((headers, item) => [...headers, ...Object.keys(item)], []),
    ),
  );

  const headerRow = headers.join("\t");

  const dataRows = json
    .map((item) => concatItemValues(headers, item))
    .join("\n");

  const output = [headerRow, dataRows].join("\n");

  return output;
}

function concatItemValues(headers, item) {
  return headers.map((header) => convertValueToString(item[header])).join("\t");
}

function convertValueToString(value) {
  if (`${value}`.includes("\n")) return `"${value}"`;
  return value;
}
