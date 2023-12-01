import { Link } from "react-router-dom";

function UserComment({ comment }) {
  console.log(comment);
  return (
    <div className="flex flex-col gap-5">
      <Link
        to={`/posts/${comment.Post.titleSlug}`}
        className="text-xl font-bold"
      >
        {comment.Post.title}{" "}
      </Link>
      <div>{comment.comment}</div>
    </div>
  );
}

export default UserComment;
