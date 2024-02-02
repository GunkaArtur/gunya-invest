import React, { useState } from "react";
import "./App.css";
import { Uploader } from "./components/Uploader";
import { Table } from "./components/Table";
import { useAppSelector } from "./hooks/redux";
import { Typography, FloatButton } from "antd";
import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";

const { Title } = Typography;

function App() {
  const [uploaded, setUploaded] = useState(false);
  const { dividends } = useAppSelector((state) => state.dividends);

  const onUpload = () => {
    setUploaded(true);
  };

  return (
    <div className="App">
      <Title>GUNYA INVEST x INVEST MOLDOVA</Title>
      <Title level={3}>Калькулятор налога на дивиденды</Title>
      {!uploaded ? <Uploader onUpload={onUpload} /> : null}
      {uploaded ? <Table data={dividends} /> : null}
      <FloatButton.Group shape="square" style={{ right: 94 }}>
        <FloatButton icon={<QuestionCircleOutlined />} />
        <FloatButton />
        <FloatButton icon={<SyncOutlined />} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </div>
  );
}

export default App;
