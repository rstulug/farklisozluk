import UserSettings from "../features/account/UserSettings";
import ProtectedRoute from "../ui/ProtectedRoute";

function Account() {
  return (
    <ProtectedRoute>
      <UserSettings />;
    </ProtectedRoute>
  );
}

export default Account;
