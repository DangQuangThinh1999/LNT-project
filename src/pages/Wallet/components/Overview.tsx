import { generalHttp } from "@/api/axiosConfig";
import { themeRecoil } from "@/recoil/theme";
import { CryptoToken } from "@/utils/interface";
import { Button, Card, Flex, Input, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { useColumns } from "./useColumns";

const optionsCoin = [
  { label: "USD", value: "USD" },
  { label: "VND", value: "VND" },
  { label: "USDT", value: "USDT" },
  { label: "USDC", value: "USDC" },
];
export const Overview = () => {
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
    <>
      <Card className={theme === "dark" ? "dark-card" : "light-card"}>
        <div className="overview">
          <Typography.Title className="title" level={3}>
            Overview
          </Typography.Title>

          <div className="cover-overview">
            <Flex vertical gap={10}>
              <p className="text-gray">Total Balance</p>
              <Flex align="center" gap={5}>
                <Typography.Title className="total" level={5}>
                  0.79253864
                </Typography.Title>
                <div className="coin">BTC</div>
              </Flex>
              <p className="text-gray">$12,068.83</p>
            </Flex>
            <Flex vertical gap={20} className="right-overview">
              <Flex gap={20}>
                <Input
                  size="large"
                  placeholder="Search"
                  prefix={<IoSearch size={24} color="#6d7484" />}
                />
                <Select defaultValue="USD" options={optionsCoin} />
              </Flex>
              <Button size="large" shape="round" type="primary">
                Show balance
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
      <Table
        loading={loading}
        className={theme === "dark" ? "tr-dark" : "tr-light"}
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={tokensList}
        pagination={false}
      />
    </>
  );
};
