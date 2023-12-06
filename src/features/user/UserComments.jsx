import { useUserComments } from "./useUserComments";
import Spinner from "../../ui/Spinner";
import CommentItem from "../../ui/CommentItem";
import Empty from "../../ui/Empty";
import { useUserCommentInfo } from "./useUserCommentInfo";

function UserComments() {
  const { userComments, isLoading } = useUserComments();

  const { userCommentInfo, isLoading: isLoadingUserCommentInfo } =
    useUserCommentInfo();

  if (isLoading || isLoadingUserCommentInfo) return <Spinner />;

  if (userComments.length === 0)
    return <Empty message="Bu kullanıcının henüz bir yorumu bulunmuyor" />;

  return (
    <ul>
      {userComments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          likeStatus={userCommentInfo?.find(
            (comInfo) => comInfo.Comment === comment.id,
          )}
        />
      ))}
    </ul>
  );
}

export default UserComments;
