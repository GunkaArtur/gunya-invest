import React, { useState } from "react";
import "./App.css";
import { Uploader } from "./components/Uploader";
import { Table } from "./components/Table";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Typography, Flex, Button } from "antd";
import { FloatButtons } from "./components/FloatButtons";
import { dividendsSlice } from "./redux/reducers/dividends";

const { Title } = Typography;

function App() {
  const { removeDividend } = dividendsSlice.actions;
  const dispatch = useAppDispatch();
  const [uploaded, setUploaded] = useState(false);
  const { dividends } = useAppSelector((state) => state.dividends);

  const onReplay = () => {
    dispatch(removeDividend());
    setUploaded(false);
  };

  const onUpload = () => {
    setUploaded(true);
  };

  return (
    <div className="App">
      {!uploaded ? (
        <div className={"intro"}>
          <Title className={"main-title"} color={"#fff"}>
            GUNYA INVEST
          </Title>
          <Title level={3}>Калькулятор налога на дивиденды</Title>
          <Flex gap={"middle"} vertical justify={"center"} align={"center"}>
            <Uploader onUpload={onUpload} />
          </Flex>
        </div>
      ) : null}

      {uploaded ? (
        <>
          <Flex gap={"middle"} align={"center"} justify={"space-between"}>
            <Title className={"main-title"} level={3}>
              GUNYA INVEST
            </Title>
            <Title level={3}>Калькулятор налога на дивиденды</Title>
          </Flex>
          <Table data={dividends} />
        </>
      ) : null}
      <FloatButtons />
      <div className={"footer"}>
        {uploaded ? (
          <Button className={"upload-button"} onClick={onReplay}>
            Начать заново!
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
