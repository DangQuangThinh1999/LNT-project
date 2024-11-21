import { themeRecoil } from "@/recoil/theme";
import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Typography,
} from "antd";

import { generalHttp } from "@/api/axiosConfig";
import { SelectTokenAmount } from "@/common/Form/SelectTokenAmount";
import { STEP_ENUM } from "@/utils/enum";
import { useRecoilValue } from "recoil";
import { IDataStep } from "./Withdrawal";

interface IFillInformationProps {
  handleStepStatus: (stepNum: STEP_ENUM) => void;
  handleDataStep: (dataInfo: IDataStep) => void;
}
interface FormValues {
  toAddress: string;
  amount: string;
  tokenAddress: string;
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
    const body = {
      toAddress: values?.toAddress,
      amount: values?.amount,
      tokenAddress: values?.tokenAddress,
    };

    await handleTransferFee(body);
    handleStepStatus(STEP_ENUM.CONFIRMATION);
  };
  const addressValidator = (rule: any, value: string): Promise<any> => {
    const binanceAddressPattern = /^0x[a-fA-F0-9]{40}$/; // Example pattern for an Ethereum address
    if (!value || !binanceAddressPattern.test(value)) {
      return Promise.reject("Please enter a valid Binance address.");
    }
    return Promise.resolve();
  };
  return (
    <Card className={theme === "dark" ? "dark-card" : "light-card"}>
      <div className="withdrawal-overview">
        <Typography.Title className="title" level={3}>
          Withdrawal Detail
        </Typography.Title>

        <Form form={form} onFinish={onFinish}>
          <Flex gap={10} vertical className="form-detail">
            <Typography className="label-coin">To Address</Typography>
            <Form.Item
              name="toAddress"
              rules={[
                { required: true, message: "Please enter the wallet address." },
                { validator: addressValidator },
              ]}
              initialValue={"0x6aCF65c26E6d140C8FBA2459bf4bd32ab4a7a514"}
            >
              <Input
                className="input-coin"
                size="large"
                placeholder="Please enter your address"
              />
            </Form.Item>
            <SelectTokenAmount
              nameId="amount"
              form={form}
              isShowBalance={true}
              labelId="Token"
              nameTokenAddressId="tokenAddress"
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
