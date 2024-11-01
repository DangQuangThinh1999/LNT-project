import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../components/LayoutPage/LayoutPage";
import HomePage from "../pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <div>About</div>,
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
  {
    path: "me",
    element: <div>ME</div>,
  },
]);
