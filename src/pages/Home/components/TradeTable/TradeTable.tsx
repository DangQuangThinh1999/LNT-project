import { Table, Typography } from "antd";

import ListTabs from "@/common/ListTabs/ListTabs";
import "./styled.scss";
import { useColumns } from "./useClumns";
const listWallets = [
  "View All",
  "Metaverse",
  "Entertainment",
  "Energy",
  "NFT",
  "Gaming",
  "Music",
];
export const dataSource = [
  {
    key: "1",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    lastPrice: "$56,623.54",
    change24h: 1.45,
    marketCap: "$880,423,640,582",
  },
  {
    key: "2",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    lastPrice: "$3,823.15",
    change24h: -5.12,
    marketCap: "$456,789,123,456",
  },
  {
    key: "3",
    rank: 3,
    name: "BNB",
    symbol: "BNB",
    lastPrice: "$421.34",
    change24h: 2.78,
    marketCap: "$79,123,456,789",
  },
  {
    key: "4",
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    lastPrice: "$1.00",
    change24h: 0.03,
    marketCap: "$68,234,567,890",
  },
  {
    key: "5",
    rank: 5,
    name: "Solana",
    symbol: "SOL",
    lastPrice: "$145.67",
    change24h: -1.12,
    marketCap: "$43,567,890,123",
  },
  {
    key: "6",
    rank: 6,
    name: "Avalanche",
    symbol: "AVAX",
    lastPrice: "$98.23",
    change24h: 3.54,
    marketCap: "$23,456,789,012",
  },
  {
    key: "7",
    rank: 7,
    name: "Cardano",
    symbol: "ADA",
    lastPrice: "$2.15",
    change24h: -0.85,
    marketCap: "$69,234,123,456",
  },
];

const TradeTable = () => {
  const columns = useColumns();
  return (
    <div className="trade-container">
      <Typography.Title level={2}>Market Update</Typography.Title>
      <ListTabs data={listWallets} />
      <Table
        scroll={{ x: 900 }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default TradeTable;
