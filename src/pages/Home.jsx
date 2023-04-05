import MainTable from "../components/MainTable";
import BasicAxios from "../helpers/axios/index";
import MainStats from "../components/MainStats";

import { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <div className="px-[3rem]">
        <MainStats></MainStats>
      </div>
    </>
  );
}

export default Home;
