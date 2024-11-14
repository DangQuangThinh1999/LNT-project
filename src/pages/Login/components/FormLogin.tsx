import { generalHttp } from "@/api/axiosConfig";
import { userRecoil } from "@/recoil/user";
import { METHOD_LOGIN_ARRAY } from "@/utils/enum";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Button, Checkbox, Flex, Form, Input, message } from "antd";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "../styled.scss";
//   "email":"dauan1129@gmail.com",
// "password":"longvip113"
export const FormLogin = () => {
  const navigate = useNavigate();
  const [methodActive, setMethodActive] = useState("gmail");
  const setUser = useRecoilState(userRecoil)[1];
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const resLogin = await generalHttp.post("/login", values);
      setUser({
        token: resLogin.data.token,
        user: resLogin.data.user,
      });
      message.success("login successful");
      navigate("/");
      form.resetFields();
    } catch (error) {
      message.error("Account or password is incorrect");
    }
  };
  return (
    <>
      <Flex wrap>
        {METHOD_LOGIN_ARRAY.map((item, index) => (
          <Button
            key={index}
            className="btn-first"
            onClick={() => setMethodActive(item)}
            type={methodActive === item ? "primary" : "text"}
            shape="round"
            size={"large"}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </Flex>

      <Form
        className="full-width"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[{ required: true, message: "Please input your email!" }]}
          name="email"
          label={<p className="label-input">Email/ID</p>}
          initialValue={"dauan123@gmail.com"}
        >
          <Input
            className="full-width"
            placeholder="Please fill in the email form."
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter a password!" }]}
          name="password"
          label={<p className="label-input">Password</p>}
        >
          <Input.Password
            className="full-width "
            placeholder="Please enter a password."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" className="mb20">
            <Checkbox>Remember Me</Checkbox>
            <p className="red">Forgot password?</p>
          </Flex>
          <Button
            className="w100"
            size="large"
            shape="round"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <Flex vertical align="center" className="mt10">
            <Flex gap={10}>
              <p>Not a member?</p> <strong className="strong">Register</strong>
            </Flex>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};
