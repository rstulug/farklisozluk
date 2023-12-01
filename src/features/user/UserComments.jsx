import { useUserComments } from "./useUserComments";
import Spinner from "../../ui/Spinner";
import CommentItem from "../../ui/CommentItem";
import Empty from "../../ui/Empty";

function UserComments() {
  const { userComments, isLoading } = useUserComments();
  console.log(userComments);

  if (isLoading) return <Spinner />;

  if (userComments.length === 0)
    return <Empty message="Bu kullanıcının henüz bir yorumu bulunmuyor" />;

  console.log(userComments);
  return (
    <ul>
      {userComments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default UserComments;
