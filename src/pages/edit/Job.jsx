import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import JobEdit from "../../components/Forms/JobEdit";

function Job() {
  const params = useParams();
  const [data, setData] = useState([]);
  // let data;
  useEffect(() => {
    BasicAxios.get("admin/job/" + params.id).then((res) => {
      setData(res?.data);
      // data = res?.data;
    });
  }, []);
  return (
    <>
      <JobEdit data={data}></JobEdit>
    </>
  );
}

export default Job;
