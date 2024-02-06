import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

const LogoutBtn = () => {
  const navigate = useNavigate()

    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout();
        dispatch(logout())
        navigate("/", { replace: true })
        // window.location.reload();
    }
  return (
    <button onClick={handleLogout}  className="inline-block px-4 py-2 text-rose-500 font-semibold duration-200 hover:text-rose-700 rounded-xl">Logout</button>
  )
}

export default LogoutBtn