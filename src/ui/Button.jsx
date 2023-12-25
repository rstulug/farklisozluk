import { Link } from "react-router-dom";

function Button({ btnName, type, onClick, disabled, size, to }) {
  const styles = {
    primary:
      "text-white bg-blue-700 hover:bg-blue-800  rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-2 my-2 ",

    alternative:
      "text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mx-2 my-2 ",

    dark: "text-white bg-gray-800 hover:bg-gray-900   rounded-lg  dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 mx-2 my-2 ",

    light:
      "text-gray-900 bg-white border border-gray-300  hover:bg-gray-100  rounded-lg  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600  mx-2 my-2 ",

    green:
      " text-white bg-green-700 hover:bg-green-500   rounded-lg  dark:bg-green-400 dark:hover:bg-green-500 mx-2 my-2 ",

    red: " text-white bg-red-700 hover:bg-red-800   rounded-lg  dark:bg-red-600 dark:hover:bg-red-700  mx-2 my-2 ",
  };

  const sizes = {
    extrasmall: " text-center h-8 w-12 text-xs text-center py-1 px-2",
    small: " text-center h-10 w-15 text-sm text-center py-1 px-3",
    regular: " text-center h-14 w-17 text-md text-center py-1 px-4",
    large: " text-center h-14 w-17 text-xl text-center py-2 px-5",
  };

  if (to)
    return (
      <Link to={to}>
        <button className={styles[type] + sizes[size]}>{btnName}</button>
      </Link>
    );

  return (
    <button
      className={styles[type] + sizes[size]}
      onClick={onClick}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
}

export default Button;
