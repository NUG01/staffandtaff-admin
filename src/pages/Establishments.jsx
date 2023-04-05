import React from "react";

import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import { globalActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

function Establishment() {
  const [data, setData] = useState([]);

  const establishments = useSelector((state) => state.establishments);

  const dispatch = useDispatch();

  // if (establishments!=[]) setData(establishments);

  // useEffect(() => {
  //   (async () => {
  //     const res = await BasicAxios.get("admin/establishments");
  //     dispatch(globalActions.setEstablishments(res.data.data));
  //     setData(res?.data?.data);
  //   })();
  // }, [establishments]);

  useEffect(() => {
    // fetchJobs();

    BasicAxios.get("admin/establishments").then((res) => {
      dispatch(globalActions.setEstablishments(res.data.data));
      setData(res?.data?.data);
    });
  }, []);

  return (
    <>
      {!data && <h2 style={{ color: "black" }}>hello</h2>}
      {data && <MainTable data={data}></MainTable>}
    </>
  );
}

export default Establishment;
