import { SlimModalProps } from '@/interfaces/utils/slim-modal-props';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateVcardRequest } from '@/interfaces/cards/update-vcard-req';
import { Modal } from '@mantine/core';
import CardForm from '@/components/forms/cards/card-form';
import useCard from '@/hooks/cards/use-card';
import { omit } from 'ramda';
import useUpdateCard from '@/hooks/cards/use-update-card';
import useMessage from '@/hooks/notifications/use-message';

interface Props extends SlimModalProps {
  item: string | undefined;
}

const UpdateCardModal = (props: Props) => {
  const { item, opened, onClose } = props;
  const { data } = useCard(item ?? '');
  const { mutate, isLoading } = useUpdateCard(item ?? '');
  const form = useForm<UpdateVcardRequest>();
  const { reset } = form;
  const { showError, showSuccess } = useMessage();
  const resetRef = useRef(reset);

  useEffect(() => {
    if (data && opened) {
      resetRef.current(
        omit(['_id', 'createdAt', 'createdBy', 'updatedAt'])(data),
      );
    }
  }, [data, opened]);

  useEffect(() => {
    !opened && resetRef.current();
  }, [opened]);

  const onValid = (values: UpdateVcardRequest) => {
    mutate(values, {
      onSuccess: () => {
        showSuccess('Successfully updated card');
        onClose();
      },
      onError: (error) => {
        showError(error);
      },
    });
  };

  return (
    <Modal title={'Update Card'} size={'lg'} {...props}>
      <CardForm form={form} onValid={onValid} loading={isLoading} />
    </Modal>
  );
};

export default UpdateCardModal;
