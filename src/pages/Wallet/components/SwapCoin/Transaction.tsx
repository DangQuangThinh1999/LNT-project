import { themeRecoil } from "@/recoil/theme";
import { STEP_ENUM } from "@/utils/enum";
import { Button, Card, Divider, Flex, Typography } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { IDataStep } from "./SwapCoin";

interface ITransactionProps {
  handleStepStatus: (stepNum: STEP_ENUM) => void;
  dataStep: IDataStep;
}
export const Transaction: React.FC<ITransactionProps> = ({
  handleStepStatus,
  dataStep,
}) => {
  const handleConfirm = () => {
    handleStepStatus(STEP_ENUM.FILL_INFO);
  };
  const theme = useRecoilValue(themeRecoil);

  return (
    <Card className={theme === "dark" ? "dark-card" : "light-card"}>
      <div className="transaction-wrapper">
        <Flex vertical justify="center" align="center">
          <Flex align="center" gap={5}>
            <Typography className="title">Success</Typography>
            <FaCircleCheck size={30} color="#58bd7d" />
          </Flex>
          <Typography.Title className="title-des center">
            You have successfully transferred{" "}
            {dataStep?.transactionInfo?.amount ?? ""}{" "}
            <span className="text-coin">
              {dataStep?.transactionInfo?.tokenSymbol ?? ""}
            </span>{" "}
            for Rockie!
          </Typography.Title>
        </Flex>
        <Card
          className={`status-wrapper ${theme === "dark" ? "dark " : "light"}`}
        >
          <Flex vertical>
            <Flex justify="space-between" className="item-status">
              <Typography className="title-des">Status</Typography>
              <Typography className="title-des text-coin">Completed</Typography>
            </Flex>
            <Divider className="divider-status" />
            <Flex justify="space-between" className="item-status">
              <Typography className="title-des">Transaction ID</Typography>
              <Typography className="title-des">
                {dataStep?.transactionInfo?.transactionId?.slice(0, 5) +
                  "..." +
                  dataStep?.transactionInfo?.transactionId?.slice(-5)}
              </Typography>
            </Flex>
          </Flex>
        </Card>
        <Flex gap={10} className="group-btn">
          <Button
            onClick={handleConfirm}
            className="btn-coin"
            size="large"
            shape="round"
            type="primary"
          >
            Withdrawal
          </Button>
        </Flex>
      </div>
    </Card>
  );
};
