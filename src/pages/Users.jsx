import React from "react";

import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import { globalActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState, useCallback } from "react";

function Jobs() {
  const [data, setData] = useState([]);
  let users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {

    if(users.length === 0){
      BasicAxios.get("admin/users").then((res) => {
        dispatch(globalActions.setUsers(res.data.data));
        setData(res?.data?.data);
      });
    }else{
      setData(users)
    }

  }, []);

  return (
    <>
      {!data && <h2 style={{ color: "black" }}>hello</h2>}
      {data && <MainTable data={data} type="users"></MainTable>}
    </>
  );
}

export default Jobs;
