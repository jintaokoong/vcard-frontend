import { Fragment, PropsWithChildren, useContext } from "react";
import { AuthenticationContext } from "./authentication-provider";

const Gatekeeper = ({ children }: PropsWithChildren<any>) => {
  const { user } = useContext(AuthenticationContext);
  return <Fragment>{!user ? null : children}</Fragment>;
};

export default Gatekeeper;
