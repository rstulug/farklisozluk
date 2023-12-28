import { NavLink } from "react-router-dom";

function SidebarItem({ post }) {
  return (
    <NavLink
      to={`/posts/${post.titleSlug}`}
      className={({ isActive }) =>
        isActive
          ? "ml-2 mr-2  items-center rounded-xl bg-green-200 px-2 py-1 dark:bg-slate-500"
          : "ml-2  items-center hover:mr-2 hover:rounded-lg hover:bg-sky-200 hover:px-2 hover:py-1 dark:hover:bg-slate-500"
      }
    >
      {post.title}
    </NavLink>
  );
}

export default SidebarItem;
