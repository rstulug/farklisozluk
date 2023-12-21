import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import { Tiptap } from "./Tiptap";
import { useUpdateComment } from "../features/comment/useUpdateComment";

function UpdateComment({ id, comment }) {
  const { handleSubmit, reset, control } = useForm();
  const { updateComment, status } = useUpdateComment();

  function onSubmit({ newComment }) {
    updateComment({ id: id, obj: { comment: newComment } });
  }

  return (
    <form
      className="border-t-2 border-black py-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="font-italic text-md mb-2">Yorumu düzenle</label>
      <Controller
        render={({ field, fieldState, formState }) => (
          <Tiptap
            onChange={field.onChange}
            error={fieldState?.error}
            formState={formState}
            reset={reset}
            content={comment}
          />
        )}
        control={control}
        name="newComment"
        rules={{
          required: "Bu alan zorunludur",
          maxLength: {
            value: 500,
            message: "Yorumunuz 500 karakterden fazla olamaz",
          },
        }}
      />

      <Button
        type="green"
        size="small"
        btnName="Tekrar Yolla"
        disabled={status.pending}
      />
    </form>
  );
}

export default UpdateComment;
