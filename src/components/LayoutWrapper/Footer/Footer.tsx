import { Button, Col, Flex, Input, Row, Typography } from "antd";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import ContactInfo from "@/components/LayoutWrapper/ContactInfo/ContactInfo";
import { themeRecoil } from "@/recoil/theme";
import { useRecoilValue } from "recoil";
import "./styled.scss";
const products = [
  "Spot",
  "Inverse Perpetual",
  "USDT Perpetual",
  "Exchange",
  "Launchpad",
  "Binance Pay",
];

const services = [
  "Buy Crypto",
  "Markets",
  "Trading Fee",
  "Affiliate Program",
  "Referral Program",
  "API",
];
const listIcon = [FaFacebookF, FaInstagram, FaYoutube, FaTwitter];
const Footer = () => {
  const theme = useRecoilValue(themeRecoil);
  const classTheme = theme === "dark" ? "dark" : "light";
  return (
    <div className="footer-wrapper">
      <ContactInfo />
      <Row className={`footer-container ${classTheme}`}>
        <Col xs={24} md={12} lg={12} xl={8}>
          <Flex vertical gap={10} className="contact-info">
            <img className="image" src="/log-footer.png" alt="logo footer" />
            <Typography.Title className="title" level={5}>
              Let's talk! 🤙
            </Typography.Title>

            <Typography className="text-gray">+12 345 678 9101</Typography>
            <Typography className="text-gray">Info.Avitex@Gmail.Com</Typography>
            <Typography className="text-gray">
              Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
            </Typography>
          </Flex>
        </Col>
        <Col xs={24} md={12} lg={12} xl={8} className="center-wrapper">
          <Flex justify="space-between" className="center-container">
            <Flex vertical gap={10}>
              <Typography.Title level={5}>PRODUCTS</Typography.Title>
              {products.map((product, index) => (
                <Typography className="hover-blue" key={index}>
                  {product}
                </Typography>
              ))}
            </Flex>
            <Flex vertical gap={10}>
              <Typography.Title level={5}>SERVICES</Typography.Title>
              {services.map((product, index) => (
                <Typography className="hover-blue" key={index}>
                  {product}
                </Typography>
              ))}
            </Flex>
          </Flex>
        </Col>
        <Col xs={24} md={24} lg={24} xl={8} className="last-wrapper">
          <Flex vertical gap={20} className="last-container">
            <Typography.Title className="title" level={2}>
              Newletters
            </Typography.Title>
            <Typography className="text">
              Subscribe our newsletter to get more free design course and
              resource.
            </Typography>
            <Input
              className="send-email"
              placeholder="Enter your email"
              suffix={
                <Button className="btn-submit" type="primary" shape="round">
                  Submit
                </Button>
              }
            />
            <Flex gap={20} className="list-icon">
              {listIcon.map((IconComponent, index) => (
                <IconComponent key={index} size={24} color="#777e90" />
              ))}
            </Flex>
          </Flex>
        </Col>
      </Row>
      <div className={`copy-right ${classTheme}`}>
        <div>
          <Typography className="text">
            ©2022 Rockie.com. All rights reserved. Terms of Service | Privacy
            Terms
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
