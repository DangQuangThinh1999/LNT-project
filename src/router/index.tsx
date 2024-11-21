import { LayoutWrapper } from "@/components/LayoutWrapper";
import { HomePage } from "@/pages/Home";

import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Wallet } from "@/pages/Wallet";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      // { path: "products/:productId", element: <ProductPage /> },
      // { path: "cart", element: <CartPage /> },
      // { path: "checkout", element: <CheckoutPage /> },
      // { path: "login", element: <LoginPage /> },
      // { path: "register", element: <RegisterPage /> },
      // { path: "logout", element: <LogoutPage /> },
      // { path: "admin", element: <AdminPage /> },
      // { path: "404", element: <NotFoundPage /> },
      // { path: "*", element: <Redirect to="/404" /> }
    ],
  },
]);
