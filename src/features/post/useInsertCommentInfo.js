import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCommentInfo as insertCommentInfoApi } from "../../services/apiComments";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useInsertCommentInfo() {
  const params = useParams();
  const { user } = useUser();

  const updateField = params?.postSlug || params?.usernameSlug;

  const queryClient = useQueryClient();

  const { mutate: insertCommentInfo, status: insertStatus } = useMutation({
    mutationFn: (obj) => insertCommentInfoApi(obj),
    onSuccess: () =>
      queryClient.invalidateQueries(["commentInfo", user.id, updateField]),
    onError: (err) => toast.error(err.message),
  });

  return { insertCommentInfo, insertStatus };
}
