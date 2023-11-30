import { useState } from "react";
import Button from "./Button";

function SearchBar() {
  const [query, setQuery] = useState("");

  function handleClick(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="w-25 flex flex-row items-center">
      <input
        type="search"
        className=" h-10 w-full rounded-md border-2 border-black outline-none placeholder:pl-3 "
        placeholder="Arama yapın"
        value={query}
        onChange={handleClick}
      />
      <Button btnName="Search" type="green" size="small" />
    </div>
  );
}

export default SearchBar;
