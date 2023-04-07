import React from "react";

function EstablishmentInput(props) {
  function changeHandler(event) {
    props.onChange(event.target.value);
  }
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        {props.label}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          onChange={changeHandler}
          type={props.type ? props.type : "text"}
          value={props.value}
          name={props.name}
          id={props.name}
          // autoComplete={props.complete}
          className="block w-full px-[7px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default EstablishmentInput;
