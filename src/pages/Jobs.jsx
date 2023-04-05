import React from "react";

import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import { globalActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState, useCallback } from "react";

function Jobs() {
  const [data, setData] = useState([]);
  let jobs = useSelector((state) => state.jobs);

  const dispatch = useDispatch();
  // const fetchJobs = useCallback(async () => {
  //   const res = await BasicAxios.get("admin/jobs");
  //   dispatch(globalActions.setJobs(res.data.data));
  //   setData(res?.data?.data);
  // }, []);

  useEffect(() => {
    // fetchJobs();

    BasicAxios.get("admin/jobs").then((res) => {
      dispatch(globalActions.setJobs(res.data.data));
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

export default Jobs;
