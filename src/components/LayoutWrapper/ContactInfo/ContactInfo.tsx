import { Button, Flex, Typography } from "antd";
import { useRecoilValue } from "recoil";

import { themeRecoil } from "@/recoil/theme";
import "./styled.scss";
const ContactInfo = () => {
  const theme = useRecoilValue(themeRecoil);

  return (
    <div className="contactInfo">
      <Flex
        justify="space-between"
        wrap
        className={`create-account ${
          theme === "dark" ? "contact-dark" : "contact-light"
        }`}
        align="center"
        gap={20}
      >
        <div>
          <Typography.Title className="text-white" level={2}>
            Earn up to $25 worth of crypto
          </Typography.Title>
          <Typography className="text-white">
            Discover how specific cryptocurrencies work — and get a bit of each
            crypto to try out for yourself.
          </Typography>
        </div>
        <Button size="large" shape="round">
          Create Account
        </Button>
      </Flex>
    </div>
  );
};

export default ContactInfo;
