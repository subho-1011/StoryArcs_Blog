import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    // TODO: Better understanding this for next time
    useEffect(() => {
        if (authStatus !== authentication && authentication) {
            navigate('/login');
        } else if (authStatus !== authentication && !authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, authentication, navigate])
  return (
    loader ? (
        <div className="w-full h-screen flex justify-center items-center">Loading....</div>
    ) : <>{children}</>
  )
}
