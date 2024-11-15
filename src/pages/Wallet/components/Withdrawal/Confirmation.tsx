import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Divider, Flex, message, Spin, Typography } from "antd";
import { useRecoilValue } from "recoil";

import { generalHttp } from "@/api/axiosConfig";
import { IconCopy } from "@/common/IconCopy";
import { STEP_ENUM } from "@/utils/enum";
import { convertScientificToDecimal } from "@/utils/formatNumber";
import { TConfirmationInfo } from "./FillInformation";
import { IDataStep } from "./Withdrawal";

interface IConfirmationProps {
  handleStepStatus: (stepNum: STEP_ENUM) => void;
  confirmationInfo?: TConfirmationInfo;
  handleDataStep: (dataInfo: IDataStep) => void;
}

export const Confirmation: React.FC<IConfirmationProps> = ({
  handleStepStatus,
  confirmationInfo,
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
      tokenAddress: confirmationInfo?.tokenAddress,
      amount: convertScientificToDecimal(confirmationInfo?.amount ?? 0),
      toAddress: confirmationInfo?.toAddress,
    };
    try {
      const resTransfer = await generalHttp.post("api/auth/transfer", body);
      const transactionData = {
        transactionId: resTransfer?.data?.transactionId ?? "",
        amount: convertScientificToDecimal(confirmationInfo?.amount ?? 0),
        tokenSymbol: confirmationInfo?.tokenSymbol ?? "",
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
    handleStepStatus(STEP_ENUM.TRANSACTION);
  };
  const handleCancel = () => {
    handleStepStatus(STEP_ENUM.FILL_INFO);
  };
  const theme = useRecoilValue(themeRecoil);
  return (
    <div className="confirmation-wrapper">
      <Card className={theme === "dark" ? "dark-caimgrd" : "light-card"}>
        <div className="confirmation-container">
          <Typography.Title className="title" level={3}>
            Confirmation
          </Typography.Title>

          <Spin spinning={confirmationInfo === undefined ? true : false}>
            <p className="des">Bank Account</p>
            <Flex vertical className="detail">
              <Flex justify="space-between" className="bank-info">
                <p className="text des">Wallet Address</p>
                <Flex gap={10} align="center">
                  <p className="text">{confirmationInfo?.walletAddress}</p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={confirmationInfo?.tokenAddress ?? ""}
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des">To Address</p>
                <Flex gap={10} align="center">
                  <p className="text">{confirmationInfo?.toAddress}</p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={confirmationInfo?.toAddress ?? ""}
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des">Token </p>
                <Flex gap={10} align="center">
                  <p className="text"> ({confirmationInfo?.tokenSymbol})</p>
                  <p className="text">{confirmationInfo?.tokenAddress ?? ""}</p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      "(" +
                      (confirmationInfo?.tokenSymbol ?? "") +
                      ")" +
                      confirmationInfo?.tokenAddress
                    }
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des"> Amount</p>
                <Flex gap={10}>
                  <p className="text">
                    {convertScientificToDecimal(confirmationInfo?.amount ?? 0)}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      convertScientificToDecimal(
                        confirmationInfo?.amount ?? 0
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
                    {convertScientificToDecimal(confirmationInfo?.gasFee ?? 0)}{" "}
                    {confirmationInfo?.tokenSymbol}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      convertScientificToDecimal(
                        confirmationInfo?.gasFee ?? 0
                      ) +
                      "" +
                      confirmationInfo?.tokenSymbol
                    }
                  />
                </Flex>
              </Flex>
              <Divider className="divider-center" />
              <Flex justify="space-between" className="bank-info">
                <p className="text des"> Token Balance</p>
                <Flex gap={10}>
                  <p className="text">
                    {confirmationInfo?.totalBalance}{" "}
                    {confirmationInfo?.tokenSymbol}
                  </p>
                  <IconCopy
                    handleCopy={handleCopy}
                    textToCopy={
                      confirmationInfo?.totalBalance +
                      "" +
                      confirmationInfo?.tokenSymbol
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
