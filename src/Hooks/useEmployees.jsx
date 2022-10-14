import { useQuery } from "@tanstack/react-query";
import { BASE_API } from "../config";

export default function useEmployees() {
  const { data: employees, isLoading, refetch } = useQuery(["appliedJobs"], () =>
    fetch(`${BASE_API}/api/v1/employees`).then((res) => res.json())
  );
  return [employees, isLoading, refetch];
}
