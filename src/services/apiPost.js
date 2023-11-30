import supabase from "./supabase";

export async function submitnewPost(newPost) {
  const { data, error } = await supabase.from("Post").insert(newPost).select();
  if (error) throw new Error("The new post submitting is failed");
  return data;
}

export async function getAllPost() {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .order("created_at");

  if (error) throw new Error("The posts data could not be loaded");

  return data;
}

export async function getPost(slug) {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("titleSlug", slug)
    .single();

  if (error) throw new Error("Post has not been uploaded correctly");

  return data;
}

export async function insertPost({ User, title, titleSlug, comment }) {
  const { data: newPost, error: error1 } = await supabase
    .from("Post")
    .insert({ User, title, titleSlug })
    .select()
    .single();

  if (error1) throw new Error(error1.message);

  const { data, error: error2 } = await supabase
    .from("Comment")
    .insert([{ User, Post: newPost.id, comment }])
    .select()
    .single();

  if (error2) throw new Error(error2.message);

  return newPost;
}
