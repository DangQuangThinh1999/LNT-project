import { themeRecoil } from "@/recoil/theme";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";

import { generalHttp } from "@/api/axiosConfig";
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
}
type TTokens = {
  imageUrl: string;
  symbol: string;
  tokenID: string;
  tokenName: string;
  tokenAddress: string;
};
type TParamsTransfer = {
  toAddress: string;
  amount: string;
  tokenAddress: string;
};
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
type TBalanceTokenUser = {
  balance: number;
  symbol: string;
  tokenNam: string;
};
export const FillInformation: React.FC<IFillInformationProps> = ({
  handleStepStatus,
  handleDataStep,
}) => {
  const theme = useRecoilValue(themeRecoil);
  const [form] = Form.useForm();
  const [tokensList, setTokensList] = useState<TTokens[]>([]);
  const [coinActive, setCoinActive] = useState("1");
  const [balanceTokenUser, setBalanceTokenUser] = useState<TBalanceTokenUser>();
  const [loading, setLoading] = useState(false);
  const getTokensList = useCallback(async () => {
    setLoading(true);
    try {
      const resTokensList = await generalHttp.get("tokens-list");
      setTokensList(resTokensList.data.result);
      if (resTokensList.data.result.length > 0) {
        getTokenAddress(resTokensList.data.result[0].tokenAddress);
      }
    } catch (error) {
      message.error("get tokens list failed" + error);
    } finally {
      setLoading(false);
    }
  }, []);
  const getTokenAddress = async (tokenAddress?: string) => {
    setLoading(true);
    try {
      const resTokenAddress = await generalHttp.get(
        `api/auth/token-info?tokenAddress=${tokenAddress}`
      );
      setBalanceTokenUser(resTokenAddress.data);
      return resTokenAddress.data;
    } catch (error) {
      message.error("get token address failed" + error);
    } finally {
      setLoading(false);
    }
    return 0;
  };
  const handleTransferFee = async (value: TParamsTransfer) => {
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

  const optionCoins = tokensList
    .filter((item) => item.tokenID !== coinActive)
    .map((item) => ({
      label: item.symbol,
      key: item.tokenID,
      name: item.tokenName,
      tokenAddress: item.tokenAddress,
      icon: <img height={25} src={item.imageUrl ?? ""} alt={item.tokenName} />,
      onClick: () => {
        setCoinActive(item.tokenID);
        getTokenAddress(item.tokenAddress);
      },
    }));
  const activeCoin = tokensList.find((item) => item.tokenID === coinActive);

  // Form submission handler
  const onFinish: FormProps<FormValues>["onFinish"] = async (values) => {
    const body = {
      toAddress: values.toAddress,
      amount: values.amount,
      tokenAddress: activeCoin?.tokenAddress ?? "",
    };

    await handleTransferFee(body);
    handleStepStatus(STEP_ENUM.CONFIRMATION);
  };

  // Token validation rule
  const tokenValidator = (rule: any, value: string): Promise<any> => {
    if (!value || isNaN(Number(value))) {
      return Promise.reject("Please enter a valid number.");
    }
    if (parseFloat(value) <= 0) {
      return Promise.reject("Token value must be greater than 0.");
    }
    return Promise.resolve();
  };

  // Address validation rule (example pattern for Binance address)
  const addressValidator = (rule: any, value: string): Promise<any> => {
    const binanceAddressPattern = /^0x[a-fA-F0-9]{40}$/; // Example pattern for an Ethereum address
    if (!value || !binanceAddressPattern.test(value)) {
      return Promise.reject("Please enter a valid Binance address.");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    getTokensList();
  }, [getTokensList]);
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
            <Flex justify="space-between">
              <Typography className="label-coin">Balance: </Typography>
              <Typography className="label-coin">
                {balanceTokenUser?.balance === 0
                  ? "0"
                  : parseFloat(
                      balanceTokenUser?.balance.toFixed(5) ?? "0"
                    ).toString()}{" "}
                {balanceTokenUser?.symbol}
              </Typography>
            </Flex>
            <Typography className="label-coin"> Token</Typography>
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: "Please enter the token amount." },
                { validator: tokenValidator },
              ]}
            >
              <Input
                className="input-coin"
                size="large"
                placeholder="Please enter your token"
                suffix={
                  <Dropdown
                    menu={{
                      items: optionCoins,
                    }}
                  >
                    {!loading ? (
                      <Flex gap={5}>
                        <img
                          loading="lazy"
                          height={25}
                          src={activeCoin?.imageUrl ?? ""}
                          alt={activeCoin?.tokenName ?? ""}
                        />
                        {activeCoin?.symbol ?? ""}
                        <DownOutlined />
                      </Flex>
                    ) : (
                      <Button loading={loading}>...Loading</Button>
                    )}
                  </Dropdown>
                }
              />
            </Form.Item>
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
