import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../../services/store/slice/authSlice";
import authService from "../../../services/appwrite/auth";
import { Button, Input, Logo } from "../../../components";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data); // send email & password
      if (session) {
        const userData = await authService.getCurrentUser(); // get login userdata
        if (userData) {
          dispatch(authLogin(userData)); // store userData
          navigate("/"); // return home page
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-transparent p-6 md:min-w-96">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="flex justify-center mb-2">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-md text-center font-bold mb-4">
          Sign in to your account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          {" "}
          Don`t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-500 mb-8"> {error}</p>}
        <form action="" onSubmit={handleSubmit(login)} className="space-y-4">
          <div className="py-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              autoComplete="off"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
              autoComplete="off"
            />
          </div>
          <Button type="submit" text={"Sign in"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
