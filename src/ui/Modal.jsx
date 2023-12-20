import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalUI({ btnName, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <Button btnName={btnName} onClick={openModal} type="red" size="small" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex justify-end">
          <button
            className="px-4 hover:rounded-lg hover:bg-slate-300"
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
  );
}

export default ModalUI;