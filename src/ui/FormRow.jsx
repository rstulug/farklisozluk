function FormRow({ label, error, children }) {
  return (
    <div className="font-xl  ml-2 mt-3 flex items-center justify-start border-b-2 border-b-gray-400 py-4 ">
      <span className="mr-2 w-1/6 text-xl font-bold">{label}: </span>

      <span className=" rounded-xl shadow-xl dark:bg-slate-400 dark:text-slate-500">
        {children}
      </span>
      <span className="font-italic w-2/6 text-center text-xl font-medium dark:text-red-900 ">
        {error}
      </span>
    </div>
  );
}

export default FormRow;
