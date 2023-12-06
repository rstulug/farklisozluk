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

export async function getCommentInfo(userId, postId) {
  if (!userId || !postId) return null;

  const { data, error } = await supabase
    .from("CommentInfo")
    .select("id,Comment, status")
    .eq("User", userId)
    .eq("Post", postId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserCommentInfo(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("CommentInfo")
    .select("id,Comment, status")
    .eq("User", userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function insertCommentInfo(obj) {
  const { data, error } = await supabase
    .from("CommentInfo")
    .insert([obj])
    .select();
  if (error) throw new Error(error.message);

  return data;
}

export async function deleteCommentInfo(id) {
  const { error } = await supabase.from("CommentInfo").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
