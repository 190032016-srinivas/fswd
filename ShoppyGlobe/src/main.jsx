import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalProvider } from "./GlobalData.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store.js";
import { ErrorElement } from "./Components/ErrorElement.jsx";
import LoadingComponent from "./Components/LoadingComponent.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";

const CartPage = React.lazy(() => import("./Components/CartPage.jsx"));
const Homepage = React.lazy(() => import("./Components/HomePage.jsx"));
const ProductDetails = React.lazy(() =>
  import("./Components/ProductDetails.jsx")
);
const CheckoutPage = React.lazy(() => import("./Components/CheckOut.jsx"));

const myRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ProductDetails />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorElement />,
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={myRouter} />
    </GlobalProvider>
  </Provider>
);
