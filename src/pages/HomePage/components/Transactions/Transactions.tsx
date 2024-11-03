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
        <div style={{ position: "relative" }}>
          {listDecorativeImg.map((item, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                ...item.style,
                zIndex: 2,
              }}
            >
              <img
                src={item.img}
                alt="coin-icon"
                style={{ height: 50, width: 50, borderRadius: "50%" }}
              />
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
      <Col xs={24} sm={24} xl={12} md={24} lg={12}>
        <Flex gap={20} vertical>
          {listTransition.map((item, index) => {
            return (
              <div key={index}>
                <Flex gap={10} align="center" style={{ fontSize: 24 }}>
                  {index !== 0 && <FaCircleCheck color="blue" />}
                  <Typography.Title
                    style={{ marginBottom: 0, fontSize: 24 }}
                    level={index === 0 ? 2 : 5}
                  >
                    {item}
                  </Typography.Title>
                </Flex>
                <p style={{ fontSize: index === 0 ? 20 : 16, color: "gray" }}>
                  Experience a variety of trading on Bitcost. You can use
                  various types of coin transactions such as Spot Trade, Futures
                  Trade, P2P, Staking, Mining, and margin.
                </p>
              </div>
            );
          })}
        </Flex>
        <Button
          style={{ marginTop: 10 }}
          size="large"
          type="primary"
          shape="round"
        >
          Explore More
        </Button>
      </Col>
    </Row>
  );
};

export default Transactions;
