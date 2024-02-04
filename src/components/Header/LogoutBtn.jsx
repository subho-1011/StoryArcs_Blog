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
    }
  return (
    <button onClick={handleLogout}  className="inline-block px-4 py-2 text-white duration-200 hover:bg-blue-200 rounded-full">Logout</button>
  )
}

export default LogoutBtn