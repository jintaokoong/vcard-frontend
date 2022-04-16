import { Group, Text } from '@mantine/core';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface SortableProps {
  headers: [string, string][];
  sortKey: string | undefined;
  sortOrder: number | undefined;
  toggle: (value: string) => void;
}

interface UnsortableProps {
  headers: string[];
}

type Props = SortableProps | UnsortableProps;

const cast = <T extends Props>(props: Props): T => props as T;

const Indicator = ({
  sortKey,
  sortOrder,
  current,
}: {
  sortOrder: number | undefined;
  sortKey: string | undefined;
  current: string;
}) => {
  if (current !== sortKey || !sortOrder) {
    return null;
  } else if (sortOrder < 0) {
    return <FaSortUp style={{ marginLeft: 5, alignSelf: 'center' }} />;
  } else {
    return <FaSortDown style={{ marginLeft: 5, alignSelf: 'start' }} />;
  }
};

const TableHeader = (props: Props) => {
  return (
    <thead>
      <tr>
        {props.headers.map((header, index) =>
          typeof header === 'string' ? (
            <th key={index}>{header}</th>
          ) : (
            <th
              key={index}
              style={{
                cursor: header[1].length > 0 ? 'pointer' : 'not-allowed',
                whiteSpace: 'nowrap',
                verticalAlign: 'bottom',
              }}
              onClick={() =>
                header[1].length > 0
                  ? cast<SortableProps>(props).toggle(header[1])
                  : undefined
              }>
              <Group spacing={3} sx={{ flexWrap: 'nowrap' }}>
                <Text size={'sm'}>{header[0]}</Text>
                <Indicator {...cast<SortableProps>(props)} current={header[1]} />
              </Group>
            </th>
          ),
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
