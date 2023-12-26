import { createContext, useContext, useState } from "react";
import Modal from "react-modal";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("body");

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

const ModalContext = createContext();

function ModalUIProvider({ btnName, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal(e) {
    e.stopPropagation();
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }
  return (
    <ModalContext.Provider value={{ closeModal }}>
      <div onClick={handleStopPropagation}>
        <p onClick={openModal}> {btnName}</p>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          //style={customStyles}
          className="left-[50%] top-[50%]  mr-[50%]  min-h-fit w-auto translate-x-[50%] translate-y-[50%] dark:bg-slate-500"
        >
          <div className="flex justify-end ">
            <button
              className="px-4 hover:rounded-lg hover:bg-slate-400"
              onClick={closeModal}
            >
              <IconContext.Provider
                value={{
                  style: { color: "black", height: "50px", width: "20px" },
                }}
              >
                <FaTimes />
              </IconContext.Provider>
            </button>
          </div>
          {children}
        </Modal>
      </div>
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal context used outside the modalcontext provider");
  return context;
}

export { ModalUIProvider, useModal };
