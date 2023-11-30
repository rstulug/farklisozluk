import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useUser } from "../authentication/useUser";
import { Tiptap } from "../../ui/Tiptap";
import { useInsertPost } from "./useInsertPost";
import { slugify } from "../../utils/helpers";
import ProtectedRoute from "../../ui/ProtectedRoute";

function NewPostForm() {
  const { user } = useUser();
  const { control, handleSubmit, register, formState } = useForm();
  const { errors } = formState;
  const { insertPost, status } = useInsertPost();

  function onSubmit({ comment, title }) {
    const titleSlug = slugify(title);
    insertPost({ User: user.id, title, titleSlug, comment });
  }

  return (
    <ProtectedRoute>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Başlık" error={errors?.title?.message}>
          <input
            type="text"
            id="title"
            className="h-9 rounded-xl pl-2"
            {...register("title", {
              required: "Bu alan zorunludur",
              minLength: {
                value: 10,
                message: "Başlık 10 karakterden küçük olamaz",
              },
              maxLength: {
                value: 40,
                message: "Başlık 40 karakterden büyük olamaz",
              },
            })}
          />
        </FormRow>
        <FormRow label="Yorumunuz nedir" />
        <Controller
          render={({ field, fieldState }) => (
            <Tiptap onChange={field.onChange} error={fieldState?.error} />
          )}
          control={control}
          name="comment"
          rules={{
            required: "Bu alan zorunludur",
            minLength: {
              value: 1,
              message: "Yorum bir karakterden küçük olamaz",
            },
          }}
        />
        <Button
          type="green"
          btnName="Aç bu konuyu"
          size="small"
          disabled={status.pending}
        />
      </Form>
    </ProtectedRoute>
  );
}

export default NewPostForm;
