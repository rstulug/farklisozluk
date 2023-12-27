function Form({ children, onSubmit }) {
  return (
    <form
      className="mx-auto my-12 w-full flex-col gap-4 rounded-xl py-5 shadow-2xl shadow-stone-900 dark:bg-neutral-500 dark:shadow-slate-500"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
