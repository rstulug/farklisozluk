import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import Spinner from "../ui/Spinner";

function Header() {
  const location = useLocation();
  const { logout, status } = useLogout();
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="mb-2 mt-2 flex items-center justify-between">
      <Link className="w-25 flex items-center" to={"/"}>
        <Logo />
        <h3>Farkli Sozluk</h3>
      </Link>

      <SearchBar />
      {user?.user_metadata?.username && !isLoading ? (
        <div className="font-xl flex flex-row items-center justify-center gap-2">
          <Link to={`/users/${user.user_metadata.usernameSlug}`}>
            {user?.user_metadata?.username}
          </Link>
          <Button
            btnName="Çıkış Yap"
            type="alternative"
            size="small"
            onClick={logout}
            disabled={status.pending}
          />
        </div>
      ) : location.pathname === "/login" ? (
        <div>
          <Button btnName="Kayıt Ol" type="green" size="small" to="/signup" />
        </div>
      ) : location.pathname === "/signup" ? (
        <div>
          <Button btnName="Giriş Yap" type="green" size="small" to="/login" />
        </div>
      ) : (
        <div>
          <Button btnName="Giriş Yap" type="green" size="small" to="/login" />
          <Button btnName="Kayıt Ol" type="green" size="small" to="/signup" />
        </div>
      )}
    </div>
  );
}

export default Header;
