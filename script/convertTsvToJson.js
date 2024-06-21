import fs from "fs/promises";

const tsv = await fs.readFile("./TSV.txt", { encoding: "utf8" });

const output = convertTsvToJson(tsv.trim());

console.log(output);
// await fs.writeFile("./JSON.json", JSON.stringify(output, null, 2));

function convertTsvToJson(tsv) {
  const rows = tsv.split("\n").map((line) => line.split("\t"));
  const asdf = concatNewLines(rows);

  console.log("asdf", asdf);

  const keys = asdf[0];
  const dataRows = asdf.slice(1);

  const output = dataRows.map((row) => convertRowToObject(keys, row));

  return output;
}

function concatNewLines(rows) {
  let combineWithLastRow = false;

  const sadf = rows.map((row, index) => {
    if (index - 1 < 0) return { row };

    const finalValueLastRow = rows[index - 1].slice(-1)[0];
    const firstValueCurrentRow = row[0];

    if (finalValueLastRow.startsWith('"')) {
      console.log("case1");
      combineWithLastRow = true;
      return { row, combineWithLastRow };
    } else if (firstValueCurrentRow.endsWith('"')) {
      console.log("case2");
      combineWithLastRow = false;
      return { row, combineWithLastRow: true };
    }
    console.log("case3");
    return { row, combineWithLastRow };
  }, []);

  console.log("sadf", sadf);

  return sadf.reduce((res, { row, combineWithLastRow }) => {
    if (combineWithLastRow) {
      return [
        ...res.slice(0, -1),
        [[res.slice(-1)[0], row[0]].join("\n"), ...row.slice(1)],
      ];
    } else {
      return [...res, row];
    }
  }, []);

  // return rows.reduce((res, row, index) => {
  //   if (index + 1 >= rows.length) return [...res, row];

  //   const finalValueCurrentRow = row.slice(-1)[0];
  //   const firstValueNextRow = rows[index + 1][0];

  //   if (
  //     finalValueCurrentRow.startsWith('"') &&
  //     firstValueNextRow.endsWith('"')
  //   ) {
  //     return [
  //       ...res,
  //       [
  //         ...row.slice(0, -1),
  //         [finalValueCurrentRow, firstValueNextRow].join("\n"),
  //         ...rows[index + 1].slice(1),
  //       ],
  //     ];
  //   } else {
  //     return [...res, row];
  //   }
  // }, []);
}

function convertRowToObject(keys, row) {
  return row.reduce(
    (object, value, column) => ({ ...object, [keys[column]]: value }),
    {},
  );
}
