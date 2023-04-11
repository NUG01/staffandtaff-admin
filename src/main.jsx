import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Payments from "./pages/Payments";
import Payment from "./pages/details/Payment";

import { Provider } from "react-redux";
import store from "./store/index.js";

import BasicAxios from "./helpers/axios";
import Page from "./components/Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "jobs", element: <Jobs /> },
      { path: "establishments", element: <Establishments /> },
      { path: "users", element: <Users /> },
      { path: "user/:id", element: <User /> },
      { path: "job/:id", element: <Job /> },
      { path: "establishment/:id", element: <Establishment /> },
      { path: "user/edit/:id", element: <UserEdit /> },
      { path: "job/edit/:id", element: <JobEdit /> },
      { path: "establishment/edit/:id", element: <EstablishmentEdit /> },
      { path: "payments", element: <Payments /> },
      { path: "payment/:id", element: <Payment /> },
    ],
  },
]);

let user = {};
BasicAxios.get("admin-user")
  .then((res) => {
    user = res.data.user;

    if (user) {
      ReactDOM.createRoot(document.getElementById("root")).render(
        <Page router={router} user={user} />
      );
    }
  })
  .catch((err) => {
    router.navigate("/");
    router.subscribe(() => router.navigate("/"));

    ReactDOM.createRoot(document.getElementById("root")).render(
      <Page router={router} user={user} />
    );
  });
