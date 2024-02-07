import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-transparent py-3 shadow bg-gray-100 border-b border-gray-300 dark:bg-gray-800 dark:text-slate-100">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block mx-2 px-4 py-2 font-semibold text-gray-900 dark:text-slate-200 duration-200 hover:dark:text-slate-400 rounded-xl"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          <ThemeBtn />
            {authStatus ? <LogoutBtn /> : null}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
