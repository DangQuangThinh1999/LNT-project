import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Divider, Flex, message, Spin, Typography } from "antd";
import { useRecoilValue } from "recoil";

import { generalHttp } from "@/api/axiosConfig";
import { IDataStep, IStatus } from "./Withdrawal";

interface IConfirmationProps {
  handleStepStatus: (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => void;
  dataStep: IDataStep;
  handleDataStep: (dataInfo: IDataStep) => void;
}
const convertScientificToDecimal = (num: number): string => {
  if (num === 0) return "0";

  const precision = Math.abs(Math.floor(Math.log10(Math.abs(num))));

  return num.toFixed(precision);
};
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
  dataStep,
  handleDataStep,
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
  const handleTransfer = async () => {
    const body = {
      tokenAddress: dataStep?.confirmationInfo?.tokenAddress,
      amount: convertScientificToDecimal(
        dataStep?.confirmationInfo?.amount ?? 0
      ),
      toAddress: dataStep?.confirmationInfo?.toAddress,
    };
    try {
      const resTransfer = await generalHttp.post("api/auth/transfer", body);
      const transactionData = {
        transactionId: resTransfer?.data?.transactionId ?? "",
        amount: convertScientificToDecimal(
          dataStep?.confirmationInfo?.amount ?? 0
        ),
        tokenSymbol: dataStep?.confirmationInfo?.tokenSymbol ?? "",
      };
      handleDataStep({
        transactionInfo: transactionData,
        confirmationInfo: undefined,
      });
    } catch (error) {
      message.error("transfer failed" + error);
    }
  };

  const handleNextStepTransaction = async () => {
    await handleTransfer();
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

          <Spin
            spinning={dataStep?.confirmationInfo === undefined ? true : false}
          >
            <p className="des">Bank Account</p>
            <Flex vertical className="detail">
              <Flex justify="space-between" className="bank-info">
                <p className="text des">Wallet Address</p>
                <Flex gap={10} align="center">
                  <p className="text">
                    {dataStep?.confirmationInfo?.walletAddress}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={dataStep?.confirmationInfo?.tokenAddress ?? ""}
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des">To Address</p>
                <Flex gap={10} align="center">
                  <p className="text">
                    {dataStep?.confirmationInfo?.toAddress}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={dataStep?.confirmationInfo?.toAddress ?? ""}
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des">Token </p>
                <Flex gap={10} align="center">
                  <p className="text">
                    {" "}
                    ({dataStep?.confirmationInfo?.tokenSymbol})
                  </p>
                  <p className="text">
                    {dataStep?.confirmationInfo?.tokenAddress ?? ""}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      "(" +
                      (dataStep?.confirmationInfo?.tokenSymbol ?? "") +
                      ")" +
                      dataStep?.confirmationInfo?.tokenAddress
                    }
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des"> Amount</p>
                <Flex gap={10}>
                  <p className="text">
                    {convertScientificToDecimal(
                      dataStep?.confirmationInfo?.amount ?? 0
                    )}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      convertScientificToDecimal(
                        dataStep?.confirmationInfo?.amount ?? 0
                      ) + ""
                    }
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des"> Gas Free</p>
                <Flex gap={10}>
                  <p className="text">
                    {convertScientificToDecimal(
                      dataStep?.confirmationInfo?.gasFee ?? 0
                    )}{" "}
                    {dataStep?.confirmationInfo?.tokenSymbol}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      convertScientificToDecimal(
                        dataStep?.confirmationInfo?.gasFee ?? 0
                      ) +
                      "" +
                      dataStep?.confirmationInfo?.tokenSymbol
                    }
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des"> Token Balance</p>
                <Flex gap={10}>
                  <p className="text">
                    {dataStep?.confirmationInfo?.totalBalance}{" "}
                    {dataStep?.confirmationInfo?.tokenSymbol}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      dataStep?.confirmationInfo?.totalBalance +
                      "" +
                      dataStep?.confirmationInfo?.tokenSymbol
                    }
                  />
                </Flex>
              </Flex>
            </Flex>
          </Spin>
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
