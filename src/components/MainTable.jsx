import { Link, useLocation } from "react-router-dom";
import BasicAxios from "../helpers/axios";
import { useState, useEffect } from "react";
import { Load, RemoveLoader } from "../hooks/LoaderHandle";
import { useSelector } from "react-redux";
import AlertModal from "../components/AlertModal";

function filterByValue(array, string) {
  const result = array.filter((obj) => {
    let includes = false;
    const searchTermsArr = string.split(" ");

    let values = Object.values(obj);

    values.forEach((item) => {
      searchTermsArr.forEach((term) => {
        if (
          item.toString().toLowerCase().includes(term.toString().toLowerCase())
        ) {
          includes = true;
          return;
        }
      });
    });

    return includes;
  });

  return result;
}

export default function MainTable(props) {
  const [alertModal, setAlertModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  function modalHandler(id) {
    setCurrentId(id);
    setAlertModal(true);
  }

  const { pathname } = useLocation();
  const searchItemValue = useSelector((state) => state.searchItem);

  let data;
  let columnNames;
  let keys;
  let columns;
  if (props.data[0]) {
    data = props.data;
    if (searchItemValue && searchItemValue.pathname == pathname) {
      data = filterByValue(data, searchItemValue.term);
    }
    const myObj = props.data[0];
    keys = Object.keys(myObj);
    columnNames = keys.map((item) => {
      if (item == "id" || item == "stripe_id") return;
      return (
        <th
          key={item}
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          {item.replaceAll("_", " ")}
        </th>
      );
    });
  } else {
    return <h2>No data</h2>;
  }

  function deleteHandler(id) {
    Load();
    if (props.type !== "subscriptions") {
      BasicAxios.delete(
        `admin/${props.type.charAt(0) + props.type.slice(1, -1)}/delete/${id}`
      )
        .then((res) => {
          props.setData((data) => data.filter((item) => item.id != id));
          RemoveLoader();
        })
        .catch((err) => RemoveLoader());
    } else {
      BasicAxios.post("admin/cancel-subscription", {
        id: id,
      })
        .then((res) => {
          props.setData((data) => data.filter((item) => item.id != id));
          RemoveLoader();
        })
        .catch((err) => RemoveLoader());
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {alertModal && (
        <div className="z-50">
          <AlertModal
            delete={() => deleteHandler(currentId)}
            state={alertModal}
            close={() => setAlertModal(false)}
          ></AlertModal>
        </div>
      )}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the {props.type} in your account.
          </p>
        </div>
        {props.addable && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              to={"add"}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add {props.type.charAt(0) + props.type.slice(1, -1)}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columnNames}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((item, personIdx) => (
                  <tr
                    key={item.id}
                    className={personIdx % 2 === 0 ? undefined : "bg-gray-50"}
                  >
                    {keys.map((key) => {
                      if (key == "id" || key == "stripe_id") return;
                      return (
                        <td
                          key={key}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {item[key]}
                        </td>
                      );
                    })}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <Link
                        to={pathname.slice(0, -1) + "/" + item.id}
                        className="text-indigo-800 hover:text-indigo-900"
                      >
                        Details
                        <span className="sr-only">, {item.id}</span>
                      </Link>
                    </td>
                    {props.type !== "subscriptions" && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <Link
                          to={pathname.slice(0, -1) + "/edit/" + item.id}
                          className="text-indigo-500 hover:text-indigo-900"
                          params={{ data: item }}
                        >
                          Edit
                          <span className="sr-only">, {item.id}</span>
                        </Link>
                      </td>
                    )}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <Link
                        href="#"
                        className="text-red-600 hover:text-indigo-900"
                      >
                        <span
                          onClick={() =>
                            modalHandler(
                              props.type != "subscriptions"
                                ? item.id
                                : item.stripe_id
                            )
                          }
                        >
                          Delete
                        </span>
                        <span className="sr-only">, {item.id}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
