import { generalHttp } from "@/api/axiosConfig";
import { useMessage } from "@/hooks/useMessage";
import { userRecoil } from "@/recoil/user";
import { methodLoginArray } from "@/utils/enum";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Button, Checkbox, Flex, Form, Input } from "antd";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

//   "email":"dauan1129@gmail.com",
// "password":"longvip113"
export const FormLogin = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useMessage();
  const [methodActive, setMethodActive] = useState("gmail");
  const setUser = useRecoilState(userRecoil)[1];
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const resLogin = await generalHttp.post("/login", values);
      localStorage.setItem("token", resLogin.data.data.token);
      console.log(resLogin, localStorage.getItem("token"));
      setUser({
        token: resLogin.data.data.token,
        user: resLogin.data.data.user,
      });
      showSuccess("login successful");
      navigate("/");
      form.resetFields();
    } catch (error) {
      showError("Account or password is incorrect");
    }
  };
  return (
    <>
      <Flex wrap>
        {methodLoginArray.map((item, index) => (
          <Button
            key={index}
            style={{
              width: "fit-content",
              marginTop: "28px",
              border: "none",
              fontWeight: 500,
            }}
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
          initialValue={"dauan1129@gmail.com"}
        >
          <Input
            className="full-width "
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
          <Flex justify="space-between" style={{ marginBottom: 20 }}>
            <Checkbox>Remember Me</Checkbox>
            <p style={{ color: "red" }}>Forgot password?</p>
          </Flex>
          <Button
            style={{ width: "100%" }}
            size="large"
            shape="round"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <Flex vertical align="center" style={{ marginTop: 10 }}>
            <Flex gap={10}>
              <p>Not a member?</p>{" "}
              <strong style={{ color: "#4096ff" }}>Register</strong>
            </Flex>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};
