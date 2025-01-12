import { Button, Card, Col, Flex, Row, Typography } from "antd";

import ListTabs from "@/common/ListTabs/ListTabs";
import "./styled.scss";
const listWallets = [
  "Crypto",
  "DeFi",
  "BSC",
  "NFT",
  "Metaverse",
  "Polkadot",
  "Solana",
  "Opensea",
  "Makersplace",
];
const listCoin = [
  {
    img: "/Banner/coins/bitcoin.png",
    label: "Bitcoin",
    unit: "BTC/USD",
    amount: "USD $46,168.95",
    percent: "-0.79%",
  },
  {
    img: "/Banner/coins/ethereum.png",
    label: "Ethereum",
    unit: "ETH/USD",
    amount: "USD $3,480.04",
    percent: "+10.55%",
  },
  {
    img: "/Banner/coins/bitcoin.png",
    label: "Tether",
    unit: "USDT/USD",
    amount: "USD $46,168.95",
    percent: "-0.01%",
  },
  {
    img: "/Banner/coins/bnb.png",
    label: "BNB",
    unit: "BNB/USD",
    amount: "USD $46,168.95",
    percent: "-0.24%",
  },
];
const CardWallets = () => {
  return (
    <div className="shadow-card active">
      <Card
        title={
          <div className="wrapper-title-card">
            <ListTabs data={listWallets} />
          </div>
        }
      >
        <Row gutter={[20, 20]}>
          {listCoin.map((coin, index) => (
            <Col key={index} xs={24} sm={12} lg={6} md={12} xl={6}>
              <Card className={`shadow-card  `}>
                <Flex gap={10}>
                  <img src={coin.img} alt={coin.label} className="img-shadow" />
                  <Typography.Title level={5}>{coin.label}</Typography.Title>
                  <Typography.Title className="unit-text" level={5}>
                    {coin.unit}
                  </Typography.Title>
                </Flex>
                <Typography.Title className="amount-text" level={5}>
                  {coin.amount}
                </Typography.Title>
                <Flex gap={20}>
                  <p>36,641.20</p>
                  <Button
                    key={index}
                    className={
                      coin.percent.includes("-")
                        ? "number negative"
                        : "number positive"
                    }
                    type="primary"
                    shape="round"
                    size={"small"}
                  >
                    {coin.percent}
                  </Button>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default CardWallets;
