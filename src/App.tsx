import {
  Box,
  Button,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import * as auth from "firebase/auth";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/root";
import useLogin from "./hooks/authentication/use-login";
import useLogout from "./hooks/authentication/use-logout";
import Providers from "./providers";

const Login = () => {
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const authenticate = useLogin();

  return (
    <Box>
      <TextInput mb={"md"} label={"Email"} value={email} onChange={setEmail} />
      <PasswordInput
        label={"Password"}
        value={password}
        onChange={setPassword}
      />
      <Space h={"lg"} />
      <Button fullWidth onClick={() => authenticate(email, password)}>
        Submit
      </Button>
    </Box>
  );
};

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
