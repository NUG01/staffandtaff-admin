import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import MainDetails from "../../components/MainDetails";

function User() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/job/" + params.id).then((res) => {
      setData(res?.data);
    });
  }, []);
  return (
    <>
      <MainDetails data={data} type="job"></MainDetails>
    </>
  );
}

export default User;
