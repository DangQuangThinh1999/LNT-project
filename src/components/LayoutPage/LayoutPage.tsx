import { ConfigProvider, Layout, theme } from "antd";

import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Header from "./Header/Header";
import "./styled.scss";
import { themeRecoil } from "recoil/theme";

const LayoutPage = () => {
  const themeState = useRecoilValue(themeRecoil);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeState === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="container">
        <Layout>
          <Header />
          <Outlet></Outlet>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default LayoutPage;
