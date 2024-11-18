import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { LineChart } from "./LineChart";
import "./styled.scss";
const StarChecked = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div onClick={toggleChecked}>
      {isChecked ? <StarFilled className="star" /> : <StarOutlined />}
      <input type="checkbox" className="none" checked={isChecked} readOnly />
    </div>
  );
};
export const getCoinImageUrl = (coinName: string): string => {
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
      align: "left",
    },
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <Flex gap={5}>
          <img src={getCoinImageUrl(text)} alt={text} className="image" />
          <p>{text}</p>
        </Flex>
      ),
      align: "left",
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice",
      align: "left",
    },
    {
      title: "24h %",
      dataIndex: "change24h",
      key: "change24h",
      render: (text: any) => (
        <span className={text >= 0 ? "green" : "red"}>
          {text >= 0 ? `+${text}%` : `${text}%`}
        </span>
      ),
      align: "left",
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      align: "left",
    },

    {
      title: "Last 7 Days",
      key: "LineChartLast7Days",
      render: (text: any, record: any) => (
        <LineChart isNegative={record.change24h > 0 ? false : true} />
      ),
      align: "left",
      width: 200,
    },
    {
      title: "",
      key: "action",
      render: () => <Button>Trade</Button>,
      align: "left",
    },
  ] as ColumnsType;
};
