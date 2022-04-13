import usePrevention from "@/hooks/routing/use-prevention";
import { Outlet } from "react-router-dom";

const Root = () => {
  usePrevention();
  return <Outlet />;
};

export default Root;
