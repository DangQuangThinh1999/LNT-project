import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Flex, Typography } from "antd";
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
        <Typography.Title className="title" level={3}>
          Transaction Status
        </Typography.Title>
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
