import { getDepartments, getMunicipality } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";

export const useLocationState = () => {
  const departmentState = useQuery({
    queryKey: ["department"],
    queryFn: getDepartments,
  });

  const municipalityState = (departmentCode: string) =>
    useQuery({
      queryKey: ["municipality"],
      queryFn: () => getMunicipality(departmentCode),
    });

  return { departmentState, municipalityState };
};
