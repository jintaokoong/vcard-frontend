import { Modal } from '@mantine/core';
import { SlimModalProps } from '@/interfaces/utils/slim-modal-props';
import { useForm } from 'react-hook-form';
import { CreateVcardRequest } from '@/interfaces/cards/create-vcard-req';
import useCreateCard from '@/hooks/cards/use-create-card';
import { useEffect, useRef } from 'react';
import CardForm from '@/components/forms/cards/card-form';

/* eslint-disable */
interface Props extends SlimModalProps {}

const CreateCardModal = (props: Props) => {
  const { opened } = props;
  const form = useForm<CreateVcardRequest>();
  const { reset } = form;
  const resetRef = useRef(reset);
  const { mutate, isLoading } = useCreateCard();

  const onValid = (values: CreateVcardRequest) => {
    mutate(values, {
      onSuccess: () => {
        props.onClose();
      },
    });
  };

  useEffect(() => {
    !opened && resetRef.current();
  }, [opened]);

  return (
    <Modal title={'Create New Card'} size={'lg'} {...props}>
      <CardForm form={form} onValid={onValid} loading={isLoading} />
    </Modal>
  );
};

export default CreateCardModal;
