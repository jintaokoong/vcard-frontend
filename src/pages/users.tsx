import { Button, Grid, Group, Menu, Paper, Text, Title } from '@mantine/core';
import useUsers from '@/hooks/users/use-users';
import { Fragment, useContext } from 'react';
import { useBooleanToggle, useLogger } from '@mantine/hooks';
import { AuthenticationContext } from '@/providers/authentication-provider';
import { FaPaperPlane } from 'react-icons/all';
import InviteUserModal from '@/components/modals/users/invite-user-modal';

const Users = () => {
  const { data: { users } = { users: [] } } = useUsers();
  const { user } = useContext(AuthenticationContext);
  const [opened, toggle] = useBooleanToggle();

  useLogger('users', [users]);

  return (
    <Fragment>
      <Group position={'apart'} align={'center'} mb={'sm'}>
        <Title order={2}>Users</Title>
        <Button
          size={'md'}
          variant={'light'}
          leftIcon={<FaPaperPlane />}
          onClick={() => toggle(true)}
        >
          Invite
        </Button>
      </Group>
      <Grid>
        {users.map((u) => (
          <Grid.Col key={u.uid} sm={12} md={3} lg={4}>
            <Paper shadow={'sm'} p={'sm'}>
              <Group
                mb={'sm'}
                position={'apart'}
                sx={{
                  flexWrap: 'nowrap',
                }}
              >
                <Text
                  size={'md'}
                  sx={{
                    overflowX: 'hidden',
                  }}
                >
                  {u.email}
                </Text>
                <Menu position={'bottom'} placement={'end'}>
                  <Menu.Item disabled={u.uid === user?.uid}>Delete</Menu.Item>
                </Menu>
              </Group>
              <Text size={'sm'}>
                {u.customClaims?.admin ? 'Admin' : 'User'}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      <InviteUserModal opened={opened} onClose={() => toggle(false)} />
    </Fragment>
  );
};

export default Users;
