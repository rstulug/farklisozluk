import { usePosts } from "../features/dashboard/usePosts";
import SidebarItem from "./SidebarItem";
import Spinner from "./Spinner";

function Sidebar() {
  const { posts, isLoading } = usePosts();
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center gap-4 align-middle font-bold">
      <ul className=" mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <SidebarItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
