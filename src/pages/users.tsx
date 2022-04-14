import { Button, Grid, Group, Menu, Paper, Text, Title } from '@mantine/core';
import useUsers from '@/hooks/use-users';
import { Fragment } from 'react';
import { useLogger } from '@mantine/hooks';

const Users = () => {
  const { data: { users } = { users: [] } } = useUsers();

  useLogger('users', [users]);

  return (
    <Fragment>
      <Group position={'apart'} align={'center'} mb={'sm'}>
        <Title order={2}>Users</Title>
        <Button size={'md'} variant={'light'}>
          Invite
        </Button>
      </Group>
      <Grid>
        {users.map((u) => (
          <Grid.Col key={u.uid} sm={12} md={3} lg={4}>
            <Paper shadow={'sm'} p={'sm'}>
              <Group
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
                  <Menu.Item>Delete</Menu.Item>
                </Menu>
              </Group>
              <Text>{u.customClaims?.admin ? 'Admin' : 'User'}</Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Fragment>
  );
};

export default Users;
