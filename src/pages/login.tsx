import useLogin from "@/hooks/authentication/use-login";
import {
  Button,
  Container,
  PasswordInput,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { getInputProps, onSubmit } = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => !value && "Email is required",
      password: (value) => !value && "Password is required",
    },
  });
  const authenticate = useLogin();

  const onValid = (values: FormValues) => {
    const { email, password } = values;
    authenticate(email, password);
  };

  return (
    <Container size={"xs"} p={"md"}>
      <form onSubmit={onSubmit(onValid)}>
        <TextInput mb={"md"} label={"Email"} {...getInputProps("email")} />
        <PasswordInput label={"Password"} {...getInputProps("password")} />
        <Space h={"lg"} />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Login;
