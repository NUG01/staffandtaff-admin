import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import EstablishmentInput from "./inputs/EstablishmentInput";
import { useState, useEffect, useRef } from "react";
import BasicAxios from "../../helpers/axios";
import MediaAxios from "../../helpers/axios/MediaAxios";
import { useParams } from "react-router-dom";
import ImageEdit from "../ImageEdit";

export default function EstablishmentEdit(props) {
  const modal = useRef();
  const imageInput = useRef();
  const uploadIcon = useRef();
  const submitIcon = useRef();
  const previewImgHolder = useRef();
  const imageToReplace = useRef();
  const indexInput = useRef();

  const data = props.data;
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [country, setCountry] = useState(data.country);
  const [numberOfEmployees, setNumberOfEmployees] = useState(
    data.number_of_employees
  );
  const [industryId, setIndustryId] = useState(data?.industry?.id);

  const [name, setName] = useState(data.name);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [address, setAddress] = useState(data.address);
  const [description, setDescription] = useState(data.description);

  function submitHandler(event) {
    event.preventDefault();
    setErrorMessage("");
    const payload = {
      id: params.id,
      name: name ? name : data.name,
      company_name: companyName ? companyName : data.company_name,
      address: address ? address : data.address,
      country: country ? country : data.country,
      industry_id: industryId ? industryId : data.industry.id,
      number_of_employees: numberOfEmployees
        ? numberOfEmployees
        : data.number_of_employees,
      description: description ? description : data.description,
    };
    BasicAxios.post("admin/establishments/update", payload)
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

  function checkCountry(value) {
    if (country && country == value) return true;
    if (country && country != value) return false;
    if (data.country == value) return true;
    return false;
  }
  function checkIndustry(value) {
    if (industryId && industryId == value) return true;
    if (industryId && industryId != value) return false;
    if (data?.industry?.id == value) return true;
    return false;
  }

  function checkboxHandler(event) {
    setCountry(event.target.value);
  }
  function industryHandler(event) {
    setIndustryId(event.target.value);
  }
  function textHnadler(event) {
    setDescription(event.target.value);
  }

  function numbersHnadler(value) {
    setNumberOfEmployees(value);
  }
  function addressHnadler(value) {
    setAddress(value);
  }

  function companyNameHandler(value) {
    setCompanyName(value);
  }

  function nameHandler(value) {
    setName(value);
  }

  function closeModal() {
    modal.current.classList.add("hidden");
    modal.current.classList.remove("flex");
    submitIcon.current.classList.add("hidden");
    submitIcon.current.classList.remove("flex");
    imageInput.current.value = "";
  }

  function previewImage(files) {
    submitIcon.current.classList.remove("hidden");
    submitIcon.current.classList.add("flex");

    previewImgHolder.current.src = URL.createObjectURL(files[0]);
  }

  function submitChange(value) {
    const form = new FormData();
    form.append("image", value);
    console.log(value);
    console.log(form.get('image'));

    MediaAxios.post(`/admin/establishments-gallery/update/${indexInput.current.value}`, form).then(
      (res) => {
        indexInput.current.value = ''
        modal.current.classList.add("hidden");
        modal.current.classList.remove("flex");
        submitIcon.current.classList.add("hidden");
        submitIcon.current.classList.remove("flex");
        imageInput.current.value = "";
        imageToReplace.current.src = URL.createObjectURL(value);
      }
    );
  }

  return (
    <form onSubmit={submitHandler} className="px-[2rem]">
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Establishment
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <EstablishmentInput
              name="name"
              label="Name"
              complete="given-name"
              value={name == undefined ? data.name : name}
              onChange={nameHandler}
            ></EstablishmentInput>
            <EstablishmentInput
              name="company_name"
              label="Company Name"
              complete="given-company_name"
              value={companyName == undefined ? data.company_name : companyName}
              onChange={companyNameHandler}
            ></EstablishmentInput>
            <div className="py-[12px]">
              <label htmlFor="select">
                <p className="text-gray-900 text-[13.5px] mb-[7px]">Country</p>
                <div className="flex items-center gap-[5px] mb-[4px]">
                  <input
                    className="cursor-pointer"
                    id="FR"
                    type="radio"
                    name="select"
                    value="FR"
                    checked={checkCountry("FR") ? true : false}
                    onChange={checkboxHandler}
                  />
                  <span className="text-gray-600 text-[11px] font-[600]">
                    FRANCE
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <input
                    className="cursor-pointer"
                    id="CH"
                    type="radio"
                    name="select"
                    value="CH"
                    checked={checkCountry("CH") ? true : false}
                    onChange={checkboxHandler}
                  />
                  <span className="text-gray-600 text-[11px] font-[600]">
                    SWITZERLAND
                  </span>
                </div>
              </label>
            </div>
            <div className="py-[12px]">
              <label htmlFor="industry">
                <p className="text-gray-900 text-[13.5px] mb-[7px]">Industry</p>
                <div className="flex items-center gap-[5px] mb-[4px]">
                  <input
                    className="cursor-pointer"
                    id="RESTAURATION"
                    type="radio"
                    name="industry"
                    value="1"
                    checked={checkIndustry("1") ? true : false}
                    onChange={industryHandler}
                  />
                  <span className="text-gray-600 text-[11px] font-[600]">
                    RESTAURATION
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <input
                    className="cursor-pointer"
                    id="HÔTELLERIE"
                    type="radio"
                    name="industry"
                    value="2"
                    checked={checkIndustry("2") ? true : false}
                    onChange={industryHandler}
                  />
                  <span className="text-gray-600 text-[11px] font-[600]">
                    HÔTELLERIE
                  </span>
                </div>
              </label>
            </div>
            <EstablishmentInput
              name="address"
              label="Address"
              complete="given-address"
              value={address == undefined ? data.address : address}
              onChange={addressHnadler}
            ></EstablishmentInput>
            <EstablishmentInput
              type="number"
              name="number_employees"
              label="Number of Employees"
              complete="given-number_employees"
              value={
                numberOfEmployees != undefined
                  ? numberOfEmployees
                  : data.number_of_employees
              }
              onChange={numbersHnadler}
            ></EstablishmentInput>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  onChange={textHnadler}
                  rows={4}
                  name="description"
                  id="description"
                  className="block p-[12px] w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={
                    description == undefined ? data.description : description
                  }
                />
              </div>
              {data?.gallery && (
                <div className="mt-2 flex flex-wrap justify-between">
                  {data.gallery.map((item, index) => {
                    return (
                      <ImageEdit
                        key={item.id}
                        modal={modal.current}
                        index={item.id}
                        src={`http://localhost:8000/storage/${item.path}`}
                        imageToReplace={imageToReplace}
                        indexInput={indexInput}
                      />
                    );
                  })}
                </div>
              )}
            </div>
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

      <div
        className="imageEdit fixed w-[100vw] h-[100vh] z-[100] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm hidden inset-0 pt-[50px] items-center justify-center"
        ref={modal}
      >
        <i
          className="fa-solid fa-xmark text-white absolute right-[40px] top-[20px] bg-black w-[30px] h-[30px] flex justify-center items-center rounded-full text-[13px] cursor-pointer"
          onClick={() => closeModal()}
        ></i>

        <label htmlFor="image-edit-input" ref={uploadIcon}>
          <i className="fa-solid fa-cloud-arrow-up text-white absolute right-[40px] top-[60px] bg-blue-900 w-[30px] h-[30px] flex justify-center items-center rounded-full text-[13px] cursor-pointer"></i>
        </label>

        <i
          className="fa-solid fa-check text-white absolute right-[40px] top-[100px] bg-green-900 w-[30px] h-[30px] justify-center items-center rounded-full text-[13px] cursor-pointer hidden"
          ref={submitIcon}
          onClick={() => submitChange(imageInput.current.files[0])}
        ></i>

        <input
          type="file"
          id="image-edit-input"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          ref={imageInput}
          onInput={(e) => {
            previewImage(e.target.files);
          }}
        />

        <input 
          type="text"
          className="hidden"
          ref={indexInput}
        />

        <img
          src=""
          alt=""
          className="object-contain max-w-[80%]"
          ref={previewImgHolder}
        />
      </div>
    </form>
  );
}
