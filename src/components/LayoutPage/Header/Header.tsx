import { Button, Flex, Menu, MenuProps } from "antd";
import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeRecoil } from "../../../recoil/theme";
import { ETheme } from "../../../recoil/type";
import "./styleHeader.scss";
const listMenu: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/">home</Link>,
  },
  {
    key: "about",
    label: <Link to="/about">about</Link>,
  },
];
const Header = () => {
  const [theme, setTheme] = useRecoilState(themeRecoil);
  const [currentKey, setCurrentKey] = useState("home");
  const toggleTheme = () => {
    const newTheme = theme === ETheme.Dark ? ETheme.Light : ETheme.Dark;
    setTheme(newTheme);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentKey(e.key);
  };
  return (
    <div id="header">
      <Flex>
        <Button className="img-header" type="dashed">
          <img
            src="https://themesflat.co/html/rockie/assets/images/logo/logo.png"
            alt="logo"
          />
        </Button>
        <Menu
          style={{ width: "100%" }}
          theme={theme}
          onClick={onClick}
          selectedKeys={[currentKey]}
          mode="horizontal"
          items={listMenu}
        />

        <Button
          className="btn-mode"
          icon={theme === ETheme.Dark ? <MdDarkMode /> : <CiLight />}
          onClick={toggleTheme}
        />
      </Flex>
    </div>
  );
};

export default Header;
