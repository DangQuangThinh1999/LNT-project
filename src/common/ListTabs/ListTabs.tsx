import { Button, Flex } from "antd";
import { useState } from "react";

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
          style={{
            width: "fit-content",
            marginTop: "28px",
            border: "none",
            fontWeight: 500,
          }}
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
