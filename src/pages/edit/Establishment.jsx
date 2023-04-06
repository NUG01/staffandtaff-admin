import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "../../helpers/axios";
import MainDetails from "../../components/MainDetails";
import EstablishmentEdit from "../../components/Forms/EstablishmentEdit";

function Establishment() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/establishment/" + params.id).then((res) => {
      setData(res?.data);
    });
  }, []);
  return (
    <>
      <EstablishmentEdit data={data}></EstablishmentEdit>
    </>
  );
}

export default Establishment;
