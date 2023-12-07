import { useUserComments } from "./useUserComments";
import Spinner from "../../ui/Spinner";
import CommentItem from "../../ui/CommentItem";
import Empty from "../../ui/Empty";

import { useUser } from "../authentication/useUser";
import { useUserCommentInfo } from "./useUserCommentInfo";

import { useUserData } from "./useUserData";

function UserComments() {
  const { userData, isLoadingUserData } = useUserData();

  const { userComments, isLoading } = useUserComments();

  const { user } = useUser();

  const { userCommentInfo, isLoading: isLoadingCommentInfo } =
    useUserCommentInfo({
      userId: user?.id,
      secondUserId: userData?.id,
      usernameSlug: userData?.usernameSlug,
    });

  if (isLoading || isLoadingCommentInfo || isLoadingUserData)
    return <Spinner />;

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
