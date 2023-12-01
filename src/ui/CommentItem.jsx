import { useState } from "react";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { format, parseISO } from "date-fns";
import { useUpdateCommentsUnlike } from "../features/post/useUpdateCommentLike";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const max_word = 300;

function CommentItem({ comment }) {
  console.log(comment);
  const [expandBox, setExpandBox] = useState(false);
  const commentLength = comment.comment.length;

  const text = expandBox ? comment.comment : comment.comment.slice(0, max_word);

  const { updateNumLike } = useUpdateCommentsUnlike();

  function handleExpandClick() {
    setExpandBox((box) => !box);
  }

  function handleUnlikeClick() {
    const obj = { numUnlike: comment.numUnlike + 1 };
    updateNumLike({ id: comment.id, obj });
  }

  function handleLikeClick() {
    const obj = { numLike: comment.numLike + 1 };
    updateNumLike({ id: comment.id, obj });
  }
  console.log(comment);

  return (
    <li className="mb-5">
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
          <p className="text-justify">{parse(text)}</p>
          {commentLength > max_word && (
            <button
              onClick={handleExpandClick}
              className="ml-2 font-light hover:text-gray-500"
            >
              {expandBox ? "daha az göster" : "...devamını oku"}
            </button>
          )}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-5">
            <button
              title="begenmedim"
              className="flex items-center justify-center hover:scale-125 hover:rounded-full hover:bg-green-100"
              onClick={handleUnlikeClick}
            >
              <HiArrowSmallDown />
              {comment.numUnlike}
            </button>
            <button
              title="begendim bunu"
              className="flex items-center justify-center hover:scale-125 hover:rounded-full hover:bg-green-100"
              onClick={handleLikeClick}
            >
              <HiArrowSmallUp />
              {comment.numLike}
            </button>
          </div>
          <Link
            to={`/users/${comment.User.usernameSlug}`}
            className="px-2 py-2 hover:scale-105 hover:rounded-lg hover:bg-gray-200 "
          >
            <div className="flex flex-row gap-3">
              <div className="flex flex-col justify-center text-center">
                <span className="text-green-700">{comment.User.username}</span>
                <p className="text-italic text-xs">
                  {format(parseISO(comment.created_at), "dd-MM-yyyy HH:mm")}
                </p>
              </div>
              <div>image</div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
