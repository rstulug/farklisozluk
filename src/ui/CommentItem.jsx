import { useState } from "react";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { format, parseISO } from "date-fns";
import { useUpdateCommentsUnlike } from "../features/post/useUpdateCommentLike";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { useDeleteCommentInfo } from "../features/post/useDeleteCommentInfo";
import { useInsertCommentInfo } from "../features/post/useInsertCommentInfo";
import { useUser } from "../features/authentication/useUser";
import { MAX_COMMENT_WORD } from "../utils/constants";
import ModalUI from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import ToggleMenus from "./ToggleMenus";

function CommentItem({ comment, likeStatus, disabled = false }) {
  const [expandBox, setExpandBox] = useState(false);
  const commentLength = comment.comment.length;

  const text = expandBox
    ? comment.comment
    : comment.comment.slice(0, MAX_COMMENT_WORD);

  const { user, isAuthenticated } = useUser();

  const { updateNumLike } = useUpdateCommentsUnlike();
  const { deleteCommentInfo, status } = useDeleteCommentInfo();
  const { insertCommentInfo, insertStatus } = useInsertCommentInfo();

  function handleExpandClick() {
    setExpandBox((box) => !box);
  }

  function handleUpdateLike(obj, id) {
    deleteCommentInfo(id);
    updateNumLike({ id: comment.id, obj });
  }

  function handleInsertLike(obj, userId, postId, commentId, status) {
    insertCommentInfo({
      User: userId,
      Post: postId,
      Comment: commentId,
      status: status,
    });
    updateNumLike({ id: comment.id, obj });
  }

  return (
    <li className="mb-5 list-none">
      {comment?.Post?.titleSlug && (
        <Link
          to={`/posts/${comment.Post.titleSlug}`}
          className="text-xl font-bold"
        >
          {comment.Post.title}
        </Link>
      )}
      <div className="flex flex-col">
        <div className="mb-2 mt-4">
          <div className="text-justify">{parse(text)}</div>
          {commentLength > MAX_COMMENT_WORD && (
            <button
              onClick={handleExpandClick}
              className="ml-2 font-light hover:text-gray-500"
            >
              {expandBox ? "daha az göster" : "...devamını oku"}
            </button>
          )}
        </div>
        <div className="flex flex-col ">
          <div className="mb-1 flex w-full flex-row justify-between">
            <div className="flex flex-row gap-4">
              <button
                title="begenmedim"
                className="flex  h-7 items-center justify-center"
                disabled={
                  !isAuthenticated ||
                  likeStatus?.status === 1 ||
                  status.pending ||
                  insertStatus.pending ||
                  disabled
                }
                onClick={() => {
                  likeStatus?.status === -1
                    ? handleUpdateLike(
                        { numUnlike: comment.numUnlike - 1 },
                        likeStatus.id,
                      )
                    : handleInsertLike(
                        { numUnlike: comment.numUnlike + 1 },
                        user?.id,
                        comment?.Post?.id,
                        comment?.id,
                        -1,
                      );
                }}
              >
                <IconContext.Provider
                  value={{
                    color: likeStatus?.status === -1 ? "red" : "black",
                  }}
                >
                  <HiArrowSmallDown />
                  {comment.numUnlike}
                </IconContext.Provider>
              </button>
              <button
                title="begendim bunu"
                className="flex h-7 items-center justify-center"
                disabled={
                  !isAuthenticated ||
                  likeStatus?.status === -1 ||
                  status.pending ||
                  insertStatus.pending ||
                  disabled
                }
                onClick={() => {
                  likeStatus?.status === 1
                    ? handleUpdateLike(
                        { numLike: comment.numLike - 1 },
                        likeStatus.id,
                      )
                    : handleInsertLike(
                        { numLike: comment.numLike + 1 },
                        user?.id,
                        comment?.Post?.id,
                        comment?.id,
                        1,
                      );
                }}
              >
                <IconContext.Provider
                  value={{
                    color: likeStatus?.status === 1 ? "green" : "black",
                  }}
                >
                  <HiArrowSmallUp />
                  {comment.numLike}
                </IconContext.Provider>
              </button>
            </div>

            <div>
              <ToggleMenus>
                <ToggleMenus.Toggle id={comment.id} />
                <ToggleMenus.List id={comment.id}>
                  {user && comment.User.id === user.id && (
                    <ToggleMenus.ListItem>
                      <ModalUI btnName="yorumu sil">
                        <ConfirmDelete id={comment?.id} />
                      </ModalUI>
                    </ToggleMenus.ListItem>
                  )}
                  <ToggleMenus.ListItem>şikayet et</ToggleMenus.ListItem>
                  {user && comment.User.id !== user.id && (
                    <ToggleMenus.ListItem>mesaj gönder</ToggleMenus.ListItem>
                  )}
                </ToggleMenus.List>
              </ToggleMenus>
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              to={`/users/${comment.User.usernameSlug}`}
              className="px-2 py-1 hover:scale-105 hover:rounded-lg hover:bg-gray-200 "
            >
              <div className="flex flex-row gap-3">
                <div className="flex flex-col justify-center text-center">
                  <span className="text-green-700">
                    {comment.User.username}
                  </span>
                  <p className="text-italic text-xs">
                    {format(parseISO(comment.created_at), "dd-MM-yyyy HH:mm")}
                  </p>
                </div>
                <div>image</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
