import supabase from "./supabase";

export async function getFollower({ userId }) {
  const { data, error } = await supabase
    .from("Follow")
    .select("User(*)")
    .eq("Follower", userId);

  if (error)
    throw new Error(
      `Takipçi bilgilerine ulaşılamadı. Muhtemel neden: ${error.message}`,
    );

  return data;
}

export async function getFollowing({ userId }) {
  const { data, error } = await supabase
    .from("Follow")
    .select("Follower(*)")
    .eq("User", userId);

  if (error)
    throw new Error(
      `Takipçi bilgilerine ulaşılamadı. Muhtemel neden: ${error.message}`,
    );

  return data;
}
