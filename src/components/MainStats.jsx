export default function Stats(props) {
  console.log(props.data);

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Object.keys(props.data).map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {props.data[item]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
