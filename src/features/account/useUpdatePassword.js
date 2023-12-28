import { useMutation } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const { mutate: updateUserPassword, status } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => toast.success("Şifre başarıyla güncellendi"),
    onError: (err) =>
      toast.error(`Şifre güncellenirken bir hata oluştu. Hata: ${err.message}`),
  });

  return { updateUserPassword, status };
}
