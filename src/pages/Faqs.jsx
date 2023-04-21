import { useEffect, useState } from "react";
import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index.js";
import { Load, RemoveLoader } from "../hooks/LoaderHandle";
import { useSelector, useDispatch } from "react-redux";
import { globalActions } from "../store";
import { useLocation } from "react-router-dom";

function Faqs() {
  const [data, setData] = useState([]);
  const dispatch=useDispatch()
  const location=useLocation()

 
  
  useEffect(() => {
    Load()
    BasicAxios.get("admin/faqs").then((res) => {
      setData(res.data.data);
      RemoveLoader()
    });
  }, []);

  if (!data) return;

  return (
    <>
      <MainTable
        data={data}
        addable={true}
        setData={setData}
        type="faqs"
      ></MainTable>
    </>
  );
}

export default Faqs;
