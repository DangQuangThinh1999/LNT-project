import { Flex } from "antd";
import "../styled.scss";
export const useColumns = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      render: (text: string, record: any) => (
        <Flex gap={10}>
          <img height={40} width={40} src={record?.img} alt={text} />
          <Flex vertical>
            <strong>{text}</strong>
            <p className="text-coin">Tether USD</p>
          </Flex>
        </Flex>
      ),
      width: 200,
      key: "asset",
    },
    {
      title: "Earn",
      dataIndex: "earn",
      key: "earn",
      render: (text: string) => <strong className="strong">{text}</strong>,
      width: 150,
    },
    {
      title: "On Orders",
      dataIndex: "onOrders",
      key: "onOrders",
      render: (text: string) => (
        <div>
          <strong>{text}</strong>
          <p className="text-coin">$10,098.36</p>
        </div>
      ),
    },
    {
      title: "Available Balance",
      dataIndex: "availableBalance",
      key: "availableBalance",
      render: (text: string) => (
        <div>
          <strong>{text}</strong>
          <p className="text-coin">$10,098.36</p>
        </div>
      ),
    },
    {
      title: "Total Balance",
      dataIndex: "totalBalance",
      key: "totalBalance",
      render: (text: string) => (
        <div>
          <strong>{text}</strong>
          <p className="text-coin">$10,098.36</p>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      img: "/Banner/coins/bitcoin.png",
      asset: "USDT",
      earn: "7.46% APR",
      onOrders: "0.2785689852 BTC ",
      availableBalance: "0.2785689852 BTC ",
      totalBalance: "0.2785689852 BTC",
    },
    {
      id: 2,
      img: "/Banner/coins/ethereum.png",
      asset: "Ethereum",
      earn: "7.46% APR",
      onOrders: "0.2785689852 BTC ",
      availableBalance: "0.2785689852 BTC",
      totalBalance: "0.2785689852 BTC",
    },
    {
      id: 3,
      asset: "Binance",
      img: "/Banner/coins/bnb.png",
      earn: "7.46% APR",
      onOrders: "0.2785689852 BTC ",
      availableBalance: "0.2785689852 BTC",
      totalBalance: "0.2785689852 BTC ",
    },
    {
      id: 4,
      asset: "Solana",
      img: "/Banner/coins/solana.png",
      earn: "7.46% APR",
      onOrders: "0.2785689852 BTC ",
      availableBalance: "0.2785689852 BTC ",
      totalBalance: "0.2785689852 BTC",
    },
    {
      id: 5,
      asset: "Tether",
      img: "/Banner/coins/tether.png",
      earn: "7.46% APR",
      onOrders: "0.2785689852 BTC ",
      availableBalance: "0.2785689852 BTC ",
      totalBalance: "0.2785689852 BTC",
    },
  ];
  return {
    data,
    columns,
  };
};
