import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import JobInput from "./inputs/JobInput";
import { useState, useEffect } from "react";
import JobCheckbox from "./inputs/JobCheckbox";
import { useParams } from "react-router-dom";
import BasicAxios from "../../helpers/axios";

export default function JobEdit(props) {
  const params = useParams();
  const [estName, setEstName] = useState(props.data.establishment_name);
  const [salary, setSalary] = useState(props.data.salary);
  const [position, setPosition] = useState(props.data.position);
  const [currency, setCurrency] = useState(props.data.currency);
  const [contract, setContract] = useState(props.data.contract);
  const [attendance, setAttendance] = useState(props.data.attendance);
  const [period, setPeriod] = useState(props.data.period);
  const [location, setLocation] = useState(props.data.location);
  const [geolocations, setGeolocations] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [availability, setAvailability] = useState(props.data.availability);
  const [description, setDescription] = useState(props.data.description);

  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  function estNameHandler(value) {
    setEstName(value);
  }
  function positionHandler(value) {
    setPosition(value);
  }
  function currencyHandler(ev) {
    setCurrency(ev.target.value);
  }
  function contractHandler(ev) {
    setContract(ev.target.value);
  }
  function attendanceHandler(ev) {
    setAttendance(ev.target.value);
  }
  function periodHandler(ev) {
    setPeriod(ev.target.value);
  }
  function availabilityHandler(ev) {
    setAvailability(ev.target.value);
  }

  function descriptionHandler(event) {
    setDescription(event.target.value);
  }
  function salaryHnadler(value) {
    setSalary(value);
  }

  function submitHandler(event) {
    event.preventDefault();
    setErrorMessage("");
    const data = props.data;
    const cityDetails = geolocations.find(
      (obj) => obj.city_name === location.city
    );
    const payload = {
      id: params.id,
      establishment: estName ? estName : data.establishment_name,
      salary: salary ? salary : data.salary,
      position: position ? position : data.position,
      currency: currency ? currency : data.currency,
      contract: contract ? contract : data.contract,
      attendance: attendance ? attendance : data.attendance,
      period: period ? period : data.period,
      availability: availability ? availability : data.availability,
      description: description ? description : data.description,
      city: location ? location : data.location.city,
      country_code: cityDetails?.country_code
        ? cityDetails?.country_code
        : props.data.location?.country_code,
      longitude: cityDetails?.longitude
        ? cityDetails?.longitude
        : props.data.location?.longitude,
      latitude: cityDetails?.latitude
        ? cityDetails?.latitude
        : props.data.location?.latitude,
    };

    BasicAxios.post("admin/jobs/update", payload)
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

  function cityHandler(ev) {
    console.log(location, ev.target.value);
    setLocation({
      city: ev.target.value,
    });
  }

  useEffect(() => {
    console.log(geolocations);
  }, [geolocations]);

  function citiesHandler() {
    setShowCities(true);
    console.log(location, props.data.location);
    BasicAxios.post("cities", {
      city_name: location?.city,
      country_code: props.data?.location?.country_code,
    })
      .then((res) => {
        setGeolocations(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function chooseCity(ev) {
    console.log(ev.target.getAttribute("value"));
    setLocation({
      city: ev.target.getAttribute("value"),
    });
    setShowCities(false);
  }

  const citiesMapper = () => (
    <div className="absolute w-[100%] h-[15rem] bg-gray-100 top-[3rem] left-0 rounded-[6px] overflow-x-hidden overflow-y-scroll">
      {geolocations.map((result) => {
        return (
          <div
            key={result}
            value={result.city_name}
            onClick={chooseCity}
            className="w-[100%] p-[3px] pl-[7px] text-[#000] bg-gray-100 border-b-[1.5px] border-b-[dark-gray] text-[13px] cursor-pointer hover:bg-gray-200"
          >
            {result.city_name}
          </div>
        );
      })}
    </div>
  );

  return (
    <form onSubmit={submitHandler} className="px-[2rem]">
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <JobInput
              name="est-name"
              label="Establishment Name"
              value={
                estName == undefined ? props.data.establishment_name : estName
              }
              onChange={estNameHandler}
            ></JobInput>
            <JobInput
              name="position"
              label="Position"
              value={position == undefined ? props.data.position : position}
              onChange={positionHandler}
            ></JobInput>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="search"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quick search
              </label>
              <div className="relative mt-2 flex items-center relative">
                {geolocations != [] &&
                  geolocations.length > 0 &&
                  showCities &&
                  citiesMapper()}

                <input
                  onChange={cityHandler}
                  type="text"
                  name="search"
                  id="search"
                  value={
                    location?.city ? location.city : props.data?.location?.city
                  }
                  className="px-[6px] block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    ⌘K
                  </kbd>
                </div>
              </div>
              <div className="text-[14px] text-[#000] h-full flex items-center jutify-center ">
                <span onClick={citiesHandler} className="cursor-pointer">
                  Search
                </span>
              </div>
            </div>

            <JobCheckbox
              name="currency"
              label="Currency"
              text_1="EU"
              text_2="CH"
              id_1="FR"
              id_2="CH"
              value_1="EU"
              value_2="CH"
              value={currency}
              propsValue={props.data.currency}
              onChange={currencyHandler}
            ></JobCheckbox>
            <JobCheckbox
              name="contract"
              label="Contract"
              text_1="Contrat à durée déterminé"
              text_2="Contrat à durée indéterminé"
              id_1="contract_1"
              id_2="attendance_2"
              value_1="1"
              value_2="2"
              value={contract}
              propsValue={props.data.contract}
              onChange={contractHandler}
            ></JobCheckbox>
            <JobCheckbox
              name="attendance"
              label="Attendance"
              text_1="Présentiel"
              text_2="Distanciel"
              id_1="attendance_1"
              id_2="attendance_2"
              value_1="1"
              value_2="2"
              value={attendance}
              propsValue={props.data.attendance}
              onChange={attendanceHandler}
            ></JobCheckbox>
            <JobCheckbox
              name="availability"
              label="Availability"
              text_1="Temps plein"
              text_2="Temps partiel"
              id_1="availability_1"
              id_2="availability_2"
              value_1="1"
              value_2="2"
              value={availability}
              propsValue={props.data.availability}
              onChange={availabilityHandler}
            ></JobCheckbox>

            <JobCheckbox
              name="period"
              label="Period"
              text_1="Par heure"
              text_2="Par mois"
              text_3="Par an"
              id_1="period_1"
              id_2="period_2"
              id_3="period_3"
              value_1="1"
              value_2="2"
              value_3="3"
              quantity="3"
              value={period}
              propsValue={props.data.period}
              onChange={periodHandler}
            ></JobCheckbox>

            <JobInput
              type="number"
              name="salary"
              label="Salary"
              value={salary != undefined ? salary : props.data.salary}
              onChange={salaryHnadler}
            ></JobInput>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  onChange={descriptionHandler}
                  rows={4}
                  name="description"
                  id="description"
                  className="block p-[12px] w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  value={
                    description != undefined
                      ? description
                      : props.data.description
                  }
                />
              </div>
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
    </form>
  );
}
