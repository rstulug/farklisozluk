import { useDeleteComment } from "../features/comment/useDeleteComment";
import Button from "./Button";
import { useModal } from "./Modal";

function ConfirmDelete({ id }) {
  const { isDeleting, deleteComment } = useDeleteComment();
  const { closeModal } = useModal();
  return (
    <div className="flex  w-full items-center justify-center backdrop-blur-xl">
      <div className="m-auto flex  w-3/6 flex-col justify-center bg-white">
        <div className="mx-2 my-3 items-center text-center text-xl font-bold">
          Gerçekten bu yorumu silmek istiyor musun ? Bu işlem geri alınamaz.
        </div>
        <div className="flex justify-center">
          <Button
            btnName="Onaylıyorum"
            type="red"
            size="small"
            onClick={() => {
              deleteComment(id);
              closeModal();
            }}
            disabled={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
