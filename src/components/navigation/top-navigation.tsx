import {
  Burger,
  Group,
  Header,
  HeaderProps,
  Text,
  useMantineTheme,
  MediaQuery,
} from '@mantine/core';
import useStore, { State } from '@/state/store';
import { Link } from 'react-router-dom';
import ThemeButton from '@/components/buttons/theme-button';
import { FaIdCard } from 'react-icons/fa';

const selector = (s: State) => ({
  opened: s.layout.opened,
  toggleSidebar: s.layout.toggleSidebar,
});

const TopNavigation = (props: Omit<HeaderProps, 'children'>) => {
  const theme = useMantineTheme();
  const { opened, toggleSidebar } = useStore(selector);
  return (
    <Header {...props} p={'xs'}>
      <Group align={'center'} position={'apart'} sx={{ height: '100%' }}>
        <Group align={'center'} sx={{ height: '100%' }}>
          <MediaQuery largerThan={'lg'} styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={toggleSidebar}
              size={'sm'}
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <Link to={'/main'} style={{ textDecoration: 'none' }}>
            <Group align={'center'} spacing={'sm'}>
              <FaIdCard color={'gray'} size={24} />
              <Text
                weight={'normal'}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[5]
                      : theme.colors.dark[8],
                })}
              >
                VCard Manager
              </Text>
            </Group>
          </Link>
        </Group>
        <Group position={'right'} spacing={'md'}>
          <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
            <ThemeButton />
          </MediaQuery>
        </Group>
      </Group>
    </Header>
  );
};

export default TopNavigation;
