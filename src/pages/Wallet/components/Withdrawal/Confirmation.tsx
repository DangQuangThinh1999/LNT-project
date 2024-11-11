import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Divider, Flex, message, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { IStatus } from "./Withdrawal";

interface IConfirmationProps {
  handleStepStatus: (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => void;
}

interface IconCopyProps {
  handleCopy: (textToCopy: string) => void;
  textToCopy: string;
}

const IconCopy: React.FC<IconCopyProps> = ({ handleCopy, textToCopy }) => (
  <img
    onClick={() => handleCopy(textToCopy)}
    height={24}
    className="image"
    width={24}
    src="/svg/copyCircle.svg"
    alt="copy"
  />
);

export default IconCopy;
export const Confirmation: React.FC<IConfirmationProps> = ({
  handleStepStatus,
}) => {
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("Text copied to clipboard!");
      })
      .catch((err) => {
        message.error("Failed to copy text" + err);
      });
  };
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
    <div className="confirmation-wrapper">
      <Card className={theme === "dark" ? "dark-caimgrd" : "light-card"}>
        <div className="confirmation-container">
          <Typography.Title className="title" level={3}>
            Confirmation
          </Typography.Title>

          <p className="des">Bank Account</p>
          <Flex vertical className="detail">
            <Flex justify="space-between" className="bank-info">
              <p className="text des">Address number</p>
              <Flex gap={10} align="center">
                <p className="text">
                  0xDA39414801E7DaA0AA9c096B7Ad972e309Bd8f5f
                </p>
                <IconCopy
                  handleCopy={handleCopy}
                  textToCopy=" 0xDA39414801E7DaA0AA9c096B7Ad972e309Bd8f5f"
                />
              </Flex>
            </Flex>
            <Divider className="divider-center" />
            <Flex justify="space-between" className="bank-info">
              <p className="text des"> Token</p>
              <Flex gap={10} align="center">
                <p className="text"> (SHIBA)</p>
                <p className="text">
                  0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce
                </p>
                <IconCopy
                  handleCopy={handleCopy}
                  textToCopy="(SHIBA) 0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
                />
              </Flex>
            </Flex>
            <Divider className="divider-center" />
            <Flex justify="space-between" className="bank-info">
              <p className="text des"> Amount</p>
              <Flex gap={10}>
                <p className="text">200</p>
                <IconCopy handleCopy={handleCopy} textToCopy="200" />
              </Flex>
            </Flex>
            <Divider className="divider-center" />
            <Flex justify="space-between" className="bank-info">
              <p className="text des"> Gas Free</p>
              <Flex gap={10}>
                <p className="text">20 SHIBA</p>
                <IconCopy handleCopy={handleCopy} textToCopy="20 SHIBA" />
              </Flex>
            </Flex>
            <Divider className="divider-center" />
            <Flex justify="space-between" className="bank-info">
              <p className="text des"> Token Balance</p>
              <Flex gap={10}>
                <p className="text">220 SHIBA</p>
                <IconCopy handleCopy={handleCopy} textToCopy="220 SHIBA" />
              </Flex>
            </Flex>
          </Flex>
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
    </div>
  );
};
