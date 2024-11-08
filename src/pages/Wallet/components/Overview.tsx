import { Button, Flex, Input, Select, Typography } from "antd";
import { IoSearch } from "react-icons/io5";

const optionsCoin = [
  { label: "USD", value: "USD" },
  { label: "VND", value: "VND" },
  { label: "USDT", value: "USDT" },
  { label: "USDC", value: "USDC" },
];
export const Overview = () => {
  return (
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
  );
};
