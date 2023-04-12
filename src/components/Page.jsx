import React from "react";
import { Provider } from "react-redux";
import store from "./../store/index";
import { RouterProvider } from "react-router-dom";

export default function Page({ router, user = false }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} user={user} />
      </Provider>
    </React.StrictMode>
  );
}
