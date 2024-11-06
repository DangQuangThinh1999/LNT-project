import { generalHttp } from "@/api/axiosConfig";
import { methodLoginArray as methodRegisterArray } from "@/utils/enum";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import type { FormProps } from "antd";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TLoginForm = {
  email: string;
  password: string;
};

export const FormRegister = () => {
  const navigate = useNavigate();

  const [methodActive, setMethodActive] = useState("gmail");

  const [form] = Form.useForm();
  const onFinish: FormProps<TLoginForm>["onFinish"] = async (values) => {
    try {
      const registerRes = await generalHttp.post("/register", {
        email: values.email,
        password: values.password,
      });
      if (registerRes.data.data.token) {
        message.success("Register successful");
        navigate("/login");
        form.resetFields();
      }
    } catch (error) {
      message.error("Register failed");
    }
  };
  return (
    <>
      <Flex wrap>
        {methodRegisterArray.map((item, index) => (
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
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "The input is not a valid email!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "You must enter a Gmail address!",
            },
          ]}
          name="email"
          label={<p className="label-input">Email/ID</p>}
        >
          <Input
            className="full-width "
            placeholder="Please fill in the email form."
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please enter a password!" },
            { min: 8, message: "Password must be at least 8 characters." },
            {
              max: 30,
              message: "Password cannot be longer than 30 characters.",
            },
          ]}
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
        <Form.Item
          rules={[
            { required: true, message: "Please enter a password!" },
            {
              validator: (_, value) => {
                const password = form.getFieldValue("password");
                if (value && value !== password) {
                  return Promise.reject("Passwords do not match!");
                }
                return Promise.resolve();
              },
            },
          ]}
          name="confirmPassword"
          label={<p className="label-input">Password</p>}
        >
          <Input.Password
            className="full-width "
            placeholder="Please enter a confirm Password."
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
