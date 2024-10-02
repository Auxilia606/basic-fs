import React from "react";
import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Login from "@pages/Login";
import Main from "@pages/Main";

export const RouterProvider: React.FC = () => {
  return <ReactRouterProvider router={router} />;
};

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/login",
    element: <Login />,
  },
]);
