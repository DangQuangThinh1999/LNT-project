import { Button, Col, Flex, Row, Typography } from "antd";
import "./styled.scss";

const Banner = () => {
  return (
    <div className="banner">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} span={12}>
          <Flex vertical gap={20}>
            <Typography.Title level={2}>
              Buy & Sell Digital Assets In The Rockie
            </Typography.Title>
            <p className="des">
              Coin rockie is the easiest, safest, and fastest way to buy & sell
              crypto asset exchange.
            </p>
            <Button
              className="btn-start"
              type="primary"
              shape="round"
              size={"large"}
            >
              Get started now
            </Button>
            <Typography.Title level={5}>Our Partners</Typography.Title>
            <Flex gap={30} align="center">
              {new Array(4).fill(null).map((_, j) => (
                <img
                  className="img-banner"
                  key={j}
                  src={`/Banner/Brand/brand${j + 1}.png`}
                  alt={`Brand ${j + 1}`}
                />
              ))}
            </Flex>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} span={12}>
          <img
            className="img-banner"
            src={`/Banner/banner-big.png`}
            alt={`Brand big`}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
