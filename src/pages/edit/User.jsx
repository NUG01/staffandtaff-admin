import React from "react";
import UserEdit from "../../components/Forms/UserEdit";
import { useParams } from "react-router-dom";
import BasicAxios from "../../helpers/axios/index.js";
import { useState, useEffect } from "react";

function User() {
  const params = useParams();
  const [data, setData] = useState([]);
  // let data;
  useEffect(() => {
    BasicAxios.get("admin/user/" + params.id).then((res) => {
      setData(res?.data);
      // data = res?.data;
    });
  }, []);
  return (
    <>
      <UserEdit data={data}></UserEdit>
    </>
  );
}

export default User;
