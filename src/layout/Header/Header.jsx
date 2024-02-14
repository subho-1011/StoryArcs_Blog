import { Link } from "react-router-dom";
import { Logo } from "../../components";
import { Container } from "../../layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";
import LogoutBtn from "./LogoutBtn";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    // {
    //   name: "Login",
    //   slug: "/login",
    //   active: !authStatus,
    // },
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   active: !authStatus,
    // },
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

  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 z-10 py-3 shadow bg-white border-b border-gray-300 dark:bg-gray-800 dark:text-slate-100">
      <Container className="flex items-center justify-between">
        <div className="md:hidden">
          <button
            className="relative z-50"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <IoMdClose
                size={30}
                className="z-40"
                style={{ color: "white" }}
              />
            ) : (
              <IoMdMenu size={30} />
            )}
          </button>
          {open && (
            <div className="absolute top-0 left-0 w-full h-screen bg-slate-800 text-slate-200 flex flex-col items-center justify-center gap-8 text-4xl z-20">
              {navItems.map((item) => (
                <div className="" key={item.name}>
                  <button
                    onClick={() => {
                      setOpen((prev) => !prev);
                      navigate(item.slug);
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* LOGO */}
        <div className="xl:w-1/3 flex text-center md:text-left">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        {/* Navlink */}
        <div className="xl:w-1/3 hidden md:flex items-center justify-center">
          <div className="flex">
            {navItems.map((item) =>
              item.active ? (
                <div key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block mx-2 px-4 py-2 font-semibold text-gray-900 dark:text-slate-200 duration-200 hover:dark:text-slate-400 rounded-xl"
                  >
                    {item.name}
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
        {/* theme && login */}
        <div className="xl:w-1/3 flex justify-end">
          <ThemeBtn />
          {authStatus ? (
            <LogoutBtn />
          ) : (
            <Link to="/login">
              <button className="inline-block mx-2 px-4 py-2 font-semibold text-gray-900 dark:text-slate-200 duration-200 hover:dark:text-slate-400 rounded-xl">
                <HiOutlineLogin size={25} />
              </button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
