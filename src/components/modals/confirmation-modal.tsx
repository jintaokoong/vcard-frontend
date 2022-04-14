import {
  ButtonVariant,
  MantineColor,
  Modal,
  Text,
  Group,
  Button,
  ModalProps,
} from '@mantine/core';

interface Props extends Pick<ModalProps, 'opened' | 'onClose' | 'title'> {
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButton?: {
    color?: MantineColor;
    variant?: ButtonVariant;
    loading?: boolean;
  };
}

const ConfirmationModal = (props: Props) => {
  return (
    <Modal
      withCloseButton
      closeOnClickOutside={!props.confirmButton?.loading}
      title={props.title}
      opened={props.opened}
      onClose={props.onClose}
    >
      <Text>{props.content}</Text>
      <Group mt={'sm'} position={'right'} spacing={'sm'}>
        <Button
          variant={'outline'}
          onClick={() => {
            props.onCancel && props.onCancel();
            props.onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => props.onConfirm()}
          loading={props.confirmButton?.loading}
          variant={props.confirmButton?.variant ?? 'filled'}
          color={props.confirmButton?.color}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmationModal;
