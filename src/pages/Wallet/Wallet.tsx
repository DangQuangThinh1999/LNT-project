import BreadCrumbCustom from "@/common/BreadCrumbCustom/BreadCrumbCustom";
import { themeRecoil } from "@/recoil/theme";
import { METHOD_WALLET_ARRAY } from "@/utils/enum";
import { Button, Card, Col, Flex, Row, Table } from "antd";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { Overview } from "./components/Overview";
import { useColumns } from "./components/useColumns";
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
const Wallet = () => {
  const [methodActive, setMethodActive] = useState(METHOD_WALLET_ARRAY[0]);
  const theme = useRecoilValue(themeRecoil);
  const { columns, data } = useColumns();
  //   const getInfoWallet = async () => {
  //     try {
  //       const walletRes = await axios.get(
  //         "https://trading-go-be-production-f257.up.railway.app/api/auth/user",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`, // Đảm bảo token có sẵn
  //           },
  //         }
  //       );
  //       console.log(walletRes);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getInfoWallet();

  return (
    <div className="wallet-page">
      <BreadCrumbCustom title="Wallet" items={items} />
      <Card className="container-wallet">
        <Row>
          <Col xs={24} md={24} xl={6} lg={6}>
            <Flex vertical className="side">
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
            <Card className={theme === "dark" ? "dark-card" : "light-card"}>
              <Overview />
            </Card>
            <Card>
              {" "}
              <Table
                scroll={{ x: 800 }}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Wallet;
