import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../api";

const useEmployeeMaster = (api, key) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, api],
    queryFn: () => newRequest.get(api).then((res) => res.data),
    enabled: !!api,
  });
  return { data, isLoading };
};

export default useEmployeeMaster;
