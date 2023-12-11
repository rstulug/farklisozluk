import { useUserComments } from "./useUserComments";
import Spinner from "../../ui/Spinner";
import CommentItem from "../../ui/CommentItem";
import Empty from "../../ui/Empty";

import { useUser } from "../authentication/useUser";
import { useUserCommentInfo } from "./useUserCommentInfo";

import { useUserData } from "./useUserData";
import Pagination from "../../ui/Pagination";
import { COMMENT_PER_PAGE } from "../../utils/constants";

function UserComments() {
  const { userData, isLoadingUserData } = useUserData();

  const { userComments, count, isLoading } = useUserComments();

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
    <>
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
      {COMMENT_PER_PAGE < count && (
        <div className="flex justify-end">
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

export default UserComments;
