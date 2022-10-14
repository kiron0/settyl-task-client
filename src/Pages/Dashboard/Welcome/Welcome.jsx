import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  PieChart,
  AreaChart,
  Area,
  Pie,
} from "recharts";
import useEmployees from "../../../Hooks/useEmployees";

const Welcome = () => {
  const [employees] = useEmployees();

  return (
    <div className="flex justify-center items-center h-[80vh] flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <LineChart
            width={400}
            height={330}
            data={employees}
            margin={{ top: 5, right: 30, left: -15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="employee_age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="employee_salary" stroke="#8884d8" />
          </LineChart>
        </div>
        <div>
          <PieChart
            width={400}
            height={300}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <Pie
              data={employees}
              dataKey="employee_age"
              nameKey="Age"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            />
            <Pie
              data={employees}
              dataKey="employee_salary"
              nameKey="Salary"
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
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="employee_salary" fill="#8884d8" />
            <Bar dataKey="employee_age" fill="#82ca9d" />
          </BarChart>
        </div>
        <div>
          <AreaChart
            width={400}
            height={300}
            data={employees}
            margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="employee_salary"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="employee_age"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
