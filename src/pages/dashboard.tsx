import { Paper, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Paper
      to={'/main/cards'}
      component={Link}
      p={'sm'}
      sx={({ colors: { blue } }) => ({
        backgroundColor: blue[7],
        cursor: 'pointer',
      })}
    >
      <Title order={3} mb={'sm'} sx={{ color: 'white' }}>
        Create your vCard now!
      </Title>
      <Text color={'white'}>Click here to get started</Text>
    </Paper>
  );
};

export default Dashboard;
