import { Flex } from "antd";
import Banner from "./components/Banner/Banner";
import CardWallets from "./components/CardWallets/CardWallets";
import Customer from "./components/Customer/Customer";
import Instruction from "./components/Instruction/Instruction";
import ScanPayment from "./components/ScanPayment/ScanPayment";
import TradeTable from "./components/TradeTable/TradeTable";
import Transactions from "./components/Transactions/Transactions";
import "./styled.scss";

export const HomePage = () => {
  return (
    <div>
      <div className="home-page-layout">
        <Flex vertical gap={20}>
          <Banner />
          <CardWallets />
          <TradeTable />
          <Instruction />
          <Transactions />
          <ScanPayment />
          <Customer />
        </Flex>
      </div>
    </div>
  );
};
