import supabase from "./supabase";

export async function Signup({
  email,
  password,
  username,
  name,
  surname,
  usernameSlug,
  gender,
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

  const { data, error2 } = await supabase
    .from("UserMeta")
    .insert([
      { id: newUser.user.id, username, usernameSlug, name, surname, gender },
    ])
    .select();

  if (error2)
    throw new Error(
      `The new user could not be created. The reason is ${error2.message}`,
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

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function getUserData(id) {
  const { data, error } = await supabase
    .from("UserMeta")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
