import { MantineProvider } from "@mantine/core";
import { Fragment, PropsWithChildren } from "react";
import AuthenticationProvider from "./authentication-provider";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <Fragment>
      <MantineProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </MantineProvider>
    </Fragment>
  );
};

export default Providers;
