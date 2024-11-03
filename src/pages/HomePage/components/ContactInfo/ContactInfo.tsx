import { Button, Flex, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { themeRecoil } from "../../../../recoil/theme";
import "./styled.scss";
const ContactInfo = () => {
  const theme = useRecoilValue(themeRecoil);
  console.log(theme);
  return (
    <div className="contactInfo">
      <Flex
        justify="space-between"
        wrap
        className="create-account"
        align="center"
        gap={20}
      >
        <div
          className={theme === "dark" ? "contact-dark" : "contact-light"}
        ></div>
        <div>
          <Typography.Title style={{ color: "white" }} level={2}>
            Earn up to $25 worth of crypto
          </Typography.Title>
          <Typography style={{ color: "white" }}>
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
