import { Breadcrumb, Card, Flex, Typography } from "antd";
import { IoIosHome } from "react-icons/io";
import { FormRegister } from "./components/FormRegister";
import "./styled.scss";
export const Register = () => {
  return (
    <div className="register-page">
      <Flex className="title-register" justify="space-between" align="center">
        <Typography.Title className="title" level={3}>
          Register
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
              href: "/register",
              title: "Register",
            },
          ]}
        />
      </Flex>

      <Card>
        <Flex
          className="form-register"
          vertical
          justify="center"
          align="center"
        >
          <Typography.Title className="title" level={3}>
            Register To Rockie
          </Typography.Title>
          <p className="des">
            Register in advance and enjoy the event benefits
          </p>

          <FormRegister />
        </Flex>
      </Card>
    </div>
  );
};
