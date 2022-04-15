import { AppShell, Navbar, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import TopNavigation from '@/components/navigation/top-navigation';
import useStore, { State } from '@/state/store';
import Section from '@/components/navigation/section';
import { FaSignOutAlt, FaUsers } from 'react-icons/all';
import useLogout from '@/hooks/authentication/use-logout';
import { FaIdCard } from 'react-icons/fa';
import { Can } from '@/contexts/casl-context';

const selector = (s: State) => s.layout.opened;

const Main = () => {
  const opened = useStore(selector);
  const logout = useLogout();

  return (
    <AppShell
      padding={'md'}
      navbarOffsetBreakpoint={'lg'}
      fixed
      navbar={
        <Navbar
          hiddenBreakpoint={'lg'}
          width={{ md: 250 }}
          hidden={!opened}
          height={'calc(100vh - 60px)'}
          p={'xs'}
        >
          <Navbar.Section component={ScrollArea} grow>
            <Can I={'view'} a={'card'}>
              <Section
                match={'/main/cards'}
                icon={<FaIdCard />}
                iconColor={'cyan'}
                title={'Cards'}
              />
            </Can>
            <Can I={'view'} a={'user'}>
              <Section
                match={'/main/users'}
                icon={<FaUsers />}
                title={'Users'}
              />
            </Can>
            <Section
              onClick={logout}
              icon={<FaSignOutAlt />}
              iconColor={'gray'}
              iconVariant={'light'}
              title={'Log Out'}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={<TopNavigation height={60} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingRight: 20,
          paddingBottom: 20,
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};

export default Main;
