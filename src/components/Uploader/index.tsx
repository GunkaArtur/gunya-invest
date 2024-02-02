import { Button, Upload } from "antd";
import Papa from "papaparse";
import { Item, ItemWithCalcTax } from "../types/type";
import { dividendsSlice } from "../../redux/reducers/dividends";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export type Props = {
  onUpload: VoidFunction;
};

export const Uploader = ({ onUpload }: Props) => {
  const { addDividend } = dividendsSlice.actions;
  const { exchangeRates } = useAppSelector((state) => state.dividends);
  const dispatch = useAppDispatch();

  const parser = (file: any) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // @ts-ignore
        const dividends = result.data
          // @ts-ignore
          .filter(
            (it) =>
              // @ts-ignore
              it["Statement"] === "Dividends",
          )
          .map((dive): Item => {
            // @ts-ignore
            const e = dive["__parsed_extra"];

            // @ts-ignore
            return {
              // @ts-ignore
              date: dive["Field Value"].split("-").reverse().join("."),
              // @ts-ignore
              currency: dive["Field Name"],
              amount: Number(e[1]),
              company: e[0].match("^[^(]+")?.pop(),
              comment: e[0],
            };
          })
          .slice(1)
          .slice(0, -1);

        console.log("here");

        const taxes = result.data
          // @ts-ignore
          .filter((it) => it["Statement"] === "Withholding Tax")
          .map((dive) => {
            // @ts-ignore
            const e = dive["__parsed_extra"];

            return {
              // @ts-ignore
              date: dive["Field Value"].split("-").reverse().join("."),
              // @ts-ignore
              currency: dive["Field Name"],
              amount: Number(e[1]),
              company: e[0].match("^[^(]+")?.pop(),
              comment: e[0],
            };
          })
          .slice(1)
          .slice(0, -1);

        if (taxes.length === dividends.length) {
          const parsedArr = dividends.map((item, idx): ItemWithCalcTax => {
            const exchange = exchangeRates.find((it) => it.date === item.date);

            return {
              ...item,
              tax: taxes[idx].amount,
              netProfit: item.amount - taxes[idx].amount * -1,
              mdlAmount: exchange ? item.amount * exchange.usd : -1,
              taxMDL: exchange ? taxes[idx].amount * exchange.usd * -1 : -1,
            };
          });

          console.log("parsedArr=", parsedArr);

          dispatch(addDividend(parsedArr));
          onUpload();
        } else {
          // @ts-ignore
          dispatch(addDividend(dividends));
          onUpload();
        }
      },
    });
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    // @ts-ignore
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        parser(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // console.log("LOGG", data);
  return (
    <Upload {...props}>
      <Button>Загрузить отчёт</Button>
    </Upload>
  );
};
