import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { BsGrid } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import auth from "../../../Auth/Firebase/Firebase.config";
import useTitle from "../../../Hooks/useTitle";
import logo from "../../../Assets/logo.jpg";
import { InitializeContext } from "../../../App";
import Loading from "../../../Components/Loading/Loading";

const Dashboard = () => {
  const { handleThemeChange, theme } = useContext(InitializeContext);
  useTitle("Dashboard");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
      toast.success(`Thank you, ${user.displayName} to stay with us!`, {
        autoClose: 3000,
        position: "bottom-left",
      });
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-3 md:p-3">
        <div className="header z-50 sticky top-0 flex justify-between items-center bg-base-300 p-4 rounded">
          <label
            htmlFor="dashboard-sidebar"
            className="btn bg-base-300 text-black hover:text-white drawer-button lg:hidden "
          >
            <BsGrid className={theme ? "text-2xl text-white" : "text-2xl"} />
          </label>
          <Link
            to="/"
            className="text-xl lg:text-2xl md:text-2xl font-semibold"
          >
            <img src={logo} alt="" className="w-12 rounded-full"/>
          </Link>
          <div className="mr-[-3rem] lg:mr-[-84rem] pt-2 md:mr-[-18rem] flex justify-center items-center">
            <li className="list-none">
              <button
                onClick={handleThemeChange}
                className="rounded-full lg:mx-2 font-bold"
              >
                {theme ? (
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </button>
            </li>
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div
                style={{ display: "grid" }}
                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName}
                  />
                ) : (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName}
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-5 p-2 shadow-xl menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogOut}>
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
          <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
            <Link
              to="/"
              className="logo font-semibold text-center flex items-center flex-col gap-2"
            >
              <img src={logo} alt="" className="w-10 rounded-full"/>
              Settyl
            </Link>
            <div
              onClick={handleLogOut}
              className="badge badge-outline hover:badge cursor-pointer flex justify-center items-center gap-1 p-4 hover:p-4"
            >
              <FiLogOut />
              LogOut
            </div>
          </div>
          <li className="py-2 mt-4">
            <NavLink to="/dashboard" className="bg-secondary">
              Dashboard
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/dashboard/allEmployees">All Employees</NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/dashboard/addEmployees">Add Employees</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
