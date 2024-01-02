import { Link } from "react-router-dom";

function TitleItem({ post }) {
  return (
    <Link
      to={`/posts/${post.titleSlug}`}
      className=" bg-green-200 px-2 py-1 font-semibold dark:bg-slate-500"
    >
      {post.title}
    </Link>
  );
}

export default TitleItem;
