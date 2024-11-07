import { formatNumber } from "@/utils/formatNumber";
import { CryptoToken } from "@/utils/interface";
import { Flex } from "antd";
import "../styled.scss";
export const useColumns = () => {
  const columns = [
    {
      title: "Token ID",
      dataIndex: "tokenID",
      key: "tokenID",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: string, record: CryptoToken) => (
        <Flex gap={10}>
          <img
            height={40}
            width={40}
            src={record?.imageUrl ?? ""}
            alt={record?.tokenName ?? ""}
          />
          <Flex vertical>
            <strong>{record?.symbol ?? ""}</strong>
            <p className="text-coin">{record?.tokenName ?? ""}</p>
          </Flex>
        </Flex>
      ),
      width: 150,
      key: "Name",
    },
    {
      title: "24H Change",
      dataIndex: "percentChange24h",
      key: "percentChange24h",
      render: (text: string) => (
        <strong className={text.includes("-") ? "text-red" : "text-green"}>
          {Number(text).toFixed(2)}%
        </strong>
      ),
      width: 150,
    },
    {
      title: "Price (USD)",
      dataIndex: "balanceInUSD",
      key: "balanceInUSD",
      render: (text: string) => <strong>{formatNumber(text)}</strong>,
      width: 150,
    },

    {
      title: "24H Volume",
      dataIndex: "volume24h",
      key: "volume24h",
      render: (text: string) => (
        <div>
          <strong>{formatNumber(text)}</strong>
        </div>
      ),
    },
    {
      title: "MarketCap ",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (text: string) => (
        <div>
          <strong>{formatNumber(text)}</strong>
        </div>
      ),
    },
  ];

  return {
    columns,
  };
};
