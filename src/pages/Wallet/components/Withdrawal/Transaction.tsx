import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Divider, Flex, Typography } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { IStatus } from "./Withdrawal";
interface ITransactionProps {
  handleStepStatus: (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => void;
}
export const Transaction: React.FC<ITransactionProps> = ({
  handleStepStatus,
}) => {
  const handleNextStep = () => {
    handleStepStatus(1, "finish", false);
    handleStepStatus(2, "process", true);
  };
  const handleCancel = () => {
    handleStepStatus(2, "wait", false);
    handleStepStatus(1, "process", true);
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
            You successfully bought 1.356 <span className="text-coin">BTC</span>{" "}
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
                0msx836930...87r398 ID
              </Typography>
            </Flex>
          </Flex>
        </Card>
        <Flex gap={10} className="group-btn">
          <Button
            onClick={handleCancel}
            size="large"
            shape="round"
            className="btn-coin"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNextStep}
            className="btn-coin"
            size="large"
            shape="round"
            type="primary"
          >
            Let's move on!
          </Button>
        </Flex>
      </div>
    </Card>
  );
};
