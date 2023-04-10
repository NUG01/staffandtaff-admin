import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import UserInput from "./inputs/UserInput";
import { useState } from "react";
import BasicAxios from "../../helpers/axios/index.js";
import { useParams } from "react-router-dom";

export default function Example(props) {
  const params = useParams();
  const data = props.data;
  const [name, setName] = useState(props.data.name);
  const [email, setEmail] = useState(props.data.email);

  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  function emailHandler(value) {
    setEmail(value);
  }
  function nameHandler(value) {
    setName(value);
  }

  function submitHandler(ev) {
    ev.preventDefault();
    setErrorMessage([]);
    if (props.state != "profile") {
      BasicAxios.post("admin/user/update", {
        id: params.id,
        name: !name ? props.data.name : name,
        email: !email ? props.data.email : email,
      })
        .then((res) => {
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.errors);
        });
    } else {
      BasicAxios.post("admin/update", {
        name: !name ? props.data.name : name,
        email: !email ? props.data.email : email,
      })
        .then((res) => {
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.errors);
        });
    }
  }
  return (
    <form onSubmit={submitHandler} className="px-[2rem]">
      <div className="space-y-12 sm:space-y-16">
        <div>
          {props.state != "profile" && (
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
          )}
          {props.state != "profile" && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          )}
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <UserInput
              name="name"
              label="Name"
              value={name != undefined ? name : data.name}
              onChange={nameHandler}
            ></UserInput>
            <UserInput
              name="email"
              label="Email"
              value={email != undefined ? email : data.email}
              onChange={emailHandler}
            ></UserInput>
          </div>
        </div>
      </div>
      {errorMessage &&
        Object.keys(errorMessage).map((key) => {
          return (
            <p
              key={key}
              className="text-[16px] font-[600] mt-[1rem] text-red-600"
            >
              {errorMessage[key]}
            </p>
          );
        })}

      {successMessage && (
        <p className="text-[16px] font-[600] mt-[1rem] text-green-600">
          {successMessage}
        </p>
      )}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
