import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Establishments from "./pages/Establishments";
import Users from "./pages/Users";
import User from "./pages/details/User";
import Job from "./pages/details/Job";
import Establishment from "./pages/details/Establishment";
import UserEdit from "./pages/edit/User";
import EstablishmentEdit from "./pages/edit/Establishment";
import JobEdit from "./pages/edit/Job";

import { Provider } from "react-redux";
import store from "./store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "establishments", element: <Establishments /> },
      { path: "users", element: <Users /> },
      { path: "user/:id", element: <User /> },
      { path: "job/:id", element: <Job /> },
      { path: "establishment/:id", element: <Establishment /> },
      { path: "user/edit/:id", element: <UserEdit /> },
      { path: "job/edit/:id", element: <JobEdit /> },
      { path: "establishment/edit/:id", element: <EstablishmentEdit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
