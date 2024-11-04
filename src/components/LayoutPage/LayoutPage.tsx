import { ConfigProvider, Layout, theme } from "antd";

import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { themeRecoil } from "recoil/theme";
import Header from "./Header/Header";
import "./styled.scss";

const LayoutPage = () => {
  const themeState = useRecoilValue(themeRecoil);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeState === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Header />
      <Layout>
        <div className="container">
          <Outlet></Outlet>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
