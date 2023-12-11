import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useSignup } from "./useSignup";

import { slugify } from "../../utils/helpers";

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const { signUp, status } = useSignup();

  function onSubmit({ email, password, username, name, surname, gender }) {
    const usernameSlug = slugify(username);

    signUp({ username, email, password, name, surname, gender, usernameSlug });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="email"
          id="email"
          disabled={status.pending}
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
          disabled={status.pending}
          {...register("password", {
            required: "Bu alan zorunludur",
            minLength: {
              value: 8,
              message: "Şifre 8 ve ya daha fazla karaktere sahip olmalıdır",
            },
          })}
        />
      </FormRow>

      <FormRow label="Şifre Tekrarı" error={errors?.passwordConfirm?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="password"
          id="passwordConfirm"
          disabled={status.pending}
          {...register("passwordConfirm", {
            required: "Bu alan zorunludur",
            validate: (value) =>
              value === getValues().password || "Şifreler uyuşmuyor",
          })}
        />
      </FormRow>

      <FormRow label="Kullanıcı Adı" error={errors?.username?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="text"
          id="username"
          disabled={status.pending}
          {...register("username", {
            required: "Bu alan zorunludur",
            minLength: {
              value: 2,
              message:
                "Kullanıcı adı 2 ve ya daha fazla karaktere sahip olmalıdır",
            },
            maxLength: {
              value: 25,
              message: "Kullanıcı adı 25 karakterden fazla olamaz",
            },
          })}
        />
      </FormRow>
      <FormRow label="İsim" error={errors?.name?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="text"
          id="name"
          disabled={status.pending}
          {...register("name")}
        />
      </FormRow>
      <FormRow label="Soyisim" error={errors?.surname?.message}>
        <input
          className="h-8 rounded-lg pl-2 text-xl"
          type="text"
          id="surname"
          disabled={status.pending}
          {...register("surname")}
        />
      </FormRow>
      <FormRow label="Cinsiyet" error={errors?.gender?.message}>
        <select {...register("gender")} className="h-8 rounded-lg pl-2 text-xl">
          <option value="female">Kadın</option>
          <option value="male">Erkek</option>
          <option value="other">Belirtmek istemiyorum</option>
        </select>
      </FormRow>

      <div className="flex flex-row justify-between">
        <Button
          btnName="Kayıt ol"
          type="primary"
          size="large"
          disabled={status.pending}
        />
        <div className="flex flex-row items-center">
          <h3 className="font-semibold">Zaten bir hesabın mı var ? </h3>
          <Button btnName="Giriş Yap" type="light" size="small" to="/login" />
        </div>
      </div>
    </Form>
  );
}

export default SignupForm;
