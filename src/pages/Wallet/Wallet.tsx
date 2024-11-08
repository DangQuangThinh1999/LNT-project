import { generalHttp } from "@/api/axiosConfig";
import BreadCrumbCustom from "@/common/BreadCrumbCustom/BreadCrumbCustom";
import { themeRecoil } from "@/recoil/theme";
import { METHOD_WALLET_ARRAY } from "@/utils/enum";
import { CryptoToken } from "@/utils/interface";
import { Button, Card, Col, Flex, Row, Table } from "antd";
import { useEffect, useState } from "react";
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
  const { columns } = useColumns();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokensList, setTokensList] = useState<CryptoToken[]>();
  const getInfoWallet = async () => {
    setLoading(true);
    try {
      const walletRes = await generalHttp.get("/api/auth/overview");
      setTokensList(walletRes.data.tokensOverViewList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInfoWallet();
  }, []);

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

            <Table
              loading={loading}
              className={theme === "dark" ? "tr-dark" : "tr-light"}
              scroll={{ x: 800 }}
              columns={columns}
              dataSource={tokensList}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Wallet;
