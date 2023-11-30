import { useNavigate } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

function Signup() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user && !isLoading) navigate("/");
    },
    [user, navigate, isLoading],
  );

  if (isLoading) return <Spinner />;

  if (!user) return <SignupForm />;
}

export default Signup;
