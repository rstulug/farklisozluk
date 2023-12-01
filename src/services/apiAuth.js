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
