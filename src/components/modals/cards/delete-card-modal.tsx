import ConfirmationModal from '@/components/modals/confirmation-modal';
import { SlimModalProps } from '@/interfaces/utils/slim-modal-props';
import { Vcard } from '@/interfaces/cards/vcard';
import useDeleteCard from '@/hooks/cards/use-delete-card';
import useMessage from '@/hooks/notifications/use-message';
import { AxiosError } from 'axios';
import { ApiError } from '@/interfaces/shared/api-error';

interface Props extends SlimModalProps {
  item: Vcard | undefined;
}

const DeleteCardModal = (props: Props) => {
  const { mutate, isLoading } = useDeleteCard();
  const { showSuccess, showError } = useMessage();

  const onConfirm = () => {
    if (!props.item) return console.error('abnormal state. abort');
    mutate(props.item._id, {
      onSuccess: () => {
        showSuccess('Successfully deleted card');
        props.onClose();
      },
      onError: (error: AxiosError<ApiError>) => {
        showError(error);
      },
    });
  };

  return (
    <ConfirmationModal
      title={'Delete confirmation'}
      content={`Are you sure you want to delete card ${props.item?.label}`}
      confirmButton={{
        loading: isLoading,
        color: 'red',
        variant: 'filled',
      }}
      onConfirm={onConfirm}
      opened={props.opened}
      onClose={props.onClose}
    />
  );
};

export default DeleteCardModal;
