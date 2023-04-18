import React from "react";

import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import { globalActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { Load, RemoveLoader } from "../hooks/LoaderHandle";

import { useEffect, useState, useCallback } from "react";

function Jobs() {
  const [data, setData] = useState([]);
  let jobs = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  useEffect(() => {
    
    if(jobs.length === 0){
      Load()
      BasicAxios.get("admin/jobs").then((res) => {
        dispatch(globalActions.setJobs(res.data.data));
        setData(res?.data?.data);
        RemoveLoader()
      });
    }else{
      setData(jobs)
    }

  }, []);

  return (
    <>
      {!data && <h2 style={{ color: "black" }}>hello</h2>}
      {data && <MainTable data={data} type='jobs' setData={setData}></MainTable>}
    </>
  );
}

export default Jobs;
