import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function MainDetails(props) {
  const data = props.data;
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        {props.state != "profile" && (
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
            Information
          </h3>
        )}
        {props.state == "profile" && (
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Admin Information
          </h3>
        )}
        {props.state != "profile" && (
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)} details
            and application.
          </p>
        )}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {Object.keys(data).map((key, i) => {
            if (key == "id") return;
            return (
              <div
                key={i}
                style={
                  i % 2 == 0
                    ? { backgroundColor: "#F8F8F8" }
                    : { backgroundColor: "#FFF" }
                }
                className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-500">
                  {key.replaceAll("_", " ")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {props.type == "user" && data[key]}
                  {props.type == "payment" && data[key]}
                  {props.type == "faq" && data[key]}
                  {props.type == "job" && key != "location" && data[key]}
                  {props.type == "job" &&
                    key == "location" &&
                    data[key].country_code}
                  {props.type == "establishment" &&
                    key != "industry" &&
                    data[key]}
                  {props.type == "establishment" &&
                    key == "industry" &&
                    data[key]?.name}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
