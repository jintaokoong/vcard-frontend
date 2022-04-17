import CreateCardModal from '@/components/modals/cards/create-card-modal';
import DeleteCardModal from '@/components/modals/cards/delete-card-modal';
import UpdateCardModal from '@/components/modals/cards/update-card-modal';
import TableBody from '@/components/tables/table-body';
import TableHeader from '@/components/tables/table-header';
import useCardsListing from '@/hooks/cards/use-cards-listing';
import usePagination from '@/hooks/listings/use-pagination';
import useBooleanModal from '@/hooks/modals/use-boolean-modal';
import useItemModal from '@/hooks/modals/use-item-modal';
import { Vcard } from '@/interfaces/cards/vcard';
import array from '@/utils/array-utils';
import dateUtils from '@/utils/date-utils';
import {
  Button,
  Group,
  Menu,
  Pagination,
  Paper,
  Table,
  Title
} from '@mantine/core';
import { composeWith, defaultTo, isNil } from 'ramda';
import { Fragment } from 'react';
import { FaTrash } from 'react-icons/all';
import { FaBook, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const composeNotNil = composeWith((fn, res) => (isNil(res) ? res : fn(res)));

const Cards = () => {
  const { opened, onOpen, onClose } = useBooleanModal();
  const {
    opened: deleteOpened,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    item,
  } = useItemModal<Vcard>();
  const {
    opened: updateOpened,
    onOpen: onUpdateOpened,
    onClose: onUpdateClose,
    item: update,
  } = useItemModal<string>();
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
            headers={array.initiate('Card Label', 'Created At', 'QR Link', '')}
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
                <td style={{ color: 'gray' }}>{import.meta.env.VITE_APP_QR_CODE_BASE_URL}/{card._id}</td>
                <td>
                  <Menu>
                    <Menu.Item
                      icon={<FaBook />}
                      to={`details/${card._id}`}
                      component={Link}
                    >
                      View Details
                    </Menu.Item>
                    <Menu.Item
                      icon={<FaEdit />}
                      color={'blue'}
                      onClick={() => onUpdateOpened(card._id)}
                    >
                      Update Card
                    </Menu.Item>
                    <Menu.Item
                      icon={<FaTrash />}
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
      <UpdateCardModal
        item={update}
        opened={updateOpened}
        onClose={onUpdateClose}
      />
    </Fragment>
  );
};

export default Cards;
