import CommentItem from "../../ui/CommentItem";
import EmptyComment from "../../ui/EmptyComment";

import Spinner from "../../ui/Spinner";
import { useCommentStats } from "./useCommentStats";

function Dashboard() {
  const { data, isLoading } = useCommentStats();

  const headers = [
    "Tüm zamanların en beğenilen yorumu",
    "Tüm zamanların en beğenilmeyen yorumu",
    "Dünün en beğenilen Yorumu",
    "Dünün en beğenilmeyen yorumu",
    "deneme olacak bu ",
    "ikinci denemeyi buraya koyuyorum",
    "ikinci denemeyi buraya koyuyorum",
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className="ml-4 mt-2">
      {headers.map((head, i) => (
        <>
          <h3 className="font-italix mb-2 border-b-2 border-b-gray-400 py-2 text-xl font-bold text-gray-400">
            {head}
          </h3>
          {data[i] ? (
            <CommentItem comment={data[i]} />
          ) : (
            <EmptyComment message="Yok böyle bir şey" />
          )}
        </>
      ))}
    </div>
  );
}

export default Dashboard;
