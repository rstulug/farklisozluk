import { usePosts } from "../features/dashboard/usePosts";
import { POST_PER_PAGE } from "../utils/constants";
import PaginationSidebar from "./PaginationSidebar";
import SidebarItem from "./SidebarItem";
import Spinner from "./Spinner";

function Sidebar() {
  const { posts, count, isLoading } = usePosts();
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center gap-4 align-middle font-bold">
      <ul className=" mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <SidebarItem key={post.id} post={post} />
        ))}
      </ul>
      {POST_PER_PAGE < count && (
        <div className="flex justify-end">
          <PaginationSidebar count={count} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
