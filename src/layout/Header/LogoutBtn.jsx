import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../services/appwrite/auth";
import { logout } from "../../services/store/slice/authSlice";
import { HiOutlineLogout } from "react-icons/hi";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate("/", { replace: true });
    // window.location.reload();
  };
  return (
    <button
      onClick={handleLogout}
      className="inline-block px-4 py-2 text-rose-500 font-semibold duration-200 hover:text-rose-700 rounded-xl"
    >
      <HiOutlineLogout size={25} />
    </button>
  );
};

export default LogoutBtn;
