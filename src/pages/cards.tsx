import {
  Button,
  Group,
  Menu,
  Pagination,
  Paper,
  Table,
  Title,
} from '@mantine/core';
import { Fragment } from 'react';
import useBooleanModal from '@/hooks/modals/use-boolean-modal';
import CreateCardModal from '@/components/modals/cards/create-card-modal';
import TableBody from '@/components/tables/table-body';
import TableHeader from '@/components/tables/table-header';
import array from '@/utils/array-utils';
import dateUtils from '@/utils/date-utils';
import { composeWith, defaultTo, isNil } from 'ramda';
import useCardsListing from '@/hooks/cards/use-cards-listing';
import usePagination from '@/hooks/listings/use-pagination';
import useItemModal from '@/hooks/modals/use-item-modal';
import { Vcard } from '@/interfaces/cards/vcard';
import DeleteCardModal from '@/components/modals/cards/delete-card-modal';

const composeNotNil = composeWith((fn, res) => (isNil(res) ? res : fn(res)));

const Cards = () => {
  const { opened, onOpen, onClose } = useBooleanModal();
  const {
    opened: deleteOpened,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    item,
  } = useItemModal<Vcard>();
  const { state: pagination, onChange } = usePagination();
  const { data, isLoading, isError } = useCardsListing({
    pagination,
  });

  return (
    <Fragment>
      <Group mb={'md'} position={'apart'}>
        <Title order={2}>Cards</Title>
        <Button variant={'light'} onClick={onOpen}>
          Create
        </Button>
      </Group>
      <Paper p={'sm'} shadow={'xs'} mb={'md'}>
        <Table highlightOnHover verticalSpacing={'xs'}>
          <TableHeader
            headers={array.initiate('Card Label', 'Created At', '')}
          />
          <TableBody
            loading={isLoading}
            error={isError}
            data={data?.data ?? []}
            render={(card) => (
              <tr>
                <td>{card.label}</td>
                <td>
                  {defaultTo('N/A')(
                    composeNotNil([dateUtils.formatDefault])(card.createdAt),
                  )}
                </td>
                <td>
                  <Menu>
                    <Menu.Item p={'sm'}>View Details</Menu.Item>
                    <Menu.Item
                      p={'sm'}
                      color={'red'}
                      onClick={() => onDeleteOpen(card)}
                    >
                      Delete Card
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            )}
          />
        </Table>
      </Paper>
      <Pagination
        position={'right'}
        total={data?.totalPages ?? 1}
        onChange={onChange}
      />
      <CreateCardModal opened={opened} onClose={onClose} />
      <DeleteCardModal
        item={item}
        opened={deleteOpened}
        onClose={onDeleteClose}
      />
    </Fragment>
  );
};

export default Cards;
