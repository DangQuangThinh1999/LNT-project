import { generalHttp } from "@/api/axiosConfig";
import { TBalanceTokenUser, TTokens } from "@/utils/type";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Flex,
  Form,
  FormInstance,
  Input,
  message,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import "./styled.scss";
interface SelectTokenAmountProps {
  nameId?: string;
  labelId?: string;
  nameTokenAddressId?: string;
  form: FormInstance<any>;
  isShowBalance: boolean;
}
export const SelectTokenAmount: React.FC<SelectTokenAmountProps> = ({
  nameId = "token",
  nameTokenAddressId = "fromTokenAddress",
  form,
  isShowBalance = false,
  labelId = "Token",
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTokenAddress = async (tokenAddress?: string) => {
    form.setFieldValue(nameTokenAddressId, tokenAddress);
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

  useEffect(() => {
    getTokensList();
  }, [getTokensList]);
  return (
    <>
      {isShowBalance && (
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
      )}
      <Typography className="label-coin">{labelId}</Typography>
      <Form.Item
        name={nameId}
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
      <div className="input-none">
        <Form.Item name={nameTokenAddressId}>
          <Input />
        </Form.Item>
      </div>
    </>
  );
};

export default SelectTokenAmount;
