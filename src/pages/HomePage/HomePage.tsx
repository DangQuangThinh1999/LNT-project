import Banner from "./components/Banner/Banner";
import CardWallets from "./components/CardWallets/CardWallets";
import TradeTable from "./components/TradeTable/TradeTable";
import "./styled.scss";

const HomePage = () => {
  return (
    <div className="home">
      <Banner />
      <CardWallets />
      <TradeTable />
    </div>
  );
};

export default HomePage;
