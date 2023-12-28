import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar as uploadAvatarApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate: uploadAvatar, status: statusUploadAvatar } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: () => {
      toast.success("Profil fotoğrafı başarıyla değiştirildi");
      queryClient.invalidateQueries(["user", params.usernameSlug]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("Profil fotoğrafı yüklenirken bir hata oluştu"),
  });

  return { uploadAvatar, statusUploadAvatar };
}
