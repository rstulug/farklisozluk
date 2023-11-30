function Form({ children, onSubmit }) {
  return (
    <form
      className="mx-auto my-12 w-5/6 flex-col gap-4 rounded-xl bg-gray-200 py-5 shadow-xl"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
