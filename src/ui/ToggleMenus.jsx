import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisH } from "react-icons/fa";

const MenusContext = createContext();

function ToggleMenus({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <MenusContext.Provider
      value={{ open, close, isOpen, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle() {
  const { open, close, isOpen, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    isOpen ? close() : open();
  }

  return (
    <button onClick={handleClick} className="relative">
      <FaEllipsisH />
    </button>
  );
}

function List({ children }) {
  const { position, isOpen } = useContext(MenusContext);
  const { x, y } = position || {};

  if (!isOpen) return null;

  return (
    <ul
      className={`fixed list-none right-${x} top-${y} h-45 w-2/6 bg-red-400 `}
    >
      {createPortal(children, document.body)}
    </ul>
  );
}

function Button({ children, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return <li onClick={handleClick}>{children}</li>;
}

ToggleMenus.Toggle = Toggle;
ToggleMenus.List = List;
ToggleMenus.Button = Button;
export default ToggleMenus;
