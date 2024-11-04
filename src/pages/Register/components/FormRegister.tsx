import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { generalHttp } from "api/axiosConfig";
import { useMessage } from "hooks/useMessage";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const typeLogin = ["Email", "Mobile"];
//   "email":"dauan1129@gmail.com",
// "password":"longvip113"
export const FormRegister = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useMessage();
  const [type, setType] = useState("Email");

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const registerRes = await generalHttp.post("/register", {
        email: values.email,
        password: values.password,
      });
      if (registerRes.data.data.token) {
        showSuccess("Register successful");
        navigate("/login");
        form.resetFields();
      }
    } catch (error) {
      showError("Register failed");
    }
  };
  return (
    <>
      <Flex wrap>
        {typeLogin.map((item, index) => (
          <Button
            key={index}
            style={{
              width: "fit-content",
              marginTop: "28px",
              border: "none",
              fontWeight: 500,
            }}
            onClick={() => setType(item)}
            type={type === item ? "primary" : "text"}
            shape="round"
            size={"large"}
          >
            {item}
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
