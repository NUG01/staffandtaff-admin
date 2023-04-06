import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import MainStats from "../components/MainStats";

import { useEffect, useState } from "react";

function Home() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/stats").then((res) => {
      setStats(res.data);
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
