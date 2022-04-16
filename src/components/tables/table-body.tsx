import { Group, Loader, Text, useMantineTheme } from '@mantine/core';
import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { FaRegFrownOpen, FaSkull } from 'react-icons/fa';

interface Props<T> {
  data: T[];
  loading?: boolean;
  error?: boolean;
  render: (item: T, index: number) => ReactNode;
}

const Container = ({ children }: PropsWithChildren<any>) => {
  return (
    <tr>
      <td colSpan={100}>{children}</td>
    </tr>
  );
};

const TableBody = <T,>(props: Props<T>) => {
  const theme = useMantineTheme();
  const textColor = theme.colorScheme === 'light' ? theme.colors.dark[2] : undefined;
  return (
    <Fragment>
      <tbody>
        {props.data.map(props.render)}
        {props.loading && !props.error && (
          <Container>
            <Group my={'sm'} direction={'column'} align={'center'}>
              <Loader size={'lg'} />
              <Text align={'center'} size={'md'} color={textColor}>
                Loading ...
              </Text>
            </Group>
          </Container>
        )}
        {!props.loading && props.error && (
          <Container>
            <Group my={'sm'} direction={'column'} align={'center'}>
              <FaSkull size={72} color={textColor} />
              <Text align={'center'} size={'md'} color={textColor}>
                There is an error when attempting to fetch data
              </Text>
            </Group>
          </Container>
        )}
        {!props.loading && !props.error && props.data.length === 0 && (
          <Container>
            <Group my={'sm'} direction={'column'} align={'center'}>
              <FaRegFrownOpen
                size={72}
                color={theme.colorScheme === 'light' ? theme.colors.dark[2] : undefined}
              />
              <Text
                align={'center'}
                size={'md'}
                color={theme.colorScheme === 'light' ? theme.colors.dark[2] : undefined}>
                No Data
              </Text>
            </Group>
          </Container>
        )}
      </tbody>
    </Fragment>
  );
};

export default TableBody;
