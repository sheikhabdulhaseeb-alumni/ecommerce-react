import react from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "./components/Home";
import App from "./App";
import Error from "./components/Error";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
            path: "product/:id",
            element: <ProductDetail />,
        },
        {
          path:  "cart",
          element: <Cart />,
        }
      ],
    },
  ]);

const root   =  createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />)