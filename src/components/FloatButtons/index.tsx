import { FloatButton, Modal, Popover, Typography } from "antd";
import { QuestionCircleOutlined, HeartFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faTelegram } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";

const { Paragraph } = Typography;

export const FloatButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const popoverContent = (
    <div className={"popover-content"}>
      <Paragraph>
        Загрузите отчёт брокера Interactive Brokers в формате CSV по кнопке
        загрузить отчёт, данный сервис просканирует ваш отчёт и отобразит все
        полученные вами дивиденды и сделает необходимые расчеты для налоговой
      </Paragraph>
      <Paragraph>
        Данный сервис является бесплатным и ни коем образом не сохраняет и не
        передаёт третьим лицам ваши отчёты
      </Paragraph>
    </div>
  );
  return (
    <FloatButton.Group shape="square" style={{ right: 94 }}>
      <FloatButton
        icon={
          <Popover
            content={popoverContent}
            title={"Как пользоваться?"}
            color={"#000"}
          >
            <QuestionCircleOutlined />
          </Popover>
        }
      />

      <FloatButton
        icon={
          <a href="https://t.me/gunyainvest" target="_blank">
            <FontAwesomeIcon icon={faTelegram} color={"#2AABEE"} />
          </a>
        }
      />

      <FloatButton
        icon={
          <a href="https://www.youtube.com/@gunyainvest" target="_blank">
            <FontAwesomeIcon icon={faYoutube} color={"#FF0000"} />
          </a>
        }
      />
      <FloatButton icon={<HeartFilled />} onClick={showModal} />
      <Modal
        className={"modal"}
        title="Благодарность автору!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph>
          Вы можете отблагодарить автора своей подпиской на YouTube канал и
          Telegram канал!
        </Paragraph>
        <Paragraph>
          А также вы можете отблагодарить в USDT TRC-20 по этому адресу
        </Paragraph>
        <Paragraph copyable>TJ2ehKUk6jf7BxpAwFgR7Y5cvERjcjQgnR</Paragraph>
        <Paragraph>
          А также вы можете отблагодарить в TON в сети TON по этому адресу
        </Paragraph>
        <Paragraph copyable>
          EQAYJ5NFxsDXx7w4ZRVKEdn0ergHCJV5baXxwIM80Ujk6WYn
        </Paragraph>
      </Modal>
    </FloatButton.Group>
  );
};
