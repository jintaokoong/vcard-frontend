import { Button, Grid, Group, Paper, Text, Title } from '@mantine/core';
import { Fragment } from 'react';
import useBooleanModal from '@/hooks/modal/use-boolean-modal';
import CreateCardModal from '@/components/modals/cards/create-card-modal';
import useCards from '@/hooks/cards/use-cards';

const Cards = () => {
  const { opened, onOpen, onClose } = useBooleanModal();
  const { data = [] } = useCards();
  return (
    <Fragment>
      <Group mb={'md'} position={'apart'}>
        <Title order={2}>Cards</Title>
        <Button variant={'light'} onClick={onOpen}>
          Create
        </Button>
      </Group>
      <Grid>
        {data.map((card) => (
          <Grid.Col key={card._id} lg={4} xl={3}>
            <Paper p={'md'}>
              <Title order={3} mb={'sm'}>
                {card.firstName} {card.lastName}
              </Title>
              <Text>{card.title}</Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      <CreateCardModal opened={opened} onClose={onClose} />
    </Fragment>
  );
};

export default Cards;
