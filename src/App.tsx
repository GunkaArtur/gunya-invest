import React, { useState } from "react";
import "./styles.scss";
import { Uploader } from "./components/Uploader";
import { Table } from "./components/Table";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  Typography,
  Flex,
  Button,
  Row,
  Col,
  Card,
  Statistic,
  Space,
} from "antd";
import { FloatButtons } from "./components/FloatButtons";
import { dividendsSlice } from "./redux/reducers/dividends";

const { Title } = Typography;

function App() {
  const { removeDividend } = dividendsSlice.actions;
  const dispatch = useAppDispatch();
  const [uploaded, setUploaded] = useState(false);
  const { dividends, allCollectedDividends, allPayedTax } = useAppSelector(
    (state) => state.dividends,
  );

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

          <Space direction={"vertical"}>
            <Row justify={"center"}>
              <Title level={3}>Смотрите мои видео на YouTube</Title>
            </Row>
            <Row gutter={[15, 15]}>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/iWmgj0ZU4n4?si=fHTETipgdBXMILoT"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/VB-9kPGMd_8?si=XY2MXp4BLbUqQAcc"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/S1bcHUMEqF4?si=qYVK5ffXEC-6IL6L"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
            <Row gutter={[15, 15]}>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/vnmNKPv83Mo?si=lJGkVlRoEVuugEeJ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/yO0FjhtemKI?si=TMdqwN763oOOOW23"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
              <Col>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/mgOY0oIosyg?si=Xd1Qwud0r07F_wFa"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
          </Space>
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

          <Space direction={"vertical"}>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Всего полученно дивидендов"
                    value={allCollectedDividends}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    suffix="MDL"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Всего удержано налогов в США"
                    value={allPayedTax}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                    suffix="MDL"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Доплатить налогов осталось"
                    value={allCollectedDividends * 0.12}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                    suffix="MDL"
                  />
                </Card>
              </Col>
            </Row>
            <Table data={dividends} />
          </Space>
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
