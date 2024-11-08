import { Button, Carousel, Col, Flex, Row, Typography } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import "./styled.scss";
const listTransition = [
  "What Is Rockie",
  "View real-time cryptocurrency prices",
  "Buy and sell BTC, ETH, XRP, OKB, Etc...",
];
const listDecorativeImg = [
  {
    img: "/Banner/coins/bitcoin.png",
    style: {
      top: "10%",
      left: "5%",
    },
  },
  {
    img: "/Banner/coins/solana.png",
    style: {
      top: "10%",
      right: "5%",
    },
  },
  {
    img: "/Banner/coins/ethereum.png",
    style: {
      top: "2%",
      left: "50%",
    },
  },
  {
    img: "/Banner/coins/tether.png",
    style: {
      bottom: "10%",
      left: "25%",
    },
  },
  {
    img: "/Banner/coins/avalanche.png",
    style: {
      bottom: "15%",
      right: "25%",
    },
  },
];
const Transactions = () => {
  return (
    <Row gutter={[36, 16]} className="transactions">
      <Col xs={24} sm={24} xl={12} md={24} lg={12}>
        <div className="pos-relative">
          {listDecorativeImg.map((item, index) => (
            <div
              key={index}
              className="pos-absolute"
              style={{
                ...item.style,
              }}
            >
              <img src={item.img} alt="coin-icon" className="image" />
            </div>
          ))}

          <Carousel>
            {new Array(4).fill(null).map((item, index) => (
              <img
                key={index}
                src="/Banner/transaction.png"
                alt="transaction"
              />
            ))}
          </Carousel>
        </div>
      </Col>
      <Col className="experience" xs={24} sm={24} xl={12} md={24} lg={12}>
        <Flex gap={20} vertical>
          {listTransition.map((item, index) => {
            return (
              <div key={index}>
                <Flex gap={10} align="center">
                  {index !== 0 && <FaCircleCheck color="blue" />}
                  <Typography.Title
                    className="title"
                    level={index === 0 ? 2 : 5}
                  >
                    {item}
                  </Typography.Title>
                </Flex>
                <p className={index === 0 ? "des-checkIndex" : "des-check"}>
                  Experience a variety of trading on Bitcost. You can use
                  various types of coin transactions such as Spot Trade, Futures
                  Trade, P2P, Staking, Mining, and margin.
                </p>
              </div>
            );
          })}
        </Flex>
        <Button className="mt10" size="large" type="primary" shape="round">
          Explore More
        </Button>
      </Col>
    </Row>
  );
};

export default Transactions;
