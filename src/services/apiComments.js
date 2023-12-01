import supabase from "./supabase";

export async function getPostComments(slug) {
  const { data, error } = await supabase
    .from("Comment")
    .select("*,User(username, usernameSlug),Post!inner()")
    .eq("Post.titleSlug", slug)
    .order("created_at");

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserComments(slug) {
  const { data, error } = await supabase
    .from("Comment")
    .select("*,Post(title, titleSlug), User!inner(username, usernameSlug)")
    .eq("User.usernameSlug", slug)
    .order("created_at");

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCommentLikeNumber(id, obj) {
  const { data, error } = await supabase
    .from("Comment")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("The comments could not be updated");
  return data;
}

export async function insertComment(obj) {
  const { data, error } = await supabase.from("Comment").insert([obj]).select();
  if (error) throw new Error(error.message);

  return data;
}
