export default function Search(props) {
  function citiesHandler(value) {
    props.onChange(value);
  }
  console.log(props.value);
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={props.value?.city}
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
  );
}
