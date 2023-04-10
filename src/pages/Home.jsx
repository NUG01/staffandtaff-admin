import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import MainStats from "../components/MainStats";
import { Load, UnLoad } from "../hooks/LoaderHandle";

import { useEffect, useState } from "react";

function Home() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    Load()
    BasicAxios.get("admin/stats").then((res) => {
      setStats(res.data);
      UnLoad()
    });
  }, []);
  return (
    <>
      <div className="px-[3rem]">
        <MainStats data={stats} type="stats"></MainStats>
      </div>
    </>
  );
}

export default Home;
