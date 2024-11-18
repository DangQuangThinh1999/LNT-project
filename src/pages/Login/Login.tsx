import { userRecoil } from "@/recoil/user";
import { Breadcrumb, Card, Flex, Typography } from "antd";
import { useEffect } from "react";
import { IoIosHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FormLogin } from "./components/FormLogin";
import "./styled.scss";
export const Login = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userRecoil).token;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="login-page">
      <Flex className="title-login" justify="space-between" align="center">
        <Typography.Title className="title" level={3}>
          Login
        </Typography.Title>
        <Breadcrumb
          items={[
            {
              href: "/",
              title: (
                <Flex align="center" gap={10}>
                  <IoIosHome />
                  <p>Home</p>
                </Flex>
              ),
            },
            {
              href: "/login",
              title: "Login",
            },
          ]}
        />
      </Flex>

      <Card className="cover-login">
        <Flex className="form-login" vertical justify="center" align="center">
          <Typography.Title className="title" level={3}>
            Login To Rockie
          </Typography.Title>
          <p className="des">Welcome back! Log In now to start trading</p>
          <div className="clock-login">
            <div className="clock-icon">
              <img src="/Logo/lock.svg" alt="avatar" />
            </div>
            <p className="clock-url">
              <span className="text-strong">https://</span>
              accounts.rockie.com/login
            </p>
          </div>
          <FormLogin />
        </Flex>

        <div className="qr-code">
          <Flex vertical justify="center" align="center">
            <img className="qr-img" src="/qrCode.png" alt="QR Code" />
            <Typography.Title level={3}>Login with QR code</Typography.Title>
            <p className="text-center">
              Scan this code with the{" "}
              <strong className="text-qr">Rockie mobile app</strong> to log in
              instantly.
            </p>
          </Flex>
        </div>
      </Card>
    </div>
  );
};
