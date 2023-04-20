import { useEffect, useState } from "react";
import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index.js";

function Faqs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    BasicAxios.get("admin/faqs").then((res) => {
      setData(res.data.data);
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
