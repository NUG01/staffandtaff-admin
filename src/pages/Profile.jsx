import React from "react";
import { useEffect, useState } from "react";
import BasicAxios from "../helpers/axios/index.js";
import MainDetails from "../../src/components/MainDetails";
import UserEdit from "../components/Forms/UserEdit";

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/user").then((res) => {
      setData(res?.data);
    });
  }, []);

  return (
    <>
      <MainDetails data={data} type="user" state="profile"></MainDetails>
      <div className="px-4 pt-5 sm:px-6 mt-[1rem]">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Update Profile
        </h3>
      </div>
      <UserEdit data={data} state="profile"></UserEdit>
    </>
  );
}

export default User;
