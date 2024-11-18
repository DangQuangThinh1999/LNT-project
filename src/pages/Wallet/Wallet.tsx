import BreadCrumbCustom from "@/common/BreadCrumbCustom/BreadCrumbCustom";
import { METHOD_WALLET_ARRAY } from "@/utils/enum";
import { Button, Card, Col, Flex, Row } from "antd";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { Overview } from "./components/Overview";
import { Withdrawal } from "./components/Withdrawal/Withdrawal";
import "./styled.scss";
const items = [
  {
    href: "/",
    title: (
      <Flex align="center" gap={10}>
        <IoIosHome />
        <p>Home</p>
      </Flex>
    ),
  },
  {
    href: "/wallet",
    title: "Wallet",
  },
];
export const Wallet = () => {
  const [methodActive, setMethodActive] = useState(METHOD_WALLET_ARRAY[0]);

  return (
    <div className="wallet-page">
      <BreadCrumbCustom title={methodActive} items={items} />
      <Card className="container-wallet">
        <Row>
          <Col xs={24} md={24} xl={6} lg={6}>
            <Flex vertical className="side" wrap>
              {METHOD_WALLET_ARRAY.map((item, index) => (
                <Button
                  key={index}
                  className="btn-method"
                  onClick={() => setMethodActive(item)}
                  type={methodActive === item ? "primary" : "text"}
                  shape="round"
                  size={"large"}
                >
                  {item}
                </Button>
              ))}
            </Flex>
          </Col>
          <Col className="table-wallet" xs={24} md={24} xl={18} lg={18}>
            <div className="divider"></div>
            {methodActive === "Overview" && <Overview />}
            {methodActive === "Withdrawal" && <Withdrawal />}
          </Col>
        </Row>
      </Card>
    </div>
  );
};
