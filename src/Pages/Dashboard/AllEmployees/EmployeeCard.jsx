import React from "react";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";

export default function EmployeeCard({ employee, refetch }) {
  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`${BASE_API}/api/v1/employees/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              toast.success(`${employee?.employee_name} has been deleted.`, {
                autoClose: 5000,
                pauseOnHover: true,
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div className="card w-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="avatar flex justify-center">
          {employee?.profile_image ? (
            <div className="mask mask-squircle my-8">
              <img src={employee?.profile_image} alt="profile" />
            </div>
          ) : (
            <div className="mask mask-squircle w-32 my-8">
              <img
                src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                alt="profile"
                className=""
              />
            </div>
          )}
        </div>
        <h2 className="card-title">{employee?.employee_name}</h2>
        <p>Salary: {employee?.employee_salary}</p>
        <p>Age: {employee?.employee_age}</p>
        <p>Gender: {employee?.gender}</p>
        <div className="card-actions flex justify-center mt-2">
          <div
            className="btn btn-sm"
            onClick={() => handleDelete(employee._id)}
          >
            <FiDelete className="text-lg text-white" />
          </div>
          <div className="btn btn-sm">
            <AiOutlineEdit className="text-xl text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
