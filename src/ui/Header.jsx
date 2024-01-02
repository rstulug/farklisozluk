import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import Spinner from "../ui/Spinner";
import DarkMode from "./DarkMode";
import { FaCog } from "react-icons/fa";
import { IconContext } from "react-icons";

function Header() {
  const { logout, status } = useLogout();
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="mb-2 mt-2 flex flex-col flex-wrap items-center justify-between sm:flex-row">
        <div className="flex flex-row items-center gap-1">
          <div>
            <Link className="flex w-1/6 items-center" to={"/"}>
              <Logo />
              <h3 className="whitespace-nowrap font-semibold">Farkli Sozluk</h3>
            </Link>
          </div>
          <div>
            <DarkMode />
          </div>
        </div>

        <SearchBar />
        {user?.user_metadata?.username && !isLoading ? (
          <div className="font-xl flex w-2/6 flex-row items-center justify-center gap-1">
            <Link
              to={`/users/${user.user_metadata.usernameSlug}`}
              className="font-italic text-md   hover:scale-105 hover:font-bold"
            >
              {user?.user_metadata?.username}
            </Link>
            <Button
              btnName="Yeni Başlık"
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
            {user && (
              <Link
                to={`/account/${user.user_metadata.usernameSlug}`}
                title="Ayarlara Git"
              >
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <FaCog />
                </IconContext.Provider>
              </Link>
            )}
          </div>
        ) : (
          <div>
            <Button btnName="Giriş Yap" type="green" size="small" to="/login" />
            <Button btnName="Kayıt Ol" type="green" size="small" to="/signup" />
          </div>
        )}
      </div>
      <div className="flex justify-center sm:hidden">
        <NavLink to={"/hot-topics"}>Gündem</NavLink>
      </div>
    </>
  );
}

export default Header;
