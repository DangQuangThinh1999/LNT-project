import { TUser, userRecoil } from "@/recoil/user";
import { Dropdown, Flex, MenuProps, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CiLight } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { MdClose, MdDarkMode, MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { themeRecoil } from "../../../recoil/theme";
import { ETheme } from "../../../recoil/type";
import "./styleHeader.scss";
const listMenu = [
  {
    key: "home",
    label: (
      <Link to="/">
        <Typography className="btn-menu"> Home</Typography>
      </Link>
    ),
  },
  {
    key: "about",
    label: (
      <Link to="/about">
        <Typography className="btn-menu"> About</Typography>
      </Link>
    ),
  },
  {
    key: "login",
    label: (
      <Link to="/login">
        <Typography className="btn-menu"> Login</Typography>
      </Link>
    ),
  },
  {
    key: "register",
    label: (
      <Link to="/register">
        <Typography className="btn-menu"> Register</Typography>
      </Link>
    ),
  },
  {
    key: "wallet",
    label: (
      <Link to="/wallet">
        <Typography className="btn-menu"> Wallet</Typography>
      </Link>
    ),
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userRecoil);
  const [theme, setTheme] = useRecoilState(themeRecoil);
  const [currentKey, setCurrentKey] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const toggleTheme = () => {
    const newTheme = theme === ETheme.Dark ? ETheme.Light : ETheme.Dark;
    setTheme(newTheme);
  };
  const setUser = useSetRecoilState(userRecoil);

  const handleLogout = () => {
    setUser({
      token: "",
      user: {} as TUser,
    });
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
    if (currentPath) setCurrentKey(currentPath);
    else setCurrentKey("home");
  }, [location]);
  const onClick = (key: string) => {
    setCurrentKey(key);
  };
  const IconMenu = isOpen ? MdClose : MdMenu;
  return (
    <div className={`header-wrapper ${theme === "dark" ? "dark" : ""}`}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <div className="img-header">
            <img
              onClick={() => navigate("/")}
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="logo"
            />
          </div>
          <Flex className="menu-header-desktop">
            {menu.map((item) => (
              <div
                style={{ color: "white" }}
                key={item.key}
                onClick={() => onClick(item.key)}
                className={`${currentKey === item.key ? "active" : ""}`}
              >
                {item.label}
              </div>
            ))}
          </Flex>
        </Flex>

        <Flex align="center">
          <Flex align="center">
            <div className="btn-mode" onClick={toggleTheme}>
              {theme === ETheme.Dark ? (
                <MdDarkMode color="white" />
              ) : (
                <CiLight color="black" />
              )}
            </div>
            <div className="btn-mobi">
              <IconMenu
                onClick={() => setIsOpen((prev) => !prev)}
                color={theme === "dark" ? "white" : "black"}
              />
            </div>
          </Flex>
          {user.token.length > 0 && (
            <Dropdown
              menu={{ items: WalletInfo }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <div className="btn-menu" onClick={() => navigate("/wallet")}>
                <Typography>Wallet</Typography>
              </div>
            </Dropdown>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <Flex vertical className="menu-header-mobi">
          {menu.map((item) => (
            <div
              onClick={() => {
                onClick(item.key);
                setIsOpen(false);
              }}
              className={`${currentKey === item.key ? "active" : ""}`}
              key={item.key}
            >
              {item.label}
            </div>
          ))}
        </Flex>
      )}
    </div>
  );
};

export default Header;
