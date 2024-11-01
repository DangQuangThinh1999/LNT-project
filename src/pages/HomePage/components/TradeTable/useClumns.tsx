import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState } from "react";
import { LineChart } from "./LineChart";
const StarChecked = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="star-checkbox" onClick={toggleChecked}>
      {isChecked ? (
        <StarFilled style={{ color: "#fadb14" }} />
      ) : (
        <StarOutlined />
      )}
      <input
        type="checkbox"
        style={{ display: "none" }}
        checked={isChecked}
        readOnly
      />
    </div>
  );
};
const getCoinImageUrl = (coinName: string): string => {
  switch (coinName.toLowerCase()) {
    case "bitcoin":
      return "Banner/coins/bitcoin.png";
    case "ethereum":
      return "Banner/coins/ethereum.png";
    case "bnb":
      return "Banner/coins/bnb.png";
    case "solana":
      return "Banner/coins/solana.png";
    case "tether":
      return "Banner/coins/tether.png";
    case "avalanche":
      return "Banner/coins/avalanche.png";
    default:
      return "Banner/coins/bitcoin.png"; // Fallback URL in case the coin name does not match any case
  }
};

export const useColumns = () => {
  return [
    {
      key: "checked",
      dataIndex: "checked",
      render: () => <StarChecked />,
    },
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <Flex gap={5}>
          <img
            src={getCoinImageUrl(text)}
            alt={text}
            style={{ width: 25, height: 25 }}
          />
          <p>{text}</p>
        </Flex>
      ),
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice",
    },
    {
      title: "24h %",
      dataIndex: "change24h",
      key: "change24h",
      render: (text: any) => (
        <span style={{ color: text >= 0 ? "green" : "red" }}>
          {text >= 0 ? `+${text}%` : `${text}%`}
        </span>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
    },

    {
      title: "Last 7 Days",
      key: "LineChartLast7Days",
      render: (text: any, record: any) => (
        <LineChart isNegative={record.change24h > 0 ? false : true} />
      ),
      width: 200,
    },
    {
      title: "",
      key: "action",
      render: () => <Button>Trade</Button>,
    },
  ];
};
