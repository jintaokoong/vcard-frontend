import { MantineProvider } from "@mantine/core";
import { Fragment, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthenticationProvider from "./authentication-provider";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </MantineProvider>
      </QueryClientProvider>
    </Fragment>
  );
};

export default Providers;
