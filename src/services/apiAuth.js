import supabase from "./supabase";

export async function Signup({
  email,
  password,
  username,
  name,
  surname,
  usernameSlug,
  avatar_path,
  gender,
  imageName,
  imageFile,
}) {
  const { data: newUser, error1 } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        usernameSlug,
      },
    },
  });
  if (error1)
    throw new Error(
      `The new user could not be created. The reason is ${error1.message}`,
    );

  const { error2 } = await supabase
    .from("UserMeta")
    .insert([
      {
        id: newUser.user.id,
        username,
        usernameSlug,
        name,
        surname,
        gender,
        avatar_path,
      },
    ])
    .select();

  if (error2)
    throw new Error(
      `The new user could not be created. The reason is ${error2.message}`,
    );

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(imageName, imageFile);

  if (avatarError)
    throw new Error(
      `Profil fotoğrafı yüklenirken bir hata oluştu. Muhtemel neden: ${avatarError.message} `,
    );

  return newUser;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error)
    throw new Error(
      `The login is unsuccessfull. The reason is ${error.message}`,
    );

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error1 } = await supabase.auth.getUser();

  if (error1) throw new Error(error1.message);

  const { data: UserMeta, error2 } = await supabase
    .from("UserMeta")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (error2) throw new Error(error2.message);

  return { UserMeta, user };
}

export async function getUserData(slug) {
  const { data, error } = await supabase
    .from("UserMeta")
    .select("*")
    .eq("usernameSlug", slug)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateUserPassword({ email, password }) {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });

  if (error)
    throw new Error(
      `Şifre güncelleme işlemi başarısız. Muhtemel neden: ${error.message}`,
    );

  return data;
}

export async function updateUserInfo({ userId, obj }) {
  const { data, error } = await supabase
    .from("UserMeta")
    .update(obj)
    .eq("id", userId)
    .select();

  if (error)
    throw new Error(
      `Kullanıcı bilgileri güncelleme işlemi başarısız oldu. Muhtemel neden: ${error.message}`,
    );

  return data;
}

export async function uploadAvatar({
  imageName,
  imageFile,
  avatar_path,
  userId,
  oldImageName,
}) {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(imageName, imageFile);

  if (error)
    throw new Error(`Profil fotoğrafı yüklenemedi. Hata:${error.message}`);

  const { error: errorUser } = await supabase
    .from("UserMeta")
    .update({ avatar_path: avatar_path })
    .eq("id", userId);

  if (errorUser) {
    throw new Error("Yüklenen resim kullanıcıya atanırken bir hata oluştu");
  }
  if (oldImageName) {
    const { error: errorOldImage } = await supabase.storage
      .from("avatars")
      .remove([oldImageName]);

    if (errorOldImage)
      throw new Error("Eski profil fotoğrafı silinirken bir hata oluştu");
  }
  return data;
}
