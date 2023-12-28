import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar as updateAvatarApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate: updateAvatar, status: statusUpdateAvatar } = useMutation({
    mutationFn: updateAvatarApi,
    onSuccess: () => {
      toast.success("Profil fotoğrafı başarıyla değiştirildi");
      queryClient.invalidateQueries(["user", params.usernameSlug]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) =>
      toast.error(
        `Profil fotoğrafı yüklenirken bir hata oluştu. Hata: ${err.message}`,
      ),
  });

  return { updateAvatar, statusUpdateAvatar };
}
