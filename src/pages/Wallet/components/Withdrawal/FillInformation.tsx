import { dataSource } from "@/pages/Home/components/TradeTable";
import { getCoinImageUrl } from "@/pages/Home/components/TradeTable/useClumns";
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
  Typography,
} from "antd";
import { useState } from "react";

import { useRecoilValue } from "recoil";
import { IStatus } from "./Withdrawal";
interface IFillInformationProps {
  handleStepStatus: (
    stepIndex: number,
    newStatus: IStatus,
    isActive: boolean
  ) => void;
}
interface FormValues {
  address: string;
  token: string;
}
export const FillInformation: React.FC<IFillInformationProps> = ({
  handleStepStatus,
}) => {
  const theme = useRecoilValue(themeRecoil);
  const [form] = Form.useForm();
  const [coinActive, setCoinActive] = useState("1");
  const optionCoins = dataSource
    .filter((item) => item.key !== coinActive)
    .map((item) => ({
      label: item.symbol,
      key: item.key,
      icon: (
        <img height={25} src={getCoinImageUrl(item.name)} alt={item.name} />
      ),
      onClick: () => setCoinActive(item.key),
    }));
  const activeCoin = dataSource.find((item) => item.key === coinActive);
  // Form submission handler
  const onFinish: FormProps<FormValues>["onFinish"] = async (values) => {
    console.log(values, "validated");
    handleStepStatus(0, "finish", false);
    handleStepStatus(1, "process", true);
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
  return (
    <Card className={theme === "dark" ? "dark-card" : "light-card"}>
      <div className="withdrawal-overview">
        <Typography.Title className="title" level={3}>
          Withdrawal Detail
        </Typography.Title>

        <Form onFinish={onFinish}>
          <Flex gap={10} vertical className="form-detail">
            <Typography className="label-coin">To Address</Typography>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please enter the wallet address." },
                { validator: addressValidator },
              ]}
              initialValue={"0xDA39414801E7DaA0AA9c096B7Ad972e309Bd8f5f"}
            >
              <Input
                className="input-coin"
                size="large"
                placeholder="Please enter your address"
              />
            </Form.Item>
            <Typography className="label-coin"> Token</Typography>
            <Form.Item
              name="token"
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
                    <Flex gap={5}>
                      <img
                        height={25}
                        src={getCoinImageUrl(activeCoin?.name ?? "")}
                        alt={activeCoin?.name ?? ""}
                      />
                      {activeCoin?.symbol ?? ""}
                      <DownOutlined />
                    </Flex>
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
