import { useUserComments } from "./useUserComments";
import Spinner from "../../ui/Spinner";

import CommentItem from "../../ui/CommentItem";

function User() {
  const { userComments, isLoading } = useUserComments();

  if (isLoading) return <Spinner />;

  return (
    <ul>
      {userComments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default User;
