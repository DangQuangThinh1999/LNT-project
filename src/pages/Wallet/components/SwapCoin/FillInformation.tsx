import { themeRecoil } from "@/recoil/theme";
import { Button, Card, Flex, Form, FormProps, message, Typography } from "antd";

import { generalHttp } from "@/api/axiosConfig";
import { SelectTokenAmount } from "@/common/Form/SelectTokenAmount";
import { STEP_ENUM } from "@/utils/enum";
import { useRecoilValue } from "recoil";
import { IDataStep } from "./SwapCoin";

interface IFillInformationProps {
  handleStepStatus: (stepNum: STEP_ENUM) => void;
  handleDataStep: (dataInfo: IDataStep) => void;
}
interface FormValues {
  fromTokenAddress: string;
  amountFromToken: string;
  toTokenAddress: string;
  amountToToken: string;
}

export type TConfirmationInfo = {
  gasFee: number;
  transactionFee: number;
  totalBalance: number;
  amount: number;
  tokenAddress: string;
  tokenSymbol: string;
  walletAddress: string;
  toAddress: string;
};

export const FillInformation: React.FC<IFillInformationProps> = ({
  handleStepStatus,
  handleDataStep,
}) => {
  const theme = useRecoilValue(themeRecoil);
  const [form] = Form.useForm();

  const handleTransferFee = async (value: FormValues) => {
    try {
      const resTransferFee = await generalHttp.post(
        "api/auth/transfer-fee",
        value
      );

      handleDataStep({
        confirmationInfo: resTransferFee.data,
        transactionInfo: undefined,
      });
    } catch (error) {
      message.error("transfer failed" + error);
    }
  };

  // Form submission handler
  const onFinish: FormProps<FormValues>["onFinish"] = async (values) => {
    console.log(values, "cccc");
    const body = {
      fromTokenAddress: values?.fromTokenAddress,
      amountFromToken: values?.amountFromToken,
      toTokenAddress: values?.toTokenAddress,
      amountToToken: values?.amountToToken,
    };

    await handleTransferFee(body);
    handleStepStatus(STEP_ENUM.CONFIRMATION);
  };

  return (
    <Card className={theme === "dark" ? "dark-card" : "light-card"}>
      <div className="withdrawal-overview">
        <Typography.Title className="title" level={3}>
          Withdrawal Detail
        </Typography.Title>

        <Form form={form} onFinish={onFinish}>
          <Flex gap={10} vertical className="form-detail">
            <SelectTokenAmount
              form={form}
              nameId={"amountFromToken"}
              nameTokenAddressId={"fromTokenAddress"}
              labelId={"From Token"}
              isShowBalance={true}
            />
            <SelectTokenAmount
              form={form}
              labelId={"To Token"}
              nameId={"amountToToken"}
              nameTokenAddressId={"toTokenAddress"}
              isShowBalance={false}
            />
            <Flex gap={10} className="group-btn">
              <Button
                size="large"
                shape="round"
                className="btn-coin"
                onClick={() => form.resetFields()}
              >
                Reset
              </Button>
              <Button
                htmlType="submit"
                className="btn-coin"
                size="large"
                shape="round"
                type="primary"
              >
                Let's move on!
              </Button>
            </Flex>
          </Flex>
        </Form>
      </div>
    </Card>
  );
};
