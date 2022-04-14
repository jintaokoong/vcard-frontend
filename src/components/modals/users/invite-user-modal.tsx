import { Button, Modal, Space, TextInput } from '@mantine/core';
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

const InviteUserModal = (props: SlimModalProps) => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) =>
        validate(string().email().required().label('Email'))(value),
    },
  });
  const { mutate, isLoading } = useInviteUser();
  const onValid = (values: { email: string }) => {
    mutate(values, {
      onSuccess: () => {
        props.onClose();
      },
    });
  };

  return (
    <Modal title={'Invitation'} {...props}>
      <form onSubmit={onSubmit(onValid)}>
        <TextInput label={'Email'} {...getInputProps('email')} />
        <Space h={'xl'} />
        <Button loading={isLoading} fullWidth type={'submit'}>
          Send Invite
        </Button>
      </form>
    </Modal>
  );
};

export default InviteUserModal;
