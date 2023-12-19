import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

function ConfirmDelete() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center backdrop-blur-xl">
      <div className="m-auto flex  w-3/6 flex-col justify-center bg-white">
        <div className="flex w-full justify-end">
          <button className="px-4 hover:rounded-lg hover:bg-slate-300">
            <IconContext.Provider
              value={{
                style: { color: "black", height: "50px", width: "20px" },
              }}
            >
              <FaTimes />
            </IconContext.Provider>
          </button>
        </div>
        <div className="mx-4 my-2 items-center text-center text-xl font-bold">
          Gerçekten bu yorumu silmek istiyor musun ? Bu işlem geri alınamaz.
        </div>
        <div className="flex justify-center">
          <Button btnName="Sil" type="red" size="small" />
          <Button btnName="Vazgeç" type="green" size="small" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
