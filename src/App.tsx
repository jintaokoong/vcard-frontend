import { Button, Text } from "@mantine/core";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/root";
import useLogout from "./hooks/authentication/use-logout";
import Login from "./pages/login";
import Providers from "./providers";
import useUsers from "./hooks/use-users";
import { useLogger } from "@mantine/hooks";
import Gatekeeper from "./providers/gatekeeper";

const Main = () => {
  const logout = useLogout();
  const { data } = useUsers();

  useLogger("main", [data]);

  return (
    <Fragment>
      <Text>Main</Text>
      <Button onClick={logout}>Logout</Button>
    </Fragment>
  );
};

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Root />}>
            <Route path={"login"} element={<Login />} />
            <Route
              path={"main"}
              element={
                <Gatekeeper>
                  <Main />
                </Gatekeeper>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
