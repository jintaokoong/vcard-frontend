import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Fragment, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthenticationProvider from './authentication-provider';
import { useLocalStorageValue } from '@mantine/hooks';
import AbilityProvider from '@/providers/ability-provider';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren<unknown>) => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{ colorScheme }} withGlobalStyles>
            <AuthenticationProvider>
              <AbilityProvider>{children}</AbilityProvider>
            </AuthenticationProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
};

export default Providers;
