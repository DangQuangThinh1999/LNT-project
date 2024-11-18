import { ConfigProvider, Layout, theme } from "antd";

import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { themeRecoil } from "@/recoil/theme";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./styled.scss";

const LayoutWrapper = () => {
  const themeState = useRecoilValue(themeRecoil);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeState === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="container-layout">
        <Layout>
          <Header />
          <Outlet></Outlet>
          <Footer />
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default LayoutWrapper;
