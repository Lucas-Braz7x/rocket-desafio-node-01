import { stringify } from "csv-stringify";
import { writeFile } from "node:fs/promises";

export const generateCsv = async () => {
  const records = [
    ["title", "description"],
    ["Task 01", "Descrição da Task 01"],
    ["Task 02", "Descrição da Task 02"],
    ["Task 03", "Descrição da Task 03"],
    ["Task 04", "Descrição da Task 04"],
    ["Task 05", "Descrição da Task 05"],
  ];

  const csv = await new Promise<string>((resolve, reject) => {
    stringify(records, (err, output) => {
      if (err) return reject(err);
      resolve(output);
    });
  });

  await writeFile("output.csv", csv);
  console.log("CSV gerado e salvo em output.csv");
};
