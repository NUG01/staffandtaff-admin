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

  useEffect(() => {
    
    if(establishments.length == 0){
      BasicAxios.get("admin/establishments").then((res) => {
        dispatch(globalActions.setEstablishments(res.data.data));
        setData(res?.data?.data);
      });
    }else{
      setData(establishments)
    }

  }, []);

  return (
    <>
      {!data && <h2 style={{ color: "black" }}>No data</h2>}
      {data && <MainTable data={data} type='establishments'></MainTable>}
    </>
  );
}

export default Establishment;
