import { Button, Text } from "@mantine/core";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/root";
import useLogout from "./hooks/authentication/use-logout";
import Login from "./pages/login";
import Providers from "./providers";

const Main = () => {
  const logout = useLogout();
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
            <Route path={"main"} element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
