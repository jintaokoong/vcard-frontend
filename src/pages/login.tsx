import useLogin from '@/hooks/authentication/use-login';
import {
  Box,
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useBooleanToggle } from '@mantine/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, toggleLoading] = useBooleanToggle(false);
  const { getInputProps, onSubmit } = useForm<FormValues>({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (!value ? 'Email is required' : undefined),
      password: (value) => (!value ? 'Password is required' : undefined),
    },
  });
  const [error, setError] = useState('');
  const authenticate = useLogin();

  const onValid = (values: FormValues) => {
    const { email, password } = values;
    setError('');
    toggleLoading();
    return authenticate(email, password)
      .catch(() => {
        setError('Email or password invalid');
      })
      .then(() => toggleLoading());
  };

  return (
    <Container size={'xs'} p={'md'}>
      <form onSubmit={onSubmit(onValid)}>
        <TextInput mb={'md'} label={'Email'} {...getInputProps('email')} />
        <PasswordInput
          mb={'md'}
          label={'Password'}
          {...getInputProps('password')}
        />
        {error && (
          <Text mb={'md'} size={'sm'} color={'red'}>
            {error}
          </Text>
        )}
        <Button mb={'md'} loading={loading} type={'submit'} fullWidth>
          Submit
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Text color={'blue'} to={'/reset'} component={Link}>
            Forgot Password?
          </Text>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
