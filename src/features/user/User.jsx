import UserComments from "./UserComments";
import Spinner from "../../ui/Spinner";
import { useUserData } from "./useUserData";
import Empty from "../../ui/Empty";

function User() {
  const { userData, isLoading } = useUserData();

  if (isLoading) return <Spinner />;

  if (!userData) return <Empty message="Böyle bir kullanıcı bulamadık" />;

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between border-b-2 border-b-gray-300 pb-4">
        <h3 className="text-3xl font-bold">{userData.username}</h3>
        <div className="h-20 w-20 rounded-full border-2 border-black">
          <img
            className="h-full w-full rounded-full"
            src={userData.avatar_path}
            alt="user profile picture"
          />
        </div>
      </div>

      <UserComments />
    </div>
  );
}

export default User;
