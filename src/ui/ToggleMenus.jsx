import { createContext, useContext, useState } from "react";
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

    !isOpen ? open() : close();
  }
  <button onClick={handleClick}>
    <FaEllipsisH />
  </button>;
}

export default ToggleMenus;
