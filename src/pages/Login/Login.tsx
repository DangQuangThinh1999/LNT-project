import { Breadcrumb, Card, Flex, Typography } from "antd";
import { useEffect } from "react";
import { IoIosHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FormLogin } from "./components/FormLogin";
import "./styled.scss";
const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="login-page">
      <Flex className="title-login" justify="space-between" align="center">
        <Typography.Title style={{ fontSize: 40, fontWeight: 500 }} level={3}>
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
        <div className="body-login">
          <Flex className="form-login" vertical justify="center" align="center">
            <Typography.Title
              style={{ fontSize: 40, fontWeight: 500 }}
              level={3}
            >
              Login To Rockie
            </Typography.Title>
            <p style={{ fontSize: 20, color: "gray" }}>
              Welcome back! Log In now to start trading
            </p>
            <div className="clock-login">
              <div className="clock-icon">
                <img src="/Logo/lock.svg" alt="avatar" />
              </div>
              <p className="clock-url">
                <span style={{ color: "#58bd7d" }}>https://</span>
                accounts.rockie.com/login
              </p>
            </div>
            <FormLogin />
          </Flex>
        </div>

        <div className="qr-code">
          <Flex vertical justify="center" align="center">
            <img src="/qrCode.png" alt="QR Code" />
            <Typography.Title level={3}>Login with QR code</Typography.Title>
            <p style={{ textAlign: "center" }}>
              Scan this code with the{" "}
              <strong style={{ color: "#1677ff" }}>Rockie mobile app</strong> to
              log in instantly.
            </p>
          </Flex>
        </div>
      </Card>
    </div>
  );
};

export default Login;
