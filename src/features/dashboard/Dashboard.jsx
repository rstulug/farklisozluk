import Spinner from "../../ui/Spinner";
import { usePosts } from "./usePosts";

function Dashboard() {
  const { posts, isLoading } = usePosts();
  //console.log(posts);

  if (isLoading) return <Spinner />;
  return <div></div>;
}

export default Dashboard;
