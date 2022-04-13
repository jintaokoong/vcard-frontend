import useLogin from "@/hooks/authentication/use-login";
import {
  Button,
  Container,
  PasswordInput,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBooleanToggle } from "@mantine/hooks";

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
        <Button loading={loading} type={"submit"} fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Login;
