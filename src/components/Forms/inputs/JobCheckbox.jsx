import React from "react";

function JobCheckbox(props) {
  function changeHandler(value) {
    props.onChange(value);
  }

  function checkStatus(value) {
    if (props.value && props.value == value) return true;
    if (props.value && props.value != value) return false;
    if (props.propsValue == value) return true;
    return false;
  }
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label htmlFor={props.name}>
        <p className="text-gray-900 text-[13.5px] mb-[7px]">{props.label}</p>
        <div className="flex items-center gap-[5px] mb-[4px]">
          <input
            className="cursor-pointer"
            id={props.id_1}
            type="radio"
            name={props.name}
            value={props.value_1}
            checked={checkStatus(props.value_1) ? true : false}
            onChange={changeHandler}
          />
          <span className="text-gray-600 text-[11px] font-[600]">
            {props.text_1}
          </span>
        </div>
        <div className="flex items-center gap-[5px]">
          <input
            className="cursor-pointer"
            id={props.id_2}
            type="radio"
            name={props.name}
            value={props.value_2}
            checked={checkStatus(props.value_2) ? true : false}
            onChange={changeHandler}
          />
          <span className="text-gray-600 text-[11px] font-[600]">
            {props.text_2}
          </span>
        </div>
        {props.quantity == "3" && (
          <div className="flex mt-[7px] items-center gap-[5px]">
            <input
              className="cursor-pointer"
              id={props.id_3}
              type="radio"
              name={props.name}
              value={props.value_3}
              checked={checkStatus(props.value_3) ? true : false}
              onChange={changeHandler}
            />
            <span className="text-gray-600 text-[11px] font-[600]">
              {props.text_3}
            </span>
          </div>
        )}
      </label>
    </div>
  );
}

export default JobCheckbox;
