import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

const LogoutBtn = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout().then(() => dispatch(logout()))
    }
  return (
    <button onClick={handleLogout} className="inline-block px-4 py-2 text-white duration-200 hover:bg-blue-200 rounded-full">Logout</button>
  )
}

export default LogoutBtn