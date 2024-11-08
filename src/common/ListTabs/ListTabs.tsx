import { Button, Flex } from "antd";
import { useState } from "react";
import "./styled.scss";
interface IListTabs {
  data: string[];
}
const ListTabs: React.FC<IListTabs> = ({ data = [""] }) => {
  const [walletActive, setWalletActive] = useState(data[0]);
  return (
    <Flex wrap>
      {data.map((wallet, index) => (
        <Button
          key={index}
          className="btn-tabs"
          onClick={() => setWalletActive(wallet)}
          type={walletActive === wallet ? "primary" : "text"}
          shape="round"
          size={"large"}
        >
          {wallet}
        </Button>
      ))}
    </Flex>
  );
};

export default ListTabs;
