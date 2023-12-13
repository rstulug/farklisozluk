import UserComments from "./UserComments";
import Spinner from "../../ui/Spinner";
import { useUserData } from "./useUserData";
import Empty from "../../ui/Empty";

function User() {
  const { userData, isLoading } = useUserData();
  console.log(userData);

  if (isLoading) return <Spinner />;

  if (!userData) return <Empty message="Böyle bir kullanıcı bulamadık" />;

  return (
    <div>
      <div>
        <div className="mb-4 flex border-b-2 border-b-gray-300 pb-4">
          <h3 className="text-3xl font-bold">{userData.username}</h3>
        </div>
      </div>
      <UserComments />
    </div>
  );
}

export default User;
