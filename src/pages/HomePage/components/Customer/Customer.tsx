import { Avatar, Carousel, Col, Flex, Row, Typography } from "antd";
import { FaQuoteRight } from "react-icons/fa";
import "./styled.scss";
const Customer = () => {
  return (
    <Row gutter={[20, 20]} className="customer">
      <Col xs={24} lg={12} md={12} xl={12}>
        <Typography.Title level={2}>
          Our customers love what we do
        </Typography.Title>
        <Typography.Title level={5}>
          Transform Your idea into Reality With Finsweet
        </Typography.Title>
        <p className="text-gray">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <Flex style={{ marginTop: 10 }} gap={10}>
          {new Array(3).fill(null).map((item, index) => (
            <Avatar
              key={index}
              size="large"
              src={`/Banner/customer/avatar${index + 1}.png`}
              alt={`avatar${index + 1}`}
            />
          ))}
        </Flex>
        <Flex>
          <p>
            <span style={{ color: "blue", fontSize: 16, fontWeight: 500 }}>
              30+
            </span>
            <span style={{ fontWeight: 500, fontSize: 12, color: "gray" }}>
              Customer Reviews
            </span>
          </p>
        </Flex>
      </Col>
      <Col xs={24} lg={12} md={12} xl={12}>
        <Carousel autoplay>
          {new Array(3).fill(null).map((item, index) => {
            return (
              <Flex className="feedback" key={index}>
                <div style={{ float: "right" }}>
                  <FaQuoteRight color="#3772ff" />
                </div>
                <Typography.Title
                  style={{ marginTop: 40 }}
                  className="title-feedback"
                  level={5}
                >
                  “Great course I really enjoyed it and the course was way easy
                  to learn with very good explanations of the code, I could
                  easily understand and develop applications with the knowledge
                  gathered during the course.”
                </Typography.Title>
                <Flex
                  justify="space-between"
                  wrap
                  gap={20}
                  style={{ marginBottom: 20 }}
                >
                  <Flex align="center" gap={10}>
                    <Avatar
                      size={40}
                      src={`/Banner/customer/avatar${index + 1}.png`}
                      alt={`avatar${index + 1}`}
                    />
                    <div>
                      <Typography.Title style={{ marginBottom: 0 }} level={5}>
                        Johnny Andro
                      </Typography.Title>
                      <p style={{ color: "gray" }}>Director, Company</p>
                    </div>
                  </Flex>
                  <img
                    style={{ objectFit: "cover", height: 40 }}
                    src="/Banner/logo-feedback.png"
                    alt="logo feedback"
                  />
                </Flex>
              </Flex>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

export default Customer;
