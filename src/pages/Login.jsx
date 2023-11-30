import { useNavigate } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

function Login() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user && !isLoading) navigate("/");
    },
    [user, navigate, isLoading],
  );

  if (isLoading) return <Spinner />;

  if (!user) return <LoginForm />;
}

export default Login;
