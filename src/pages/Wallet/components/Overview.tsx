import { generalHttp } from "@/api/axiosConfig";
import { themeRecoil } from "@/recoil/theme";
import { CryptoToken } from "@/utils/interface";
import {
  Button,
  Card,
  Flex,
  Input,
  message,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
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
interface IOverviewInfo {
  totalBalance: string;
  totalBalanceInUSD: string;
  tokensOverViewList: CryptoToken[];
}
export const Overview = () => {
  const theme = useRecoilValue(themeRecoil);
  const { columns } = useColumns();
  const [loading, setLoading] = useState<boolean>(false);
  const [overviewInfo, setOverviewInfo] = useState<IOverviewInfo>();
  const getInfoWallet = async () => {
    setLoading(true);
    try {
      const overviewRes = await generalHttp.get<IOverviewInfo>(
        "/api/auth/overview"
      );
      setOverviewInfo(overviewRes.data);
    } catch (error) {
      message.error("get overview info failed");
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
            <Spin spinning={overviewInfo?.totalBalance ? false : true}>
              <Flex vertical gap={10}>
                <p className="text-gray">Total Balance</p>
                <Flex align="center" gap={5}>
                  <Typography.Title className="total" level={5}>
                    {overviewInfo?.totalBalance}
                  </Typography.Title>
                  <div className="coin">BTC</div>
                </Flex>
                <p className="text-gray">$ {overviewInfo?.totalBalanceInUSD}</p>
              </Flex>
            </Spin>
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
                <Typography.Text strong className="text-white">
                  {" "}
                  Show balance
                </Typography.Text>
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
        dataSource={overviewInfo?.tokensOverViewList}
        pagination={false}
      />
    </>
  );
};
