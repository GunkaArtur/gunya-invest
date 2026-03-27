import { Alert, Button, Upload, UploadProps } from "antd";
import { useState } from "react";
import Papa from "papaparse";
import { Props } from "../index";
import { dividendsSlice } from "../../../redux/reducers/dividends";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

export const UploaderFF = ({ onUpload }: Props) => {
  const { addDividend } = dividendsSlice.actions;
  const { exchangeRates } = useAppSelector((state) => state.dividends);
  const dispatch = useAppDispatch();
  const [err, setErr] = useState(false);

  const handleParseJSON = (file: any) => {
    if (!file.cash_in_outs) {
      return;
    }
    console.log("handleParseJSON", file.cash_in_outs);

    const dividends = file.cash_in_outs
      // @ts-ignore
      .filter((it) => it.type === "dividend")
      // @ts-ignore
      .map((dive): Item => {
        //
        // // @ts-ignore
        return {
          // @ts-ignore
          date: dive.datetime.split(" ")[0].split("-").reverse().join("."),
          currency: dive.currency,
          amount: Number(dive.amount),
          company: dive.ticker,
          comment: dive.comment,
          tax: 0,
        };
      });

    const dividendsMerged = Object.values(
      // @ts-ignore
      dividends.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = { ...item }; // Создаем новый объект
        } else {
          acc[item.date].amount += item.amount; // Складываем стоимость
        }
        return acc;
      }, {}),
    );

    const taxes = file.cash_in_outs
      // @ts-ignore
      .filter((it) => it.type === "tax" || it.type === "agent_fee")
      // @ts-ignore
      .map((tax) => {
        if (tax.type === "agent_fee") {
          return {
            date: tax.datetime.split(" ")[0].split("-").reverse().join("."),
            currency: tax.currency,
            amount: 0,
            company: tax.ticker,
            comment: tax.comment,
            agentCommission: Number(tax.amount),
          };
        }
        return {
          date: tax.datetime.split(" ")[0].split("-").reverse().join("."),
          currency: tax.currency,
          amount: Number(tax.amount),
          company: tax.ticker,
          comment: tax.comment,
        };
      });

    const newOne = dividendsMerged.map((div) => {
      const tax = taxes.find(
        // @ts-ignore
        (tx) => tx.date === div.date && tx.company === div.company,
      ); // @ts-ignore
      const exchange = exchangeRates.find((it) => it.date === div.date);
      console.log(
        "tax && tax.agentCommission",
        Boolean(tax && tax.agentCommission),
        exchange // @ts-ignore
          ? (div.amount - tax.agentCommission * -1) * exchange.usd
          : -1,
      );
      if (Boolean(tax && tax.agentCommission)) {
        // @ts-ignore
        return {
          // @ts-ignore
          ...div,
          agentCommission: tax.agentCommission, // @ts-ignore
          // @ts-ignore
          netProfit: div.amount - tax.agentCommission * -1, // @ts-ignore
          mdlAmount: exchange // @ts-ignore
            ? (div.amount - tax.agentCommission * -1) * exchange.usd
            : -1,
          taxMDL: exchange ? tax.amount * exchange.usd * -1 : -1,
        };
      }

      if (tax) {
        return {
          // @ts-ignore
          ...div,
          tax: tax.amount, // @ts-ignore
          netProfit: div.amount - tax.amount * -1, // @ts-ignore
          mdlAmount: exchange ? div.amount * exchange.usd : -1,
          taxMDL: exchange ? tax.amount * exchange.usd * -1 : -1,
        };
      }
      return {
        // @ts-ignore
        ...div, // @ts-ignore
        netProfit: div.amount, // @ts-ignore
        mdlAmount: exchange ? div.amount * exchange.usd : -1,
        taxMDL: 0,
      };
    });

    console.log("newOne", newOne);

    // @ts-ignore
    const preetyArr = newOne.map((item) => ({
      ...item,
      netProfit: Number(item.netProfit.toFixed(2)),
      mdlAmount: Number(item.mdlAmount.toFixed(2)),
      taxMDL: Number(item.taxMDL.toFixed(2)),
    }));

    dispatch(addDividend(preetyArr));
    onUpload();
  };

  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    // @ts-ignore
    onChange(info) {
      if (info.file.status !== "uploading") {
        const file = info.file.originFileObj;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            handleParseJSON(json);
          } catch (error) {
            console.error("Ошибка при чтении JSON:", error);
          }
        };
        reader.readAsText(file);

        // parser(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      console.log("beforeUpload", file);
      const isJSON = file.type === "application/json";
      if (!isJSON) {
        setErr(true);
      }
      return isJSON || Upload.LIST_IGNORE;
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button className={"upload-button"}>Загрузить отчёт FF</Button>
      </Upload>
      {err ? (
        <Alert
          message="Ошибка! Неверный формат файла!"
          description="Загружайте только .json формат файла."
          type="error"
          showIcon
          closeIcon
          afterClose={() => setErr(false)}
        />
      ) : null}
    </>
  );
};
