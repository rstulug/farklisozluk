import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisH } from "react-icons/fa";
import { useOutsideClick } from "../hooks.js/useOutsideClick";

const MenusContext = createContext();

function ToggleMenus({ children }) {
  const [openId, setOpenId] = useState("");

  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");
  return (
    <MenusContext.Provider value={{ open, close, openId }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, close, openId } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      id={`ToggleButton_${id}`}
      className="relative"
    >
      <FaEllipsisH />
    </button>
  );
}

function List({ children, id }) {
  const { openId, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className="absolute bottom-[30px] right-[0]  flex   flex-col justify-center gap-1 rounded-md bg-green-200 px-2 py-2 dark:bg-slate-500"
      ref={ref}
    >
      {children}
    </ul>,
    document.getElementById(`ToggleButton_${id}`),
  );
}

function ListItem({ children, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li
      className="whitespace-nowrap px-2 text-sm hover:font-bold dark:hover:scale-105 dark:hover:font-bold"
      onClick={handleClick}
    >
      {children}
    </li>
  );
}

ToggleMenus.Toggle = Toggle;
ToggleMenus.List = List;
ToggleMenus.ListItem = ListItem;
export default ToggleMenus;
