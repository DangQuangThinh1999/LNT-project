import { Col, Flex, Row, Typography } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import "./styled.scss";
const listMethod = [
  {
    label: "Free your money & Invest with confident",
    des: "With Cryptor Trade, you can be sure your trading skills are matched",
  },
  {
    label: "Buy, Sell, And Trade On The Go",
    des: "Managa your holdings from your mobile decive",
  },
  {
    label: "Take Control Of Your Wealth",
    des: "Rest assured you (and only you) have access to your funds",
  },
];
const ScanPayment = () => {
  return (
    <Row gutter={[36, 16]} className="scanPayment">
      <Col xs={24} sm={24} xl={12} md={24} lg={12}>
        <Flex gap={20} vertical>
          {listMethod.map((item, index) => {
            return (
              <div key={index}>
                <Flex gap={10} align="center">
                  {index !== 0 && <FaCircleCheck color="blue" />}
                  <Typography.Title
                    className="label-check"
                    level={index === 0 ? 2 : 5}
                  >
                    {item.label}
                  </Typography.Title>
                </Flex>
                <p className={index === 0 ? "des-checkIndex" : "des-check"}>
                  {item.des}
                </p>
              </div>
            );
          })}
        </Flex>
        <Flex gap={20} className="mt20">
          <img
            className="cursor"
            src="/Banner/googlePlay.png"
            alt="Google Play"
          />

          <img className="cursor" src="/Banner/appStore.png" alt="App Store" />
        </Flex>
      </Col>
      <Col xs={24} sm={24} xl={12} md={24} lg={12}>
        <div>
          <img className="image" src="/Banner/scan.png" alt="scan" />
        </div>
      </Col>
    </Row>
  );
};

export default ScanPayment;
