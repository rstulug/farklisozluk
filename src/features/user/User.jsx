import UserComments from "./UserComments";
import Spinner from "../../ui/Spinner";
import { useUserData } from "./useUserData";
import Empty from "../../ui/Empty";

function User() {
  const { userData, isLoading } = useUserData();

  if (isLoading) return <Spinner />;

  console.log(userData);

  if (!userData) return <Empty message="Böyle bir kullanıcı bulamadık" />;

  return (
    <div>
      <UserComments />
    </div>
  );
}

export default User;
