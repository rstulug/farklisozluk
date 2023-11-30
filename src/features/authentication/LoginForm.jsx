import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login, status } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="email"
          id="email"
          {...register("email", {
            required: "Bu alan zorunludur",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Geçerli bir email adresi girin",
            },
          })}
        />
      </FormRow>
      <FormRow label="Şifre" error={errors?.password?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="password"
          id="password"
          {...register("password", {
            required: "Bu alan zorunludur",
            minLength: {
              value: 8,
              message: "Şifre 8 ve ya daha fazla karaktere sahip olmalıdır",
            },
          })}
        />
      </FormRow>
      <div className="flex justify-center">
        <Button
          btnName="Giriş Yap"
          type="primary"
          size="large"
          disabled={status.pending}
        />
      </div>
    </Form>
  );
}

export default LoginForm;
