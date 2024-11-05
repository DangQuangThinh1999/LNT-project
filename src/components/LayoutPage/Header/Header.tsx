import { userRecoil } from "@/recoil/user";
import { Button, Dropdown, Flex, Menu, MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CiLight } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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
  {
    key: "login",
    label: <Link to="/login">Login</Link>,
  },
  {
    key: "register",
    label: <Link to="/register">Register</Link>,
  },
  {
    key: "wallet",
    label: <Link to="/wallet">Wallet</Link>,
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userRecoil);
  const [theme, setTheme] = useRecoilState(themeRecoil);
  const [currentKey, setCurrentKey] = useState("home");
  const toggleTheme = () => {
    const newTheme = theme === ETheme.Dark ? ETheme.Light : ETheme.Dark;
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };
  const WalletInfo: MenuProps["items"] = [
    {
      key: "1",
      label: <strong>{user.user.email}</strong>,
    },
    {
      key: "2",
      label: (
        <Flex align="center" gap={5} onClick={handleLogout}>
          <p> Logout </p>

          <IoLogInOutline size={24} />
        </Flex>
      ),
    },
  ];
  const menu = useMemo(
    () =>
      !user.token
        ? listMenu
        : listMenu.filter(
            (item: any) => item.key != "login" && item.key != "register"
          ),
    [user.token]
  );

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentPath = pathSegments[pathSegments.length - 1];
    setCurrentKey(currentPath);
  }, [location]);
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
          items={menu}
        />

        <Flex align="center">
          <Button
            className="btn-mode"
            icon={theme === ETheme.Dark ? <MdDarkMode /> : <CiLight />}
            onClick={toggleTheme}
          />
          {user.token && (
            <Dropdown
              menu={{ items: WalletInfo }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button
                onClick={() => navigate("/wallet")}
                variant="solid"
                style={{ outline: "solid" }}
                size="middle"
                shape="round"
              >
                Wallet
              </Button>
            </Dropdown>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
