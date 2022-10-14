import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";
import auth from "../../Auth/Firebase/Firebase.config";
import useTitle from "../../Hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
    toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
      autoClose: 4000,
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-base-100 h-screen py-36 lg:py-48">
      <div className="flex h-96 justify-center items-center px-4 lg:px-12">
        <div className="card w-full max-w-md bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-4xl font-bold pb-6">Login</h2>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline border-primary flex items-center justify-center rounded-full hover:btn-primary"
            >
              <FcGoogle className="text-2xl mr-2"></FcGoogle>Continue with
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
