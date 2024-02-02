import { useState } from "react";

type ExpectedFormat = {
  companyName: string;
  date: string;
  amount: number;
  witholdingTax: number;
};

export const CSVConverter: React.FC = () => {
  const [expectedFormatData, setExpectedFormatData] = useState<
    ExpectedFormat[]
  >([]);

  function convertToExpectedFormat(csvData: string): ExpectedFormat[] {
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split("\t");
    const data = [];

    for (let i = 2; i < lines.length; i++) {
      const values = lines[i].split("\t");
      const record = {};

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        const value = values[j].trim();
        // @ts-ignore
        record[header] = value;
      }

      // @ts-ignore
      if (record["Description"] && record["Amount"] && record["Code"]) {
        // @ts-ignore
        const descriptionParts = record["Description"].split(" ");
        const companyName = descriptionParts[0];
        // @ts-ignore
        const witholdingTax = parseFloat(record["Amount"]) * -1;
        const amount = parseFloat(
          descriptionParts[descriptionParts.length - 2],
        );

        // @ts-ignore
        const expectedRecord = {
          companyName,
          // @ts-ignore
          date: record["Date"],
          amount,
          witholdingTax,
        };

        data.push(expectedRecord);
      }
    }

    return data;
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const csvData = e.target?.result as string;
        const convertedData = convertToExpectedFormat(csvData);
        setExpectedFormatData(convertedData);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h2>Converted Data:</h2>
        <pre>{JSON.stringify(expectedFormatData, null, 2)}</pre>
      </div>
    </div>
  );
};
