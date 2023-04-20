import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import MainDetails from "../../components/MainDetails";

function User() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/faq/" + params.id).then((res) => {
      setData(res?.data);
      console.log(res.data);
    });
  }, []);
  if (!data) return;
  return (
    <>
      <MainDetails data={data} type="faq"></MainDetails>
    </>
  );
}

export default User;
