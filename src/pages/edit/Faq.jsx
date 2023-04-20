import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import FaqEdit from "../../components/Forms/FaqEdit";

function Job() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    BasicAxios.get("admin/faq/" + params.id).then((res) => {
      setData(res?.data);
    });
  }, []);
  if (!data) return;
  return (
    <>
      <FaqEdit data={data}></FaqEdit>
    </>
  );
}

export default Job;
