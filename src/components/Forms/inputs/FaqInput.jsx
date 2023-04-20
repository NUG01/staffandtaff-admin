import React from "react";

function FaqInput(props) {
  function changeHandler(event) {
    props.onChange(event.target.value);
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 border-b border-grey">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        {props.label}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          type="text"
          name={props.name}
          value={props.value}
          id={props.name}
          className="block w-full px-[7px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          ref={props.inpRef}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}

export default FaqInput;
