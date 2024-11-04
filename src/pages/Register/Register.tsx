import { Breadcrumb, Card, Flex, Typography } from "antd";
import { IoIosHome } from "react-icons/io";
import { FormRegister } from "./components/FormRegister";
import "./styled.scss";
const Register = () => {
  return (
    <div className="register-page">
      <Flex className="title-register" justify="space-between" align="center">
        <Typography.Title style={{ fontSize: 40, fontWeight: 500 }} level={3}>
          register
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

      <Card className="cover-register">
        <div className="body-register">
          <Flex className="form-register" vertical justify="center" align="center">
            <Typography.Title
              style={{ fontSize: 40, fontWeight: 500 }}
              level={3}
            >
              Register To Rockie
            </Typography.Title>
            <p style={{ fontSize: 20, color: "gray" }}>
              Register in advance and enjoy the event benefits
            </p>

            <FormRegister />
          </Flex>
        </div>
      </Card>
    </div>
  );
};

export default Register;
