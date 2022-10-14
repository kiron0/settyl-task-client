import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import useEmployees from "../../../Hooks/useEmployees";

const Welcome = () => {
  const [employees] = useEmployees();

  // console.log(employees);

  return (
    <div className="flex justify-center items-center h-[80vh] hero-content flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <PieChart
          width={400}
          height={300}
          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
        >
          <Pie
            data={employees}
            dataKey="employee_age"
            nameKey="employee_age"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={employees}
            dataKey="employee_salary"
            nameKey="employee_salary"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div>
      <BarChart
          width={400}
          height={300}
          data={employees}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="employee_salary" fill="#8884d8" />
          <Bar dataKey="employee_age" fill="#82ca9d" />
        </BarChart>
      </div>
      </div>
    </div>
  );
};

export default Welcome;
