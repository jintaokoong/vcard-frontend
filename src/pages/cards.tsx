import { Button, Group, Title } from '@mantine/core';
import { Fragment } from 'react';
import useBooleanModal from '@/hooks/modal/use-boolean-modal';
import CreateCardModal from '@/components/modals/cards/create-card-modal';

const Cards = () => {
  const { opened, onOpen, onClose } = useBooleanModal();
  return (
    <Fragment>
      <Group mb={'md'} position={'apart'}>
        <Title order={2}>Cards</Title>
        <Button variant={'light'} onClick={onOpen}>
          Create
        </Button>
      </Group>
      <CreateCardModal opened={opened} onClose={onClose} />
    </Fragment>
  );
};

export default Cards;
