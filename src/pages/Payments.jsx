import React from "react";

import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import { globalActions } from "../store/index.js";
import { useSelector, useDispatch } from "react-redux";
import { Load, UnLoad } from "../hooks/LoaderHandle";

import { useEffect, useState } from "react";

function Payments() {
  const [data, setData] = useState([]);

  const subscriptions = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (subscriptions.length == 0) {
      Load();
      BasicAxios.get("subscriptions").then((res) => {
        dispatch(globalActions.setSubscriptions(res.data.data));
        setData(res?.data?.data);
        UnLoad();
      });
    } else {
      setData(subscriptions);
    }
  }, []);

  return (
    <>
      {!data && <h2 style={{ color: "black" }}>No data</h2>}
      {data && <MainTable data={data} type="subscriptions"></MainTable>}
    </>
  );
}

export default Payments;
