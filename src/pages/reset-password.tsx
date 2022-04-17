import { Button, Container, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import * as auth from 'firebase/auth';
import { propOr, tryCatch } from 'ramda';
import { useState } from 'react';
import { FaChevronLeft, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { string, ValidationError } from 'yup';

const ResetPassword = () => {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const { getInputProps, onSubmit } = useForm({
    initialValues: { email: '' },
    validate: {
      email: (values) =>
        tryCatch(
          () => {
            string().required().email().validateSync(values);
            return undefined;
          },
          (error: ValidationError) => error.errors.join(', '),
        )(),
    },
  });

  const onValid = async (values: { email: string }) => {
    setSent(false);
    setError('');
    return auth
      .sendPasswordResetEmail(auth.getAuth(), values.email)
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        setError(
          propOr(
            'An error occurred when trying to send password reset email.',
            'message',
          )(error),
        );
      });
  };

  return (
    <>
      <Container p={'md'} size={'xs'}>
        <Text mb={'md'} weight={500} size={'lg'}>
          Forgot your password?
        </Text>
        <form onSubmit={onSubmit(onValid)}>
          <TextInput mb={'md'} label={'Email'} {...getInputProps('email')} />
          {sent && (
            <Text mb={'md'} size={'sm'} color={'green'}>
              A password reset email has been sent, please check your spam if
              you are unable to locate it.
            </Text>
          )}
          {error && (
            <Text mb={'md'} size={'sm'} color={'red'}>
              {error}
            </Text>
          )}
          <Button mb={'md'} type={'submit'} leftIcon={<FaSync size={12} />}>
            Reset
          </Button>
        </form>
        <Text to={'/login'} color={'blue'} component={Link}>
          <FaChevronLeft size={12} /> Back to Login
        </Text>
      </Container>
    </>
  );
};

export default ResetPassword;
