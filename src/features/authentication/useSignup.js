import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Signup as SignupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, status } = useMutation({
    mutationFn: SignupApi,
    onError: (err) =>
      toast.error(`Kayıt tamamlanamadı. Muhtemel hata: ${err.message}`),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/");
    },
  });

  return { signUp, status };
}
