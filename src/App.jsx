import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authService } from "./services/appwrite";
import { login, logout } from "./services/store/slice/authSlice";
import { Footer, Header } from "./layout";
import { Outlet } from "react-router-dom";

function App() {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      // .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="w-full min-h-[75vh] items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
