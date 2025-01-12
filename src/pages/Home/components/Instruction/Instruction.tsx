import { Col, Flex, Row, Typography } from "antd";
import "./styled.scss";
// /Banner/Instruction/step
const listStep = [
  {
    label: "Download",
  },
  {
    label: "Connect wallet",
  },
  {
    label: "Start trading",
  },
  {
    label: "Earn money",
  },
];
const Instruction = () => {
  return (
    <div className="instruction-container">
      <Flex justify="center" align="center" vertical>
        <Typography.Title className="title" level={3}>
          How It Work
        </Typography.Title>
        <p className="text-gray instruction-text">
          Stacks is a production-ready library of stackable content blocks built
          in React Native.
        </p>
      </Flex>
      <Row gutter={[15, 5]} className="instruction-content">
        {listStep.map((step, index) => (
          <Col
            xs={24}
            sm={24}
            lg={6}
            md={6}
            xl={index !== 3 ? 7 : 3}
            key={index}
          >
            <Flex>
              <Flex vertical align="center" justify="center">
                <div className="image">
                  <img
                    className="img-animation"
                    src={`/Banner/Instruction/step${index + 1}.png`}
                    alt={`Step ${index + 1}`}
                  />
                </div>
                <p className="step-label">{step.label}</p>
                <p className="text-gray fs16">
                  Stacks is a production-ready library of stackable content
                  blocks built in React Native.
                </p>
              </Flex>
              <Flex vertical justify="space-evenly" className="img-connect">
                {index !== 3 && (
                  <img
                    src="/Banner/Instruction/connect-line.png"
                    alt="connect-line"
                  />
                )}

                <div></div>
              </Flex>
            </Flex>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Instruction;
