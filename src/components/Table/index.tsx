import React from "react";
import { Table as AntTable, TableProps } from "antd";
import { Item } from "../types/type";

export interface Props {
  data: Item[];
}

export const Table = ({ data }: Props) => {
  const columns: TableProps<Item>["columns"] = [
    {
      title: "Эмитент",
      dataIndex: "company",
      key: "company",
      width: 100,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Дивиденд",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Удержанный налог",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Чистая прибыль",
      dataIndex: "netProfit",
      key: "netProfit",
    },
    {
      title: "Валюта",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Дивиденд в MDL",
      dataIndex: "mdlAmount",
      key: "mdlAmount",
    },
    {
      title: "Налог в MDL",
      dataIndex: "taxMDL",
      key: "taxMDL",
    },
    // {
    //   title: "Comment",
    //   dataIndex: "comment",
    //   key: "comment",
    // },
  ];

  return <AntTable columns={columns} dataSource={data} pagination={false} />;
};
