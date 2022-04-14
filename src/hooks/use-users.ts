import axiosInstance from "@/configurations/axios";
import { useQuery } from "react-query";

const useUsers = () => {
  return useQuery(["users"], () =>
    axiosInstance.get("/users").then(({ data }) => data)
  );
};

export default useUsers;
