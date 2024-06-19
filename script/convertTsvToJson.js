import fs from "fs/promises";

const tsv = await fs.readFile("./TSV.txt", { encoding: "utf8" });

const output = convertTsvToJson(tsv.trim());

console.log(output);
await fs.writeFile("./JSON.json", JSON.stringify(output, null, 2));

function convertTsvToJson(tsv) {
  const rows = tsv.split("\n").map((line) => line.split("\t"));

  const keys = rows[0];
  const dataRows = rows.slice(1);

  const output = dataRows.map((row) => convertRowToObject(keys, row));

  return output;
}

function convertRowToObject(keys, row) {
  return row.reduce(
    (object, value, column) => ({ ...object, [keys[column]]: value }),
    {},
  );
}
