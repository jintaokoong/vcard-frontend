import { Button, Grid, Group, Menu, Paper, Text, Title } from '@mantine/core';
import useUsers from '@/hooks/users/use-users';
import { Fragment, useContext, useState } from 'react';
import { useBooleanToggle, useLogger } from '@mantine/hooks';
import { AuthenticationContext } from '@/providers/authentication-provider';
import { FaPaperPlane, FaTrash } from 'react-icons/all';
import InviteUserModal from '@/components/modals/users/invite-user-modal';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import useDeleteUser from '@/hooks/users/use-delete-user';

const Users = () => {
  const { data: { users } = { users: [] } } = useUsers();
  const { user } = useContext(AuthenticationContext);

  const [inviteOpened, toggleInvite] = useBooleanToggle();
  const [deleteUser, setDeleteUser] = useState<string>();

  const { mutate, isLoading: isDeleting } = useDeleteUser();

  useLogger('users', [users]);

  const onClick = () => {
    if (!deleteUser) return console.error('abort. abnormal state.');
    mutate(deleteUser, {
      onSuccess: () => {
        setDeleteUser(undefined);
      },
    });
  };

  return (
    <Fragment>
      <Group position={'apart'} align={'center'} mb={'sm'}>
        <Title order={2}>Users</Title>
        <Button
          size={'md'}
          variant={'light'}
          leftIcon={<FaPaperPlane />}
          onClick={() => toggleInvite(true)}
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
                  <Menu.Item
                    icon={<FaTrash />}
                    color={'red'}
                    onClick={() => setDeleteUser(u.uid)}
                    disabled={u.uid === user?.uid}
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </Group>
              <Text size={'sm'}>
                {u.customClaims?.admin ? 'Admin' : 'User'}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      <InviteUserModal
        opened={inviteOpened}
        onClose={() => toggleInvite(false)}
      />
      <ConfirmationModal
        title={'Delete confirmation'}
        content={'Do you want to delete user?'}
        onConfirm={onClick}
        confirmButton={{
          variant: 'filled',
          color: 'red',
          loading: isDeleting,
        }}
        opened={deleteUser !== undefined}
        onClose={() => setDeleteUser(undefined)}
      />
    </Fragment>
  );
};

export default Users;
