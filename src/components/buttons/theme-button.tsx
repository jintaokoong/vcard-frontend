import { useMemo } from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeButton = ({ className }: { className?: string }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === 'dark', [colorScheme]);

  return (
    <ActionIcon
      size={'lg'}
      className={className}
      variant='outline'
      radius={'md'}
      color={dark ? 'orange' : 'blue'}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
    >
      {dark ? (
        <FaSun style={{ width: 18, height: 18 }} />
      ) : (
        <FaMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
};

export default ThemeButton;
