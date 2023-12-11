import supabase from "./supabase";
import { COMMENT_PER_PAGE } from "../utils/constants";

export async function getPostComments({ postSlug, curPage }) {
  const from = (curPage - 1) * COMMENT_PER_PAGE;
  const to = from + COMMENT_PER_PAGE - 1;
  const { data, count, error } = await supabase
    .from("Comment")
    .select("*,User(username, usernameSlug),Post!inner(id, titleSlug)", {
      count: "exact",
    })
    .eq("Post.titleSlug", postSlug)
    .order("created_at")
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function getUserComments({ usernameSlug, curPage }) {
  const from = (curPage - 1) * COMMENT_PER_PAGE;
  const to = from + COMMENT_PER_PAGE - 1;

  const { data, count, error } = await supabase
    .from("Comment")
    .select(
      "*,Post(id, title, titleSlug), User!inner(id,username, usernameSlug)",
      { count: "exact" },
    )
    .eq("User.usernameSlug", usernameSlug)
    .order("created_at")
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data, count };
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

export async function getPostCommentInfo({ userId, postId }) {
  if (!userId || !postId) return null;

  const { data, error } = await supabase
    .from("CommentInfo")
    .select("*, Post(*), Comment")
    .eq("User", userId)
    .eq("Post", postId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserCommentInfo({ userId, secondUserId }) {
  if (!userId || !secondUserId) return null;

  const { data, error } = await supabase
    .from("CommentInfo")
    .select("*, Post(*), Comment!inner()")
    .eq("User", userId)
    .eq("Comment.User", secondUserId);

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
