import { Button, Group, Table, Title } from '@mantine/core';
import { Fragment } from 'react';
import useBooleanModal from '@/hooks/modal/use-boolean-modal';
import CreateCardModal from '@/components/modals/cards/create-card-modal';
import useCards from '@/hooks/cards/use-cards';
import TableBody from '@/components/tables/table-body';

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
      <Table>
        <TableBody
          data={data}
          render={(card) => (
            <tr>
              <td>
                {card.firstName} {card.lastName}
              </td>
              <td>{card.createdAt}</td>
            </tr>
          )}
        />
      </Table>
      <CreateCardModal opened={opened} onClose={onClose} />
    </Fragment>
  );
};

export default Cards;
