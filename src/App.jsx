import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"


function App() {
  // console.log(import.meta.env.VITE_APPWRITE_ENDPOINT)

  const [loading, setLoading] = useState(true)
  const dispatch =  useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="w-full min-h-[75vh] flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
