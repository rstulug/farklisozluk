import Dashboard from "../features/dashboard/Dashboard";
import { usePosts } from "../features/dashboard/usePosts";
import PaginationSidebar from "../ui/PaginationSidebar";
import Spinner from "../ui/Spinner";
import TitleItem from "../ui/TitleItem";
import { POST_PER_PAGE } from "../utils/constants";

function Topics() {
  const { posts, count, isLoading } = usePosts();
  console.log(posts);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className=" mx-8 flex  flex-col justify-center gap-3 sm:hidden">
        <h3 className="mb-2 text-lg font-semibold">Güncel konular </h3>
        {posts.map((post) => (
          <TitleItem post={post} key={post.id} />
        ))}
        {POST_PER_PAGE < count && (
          <div className="flex justify-end">
            <PaginationSidebar count={count} />
          </div>
        )}
      </div>
      <div className="hidden sm:flex">
        <Dashboard />
      </div>
    </>
  );
}

export default Topics;
