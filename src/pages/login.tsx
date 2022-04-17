import useLogin from "@/hooks/authentication/use-login";
import {
  Box,
  Button, Container,
  PasswordInput,
  Space, Text, TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBooleanToggle } from "@mantine/hooks";
import { Link } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, toggleLoading] = useBooleanToggle(false);
  const { getInputProps, onSubmit } = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (!value ? "Email is required" : undefined),
      password: (value) => (!value ? "Password is required" : undefined),
    },
  });
  const authenticate = useLogin();

  const onValid = (values: FormValues) => {
    const { email, password } = values;
    toggleLoading();
    return authenticate(email, password).then(() => toggleLoading());
  };

  return (
    <Container size={"xs"} p={"md"}>
      <form onSubmit={onSubmit(onValid)}>
        <TextInput mb={"md"} label={"Email"} {...getInputProps("email")} />
        <PasswordInput label={"Password"} {...getInputProps("password")} />
        <Space h={"lg"} />
        <Button mb={'md'} loading={loading} type={"submit"} fullWidth>
          Submit
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Text color={'blue'} to={'/reset'} component={Link}>Forgot Password?</Text>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
