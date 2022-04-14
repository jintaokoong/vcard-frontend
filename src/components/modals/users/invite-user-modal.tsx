import { Button, Modal, Select, Space, TextInput } from '@mantine/core';
import { SlimModalProps } from '@/interfaces/utils/slim-modal-props';
import { useForm } from '@mantine/form';
import { BaseSchema, ValidationError, string } from 'yup';
import useInviteUser from '@/hooks/users/use-invite-user';

const validate =
  <TSchema extends BaseSchema, TValue>(schema: TSchema) =>
  (value: TValue) => {
    try {
      schema.validateSync(value);
      return undefined;
    } catch (error) {
      return (error as ValidationError).errors.join(', ');
    }
  };

interface Values {
  email: string;
  type: string;
}

const InviteUserModal = (props: SlimModalProps) => {
  const { getInputProps, onSubmit, reset } = useForm<Values>({
    initialValues: { email: '', type: 'user' },
    validate: {
      email: (value) =>
        validate(string().email().required().label('Email'))(value),
      type: (value) => (value != null ? undefined : 'User type is required'),
    },
  });
  const { mutate, isLoading } = useInviteUser();
  const onValid = (values: { email: string; type: string }) => {
    mutate(
      { email: values.email, type: values.type },
      {
        onSuccess: () => {
          props.onClose();
          reset();
        },
      },
    );
  };

  return (
    <Modal title={'Invitation'} {...props}>
      <form onSubmit={onSubmit(onValid)}>
        <TextInput label={'Email'} {...getInputProps('email')} />
        <Select
          label={'User Type'}
          mt={'sm'}
          styles={{
            input: { textTransform: 'capitalize' },
            item: { textTransform: 'capitalize' },
          }}
          data={['admin', 'user']}
          {...getInputProps('type')}
        />
        <Space h={'xl'} />
        <Button loading={isLoading} fullWidth type={'submit'}>
          Send Invite
        </Button>
      </form>
    </Modal>
  );
};

export default InviteUserModal;
