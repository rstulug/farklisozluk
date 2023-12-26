import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import Spinner from "../ui/Spinner";

function Header() {
  const { logout, status } = useLogout();
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="mb-2 mt-2 flex flex-col flex-wrap items-center justify-between sm:flex-row">
      <Link className="flex w-1/6 items-center" to={"/"}>
        <Logo />
        <h3 className="whitespace-nowrap font-semibold">Farkli Sozluk</h3>
      </Link>

      <SearchBar />
      {user?.user_metadata?.username && !isLoading ? (
        <div className="font-xl flex w-2/6 flex-row items-center justify-center gap-2">
          <Link
            to={`/users/${user.user_metadata.usernameSlug}`}
            className="font-italic text-md   hover:scale-105 hover:font-bold"
          >
            {user?.user_metadata?.username}
          </Link>
          <Button
            btnName="Yeni Post oluştur"
            type="green"
            size="small"
            to={"/new-post/"}
          />
          <Button
            btnName="Çıkış Yap"
            type="alternative"
            size="small"
            onClick={logout}
            disabled={status.pending}
          />
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
