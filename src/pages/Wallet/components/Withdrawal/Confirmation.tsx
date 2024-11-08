import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Flex, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { IStatus } from "./Withdrawal";

interface IConfirmationProps {
  handleStepStatus: (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => void;
}
export const Confirmation: React.FC<IConfirmationProps> = ({
  handleStepStatus,
}) => {
  const handleNextStepTransaction = () => {
    handleStepStatus(1, "finish", false);
    handleStepStatus(2, "process", true);
  };
  const handleCancel = () => {
    handleStepStatus(0, "process", true);
    handleStepStatus(1, "wait", false);
  };
  const theme = useRecoilValue(themeRecoil);
  return (
    <Card className={theme === "dark" ? "dark-card" : "light-card"}>
      <div className="confirmation-wrapper">
        <Typography.Title className="title" level={3}>
          Confirm Information
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
            onClick={handleNextStepTransaction}
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
