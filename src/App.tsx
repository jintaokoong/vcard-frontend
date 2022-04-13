import { Box, Button, MantineProvider, PasswordInput, Space, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import * as auth from 'firebase/auth';
import { useEffect } from 'react';

export default function App() {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const authenticate = () => {
    auth.signInWithEmailAndPassword(auth.getAuth(), email, password )
    .then(() => console.log('logged in'));
  }

  useEffect(() => {
    const sub = auth.onAuthStateChanged(auth.getAuth(), (user) => {
      console.log(user);
    }, (error) => {
      console.error(error);
    });
    return () => {
      sub();
    }
  }, [])


  return <MantineProvider>
    <Box>
      <TextInput mb={'md'} label={'Email'} value={email} onChange={setEmail} />
      <PasswordInput label={'Password'} value={password} onChange={setPassword} />
      <Space h={'lg'} />
      <Button fullWidth onClick={authenticate}>Submit</Button>
    </Box>
  </MantineProvider>;
}
