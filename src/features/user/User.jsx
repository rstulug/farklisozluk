import { useUserData } from "./useUserData";
import Spinner from "../../ui/Spinner";

function User() {
  const { userComments, isLoading } = useUserData();

  if (isLoading) return <Spinner />;
  console.log(userComments);
  return <div></div>;
}

export default User;
