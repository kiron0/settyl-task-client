import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";

export default function EmployeeCard({ employee, refetch }) {
  const {
    employee_name,
    employee_salary,
    employee_age,
    profile_image,
    gender,
    _id,
  } = employee;
  const [editData, setEditData] = useState({});

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
        fetch(`${BASE_API}/employees/${id}`, {
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

  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeAge, setEmployeeAge] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");

  // console.log(employeeName, employeeSalary, employeeAge, employeeImage);

  const handleUpdateData = async (e) => {
    e.preventDefault();

    const updatedData = {
      employee_name: employeeName || editData?.employee_name,
      employee_salary: Number(employeeSalary) || editData?.employee_salary,
      employee_age: Number(employeeAge) || editData?.employee_age,
      profile_image: employeeImage || editData?.profile_image,
    };

    await fetch(`${BASE_API}/employees/${editData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          refetch();
          toast.success(
            `${editData?.employee_name} updated successfully`
          );
          setEditData(null);
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
        <p>Salary: {employee?.employee_salary} $/year</p>
        <p>Age: {employee?.employee_age}</p>
        <p>Gender: {employee?.gender}</p>
        {employee?.createdAt && (
          <div className="card-actions justify-end mt-2">
            Added On -{" "}
            <div className="badge badge-outline badge-neutral">
              {employee?.createdAt}
            </div>
          </div>
        )}
        {employee?.creator?.name && (
          <div className="card-actions justify-end my-2">
            Added by -{" "}
            <div className="badge badge-outline badge-neutral">
              {employee?.creator?.name}
            </div>
          </div>
        )}
        <div className="card-actions flex justify-center mt-2">
          <div
            className="btn btn-sm"
            onClick={() => handleDelete(employee._id)}
          >
            <FiDelete className="text-lg text-white" />
          </div>
          <label
            className="btn btn-sm"
            for="editEmployee"
            onClick={() =>
              setEditData({
                _id,
                employee_name,
                employee_salary,
                employee_age,
                profile_image,
                gender,
              })
            }
          >
            <AiOutlineEdit className="text-xl text-white" />
          </label>
        </div>
      </div>
      {editData && (
        <>
          <input type="checkbox" id="editEmployee" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
              <label
                htmlFor="editEmployee"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">{editData?.productName}</h3>
              <p>Update Employee data from here</p>
              <form onSubmit={handleUpdateData} className="my-2">
                <div className="my-4">
                  <label htmlFor="stock">Update Employee Name</label>
                  <input
                    type="text"
                    placeholder="Put Employee Name"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    defaultValue={editData?.employee_name}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label htmlFor="stock">Update Employee Salary</label>
                  <input
                    type="number"
                    placeholder="Put Employee Salary"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    defaultValue={editData?.employee_salary}
                    onChange={(e) => setEmployeeSalary(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label htmlFor="stock">Update Employee Age</label>
                  <input
                    type="number"
                    placeholder="Put Employee Age"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    defaultValue={editData?.employee_age}
                    onChange={(e) => setEmployeeAge(e.target.value)}
                  />
                </div>
                {/* <div className="my-4">
                  <label htmlFor="stock">Update Employee Gender</label>
                  <select className="select select-bordered w-full my-3">
                    <option>{editData?.gender}</option>
                  </select>
                </div> */}
                <div className="my-4">
                  <label htmlFor="stock">Update Employee Profile Image</label>
                  <input
                    type="text"
                    placeholder="Put Employee Profile Image"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    defaultValue={editData?.profile_image}
                    onChange={(e) => setEmployeeImage(e.target.value)}
                  />
                </div>
                <div className="text-right">
                  <button className="btn text-white">Update Data</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
