import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useTitle from "../../../Hooks/useTitle";
import auth from "../../../Auth/Firebase/Firebase.config";
import { BASE_API } from "../../../config";

export default function AddEmployees() {
  useTitle("Add Employees");
  const upload_api_key = `e1a6a4f77bc884f9b46b0d06d86c05e5`;
  const [isFile, setIsFile] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState("false");
  const onSubmit = (data) => {
    setLoading(false);
    if (!isFile) {
      const url = `https://api.imgbb.com/1/upload?key=${upload_api_key}`;

      const formData = new FormData();
      const image = data.employeeImage[0];
      formData.append("image", image);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.success) {
            saveProductOnMongodb(result?.data?.url, data);
            setLoading(true);
          }
        });
    } else {
      const inputURL = data.imageUrl;
      saveProductOnMongodb(inputURL, data);
      setLoading(true);
    }
  };

  const saveProductOnMongodb = async (image, data) => {
    const productData = {
      employee_name: data?.employeeName,
      employee_salary: Number(data?.employeeSalary),
      employee_age: Number(data?.employeeAge),
      gender: data?.employeeGender,
      profile_image: image,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      creator: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
      },
    };

    await fetch(`${BASE_API}/employees`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.insertedId) {
          toast.success("Employee Added Successfully");
          reset();
        }
      });
  };
  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold mb-2 px-5 md:px-10">Add Employees</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="shadow-lg rounded-2xl bg-base-100 p-5 md:p-10 w-100 lg:w-1/2"
      >
        <div className="my-2">
          <label htmlFor="name" className="my-2">
            Employee Name
          </label>
          <input
            type="text"
            placeholder="Employee Name"
            className="input input-bordered w-full"
            {...register("employeeName", { required: true })}
          />
          {errors.employeeName?.type === "required" && (
            <span className="text-error">Employee Name is required</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <div className="my-2 w-full">
            <label htmlFor="availableProduct" className="my-2">
              Employee Salary
            </label>
            <input
              type="number"
              placeholder="Employee Salary"
              className="input input-bordered w-full"
              {...register("employeeSalary", { required: true })}
            />
            {errors.employeeSalary?.type === "required" && (
              <span className="text-error">Employee Salary is required</span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="name" className="my-2">
              Employee Age
            </label>
            <input
              type="number"
              placeholder="Employee Age"
              className="input input-bordered w-full"
              {...register("employeeAge", { required: true })}
            />
            {errors.employeeAge?.type === "required" && (
              <span className="text-error">Employee Age is required</span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="name" className="block">
              Employee Gender
            </label>
            <select
              className="select select-bordered w-full"
              {...register("employeeGender", { required: true })}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <div className="my-2 w-full">
            <label htmlFor="file" className="my-2 block w-full">
              Image
              <button
                type="button"
                className="btn btn-xs mx-2 text-white"
                onClick={() => setIsFile((prev) => !prev)}
              >
                {isFile ? "Upload" : "URL"}
              </button>
            </label>
            {isFile ? (
              <input
                type="url"
                name="file"
                className="input input-bordered w-full"
                placeholder="Put Your Image Link"
                id="file"
                {...register("imageUrl", { required: true })}
              />
            ) : (
              <input
                type="file"
                name="file"
                className="block border p-2 w-full rounded"
                id="file"
                {...register("employeeImage", { required: true })}
              />
            )}
          </div>
        </div>
        <div className="my-3 text-right">
          <button
            className="btn btn-primary text-white"
            disabled={!loading && true}
          >
            {!loading ? "Sending Data..." : "Save Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
