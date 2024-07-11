import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import { loginUserAsync } from "../redux/AuthSlice";
import { loginUser } from "../axios/apiServers";


function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { is_authenticated, is_admin, is_student, is_teacher } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (is_admin) {
        navigate("/admin-dashboard");
      } else if (is_teacher) {
        navigate("/teacher-dashboard");
      } else if (is_student) {
        navigate("/student-dashboard");
      } else {
          toast.error(resultAction.payload || "Login Credentials does not match!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-20"
      style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
    >
      {is_authenticated && is_admin && <Navigate to="/admin-dashboard" />}
      {is_authenticated && is_teacher && <Navigate to="/teacher-dashboard" />}
      {is_authenticated && is_student && <Navigate to="/student-dashboard" />}
      <div className="container mx-auto">
        <Toaster position="top-center" richColors />
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2  py-16 px-12">
            <h2 className="text-3xl mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className=" mt-5">
                <input
                  type="email"
                  name="email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className=" mt-5">
                <input
                  type="password"
                  name="password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mt-5">
                <span> New User? Register Now </span>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-purple-500 py-3 text-center text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url("kids.avif")' }}
          >
            <h1 className="text-white text-3xl font-bold mb-3">Welcome</h1>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
