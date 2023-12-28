import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useUser } from "../authentication/useUser";
import { useUpdatePassword } from "./useUpdatePassword";
import Button from "../../ui/Button";
import { useUpdateUserInfo } from "./useUpdateUserInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUploadAvatar } from "./useUploadAvatar";

function UserSettings() {
  const { userMeta, user } = useUser();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors, isSubmitSuccessful } = formState;

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: formStateInfo,
    reset: resetInfo,
    getValues: getValuesInfo,
  } = useForm();
  const { errorsInfo, isSubmitSuccessful: isSubmitSuccessfulInfo } =
    formStateInfo;

  const {
    register: registerAvatar,
    handleSubmit: handleSubmitAvatar,
    formState: formStateAvatar,
  } = useForm();

  const { updateUserPassword, status } = useUpdatePassword();
  const { updateUserInfo, status: statusInfo } = useUpdateUserInfo();
  const { uploadAvatar, statusUploadAvatar } = useUploadAvatar();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (params.usernameSlug !== userMeta.usernameSlug)
        navigate(`/account/${userMeta.usernameSlug}`);
    },
    [navigate, params, userMeta],
  );

  function onUpdatePassword({ password }) {
    updateUserPassword({ email: user.email, password });
  }

  function onUpdateUserInfo({ name, surname, gender, about }) {
    updateUserInfo({
      userId: user.id,
      obj: {
        name: name || userMeta.name,
        surname: surname || userMeta.surname,
        gender: gender || userMeta.gender,
        about: about || userMeta.about,
      },
    });
  }

  function onUpdateAvatar({ avatar }) {
    if (!avatar[0]) return null;

    const imageFile = avatar[0];
    const imageName = userMeta.usernameSlug + "/" + uuidv4();

    const avatar_path =
      "https://gucrwoegryslkclkyefh.supabase.co/storage/v1/object/public/avatars/" +
      imageName;
    const oldImageName = userMeta.avatar_path
      ? userMeta.usernameSlug +
        "/" +
        userMeta.avatar_path.split(`${userMeta.usernameSlug}/`)[1]
      : null;

    uploadAvatar({
      imageName,
      imageFile,
      avatar_path,
      userId: userMeta.id,
      oldImageName,
    });
  }

  useEffect(
    function () {
      if (isSubmitSuccessful) {
        reset();
      } else if (isSubmitSuccessfulInfo) {
        resetInfo({ gender: getValuesInfo("gender") });
      }
    },
    [
      isSubmitSuccessful,
      isSubmitSuccessfulInfo,
      reset,
      resetInfo,
      getValuesInfo,
    ],
  );

  return (
    <div>
      <div>
        <h2 className="text-xl">Kullanıcı bilgilerini güncelle</h2>
        <Form onSubmit={handleSubmitInfo(onUpdateUserInfo)}>
          <FormRow label="İsim" error={errorsInfo?.name?.message}>
            <input
              className="h-8 rounded-lg pl-2 text-xl"
              type="text"
              id="name"
              placeholder={userMeta.name}
              disabled={statusInfo.pending}
              {...registerInfo("name")}
            />
          </FormRow>
          <FormRow label="Soyisim" error={errorsInfo?.surname?.message}>
            <input
              className="h-8 rounded-lg pl-2 text-xl"
              type="text"
              id="surname"
              placeholder={userMeta.surname}
              disabled={statusInfo.pending}
              {...registerInfo("surname")}
            />
          </FormRow>
          <FormRow label="Cinsiyet" error={errorsInfo?.gender?.message}>
            <select
              defaultValue={userMeta.gender}
              {...registerInfo("gender")}
              className="h-8 rounded-lg pl-2 text-xl"
            >
              <option value="female">Kadın</option>
              <option value="male">Erkek</option>
              <option value="other">Belirtmek istemiyorum</option>
            </select>
          </FormRow>
          <FormRow label="Hakkında" error={errorsInfo?.about?.message}>
            <textarea
              className="rounded-lg text-lg"
              cols="25"
              rows="10"
              id="about"
              placeholder={userMeta.about}
              disabled={statusInfo.pending}
              {...registerInfo("about", {
                maxLength: {
                  value: 500,
                  message: "Hakkında kısmı 500 kelimeden fazla olamaz",
                },
              })}
            />
          </FormRow>
          <Button
            btnName="Bilgileri Güncelle"
            type="primary"
            size="regular"
            disabled={status.pending}
          />
        </Form>
      </div>
      <div>
        <h2 className="text-xl">Profil fotoğrafını değiştir</h2>
        <Form onSubmit={handleSubmitAvatar(onUpdateAvatar)}>
          <FormRow label="Profil Fotoğrafı" error={errors?.avatar?.message}>
            <input type="file" id="avatar" {...registerAvatar("avatar")} />
          </FormRow>
          <Button
            btnName="Değiştir"
            type="primary"
            size="regular"
            disabled={statusUploadAvatar.pending}
          />
        </Form>
      </div>
      <div>
        <h2 className="text-xl">Şifreyi değiştir</h2>
        <Form onSubmit={handleSubmit(onUpdatePassword)}>
          <FormRow label="Yeni Şifre" error={errors?.password?.message}>
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
          <FormRow
            label="Şifre Tekrarı"
            error={errors?.passwordConfirm?.message}
          >
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
          <Button
            btnName="Şifreyi Güncelle"
            type="primary"
            size="regular"
            disabled={status.pending}
          />
        </Form>
      </div>
    </div>
  );
}

export default UserSettings;
