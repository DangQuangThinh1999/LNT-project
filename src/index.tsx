import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";

import { RecoilRoot } from "recoil";

import reportWebVitals from "./reportWebVitals";
import { router } from "./router";
import "./index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: "#3772FF",
      //     colorBgBase: "#FFFFFF",
      //     colorFillSecondary: "#777E90",
      //     fontFamily: "DM Sans",
      //     colorPrimaryHover: "#2E72D2",
      //   },
      // }}
      >
        <RouterProvider router={router} fallbackElement={"loading..."} />
      </ConfigProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
