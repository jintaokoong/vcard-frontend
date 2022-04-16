import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCard from '@/hooks/cards/use-card';
import {
  Anchor,
  Breadcrumbs,
  Button,
  Grid,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Address } from '@/interfaces/cards/address';
import countryUtils from '@/utils/country-utils';
import countries from '@/constants/countries';
import { FaQrcode } from 'react-icons/all';

interface AddressInfoProps {
  address: Address;
}

const AddressInfo = ({ address }: AddressInfoProps) => {
  return (
    <Grid>
      <Grid.Col>
        <TextInput label={'Label'} readOnly value={address.label} />
      </Grid.Col>
      <Grid.Col>
        <TextInput label={'Street'} readOnly value={address.street} />
      </Grid.Col>
      <Grid.Col>
        <TextInput label={'City'} readOnly value={address.city} />
      </Grid.Col>
      <Grid.Col sm={6}>
        <TextInput label={'State'} readOnly value={address.state} />
      </Grid.Col>
      <Grid.Col sm={6}>
        <TextInput label={'Postal Code'} readOnly value={address.postalCode} />
      </Grid.Col>
      <Grid.Col>
        <TextInput
          label={'Country'}
          readOnly
          value={countryUtils.getCountryNameByCode(countries)(
            address.countryCode,
          )}
        />
      </Grid.Col>
    </Grid>
  );
};

const CardsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCard(id!);

  return (
    <Fragment>
      <Breadcrumbs mb={'md'}>
        <Anchor to={'/main/cards'} component={Link}>
          Cards
        </Anchor>
        <Text transform={'capitalize'}>{data?.label} Details</Text>
      </Breadcrumbs>
      <Group mb={'md'} position={'right'}>
        <Button leftIcon={<FaQrcode />}>View QR</Button>
      </Group>
      <Paper p={'md'} mb={'md'}>
        <Title order={4} mb={'md'}>
          Personal Information
        </Title>
        <Grid>
          <Grid.Col sm={6}>
            <TextInput label={'First Name'} readOnly value={data?.firstName} />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput label={'Last Name'} readOnly value={data?.lastName} />
          </Grid.Col>
          <Grid.Col>
            <TextInput label={'Contact'} readOnly value={data?.contact} />
          </Grid.Col>
          <Grid.Col>
            <TextInput label={'Email'} readOnly value={data?.email} />
          </Grid.Col>
        </Grid>
      </Paper>
      {data?.address && (
        <Paper p={'md'} mb={'md'}>
          <Title order={4} mb={'md'}>
            Personal Address
          </Title>
          <AddressInfo address={data.address} />
        </Paper>
      )}
      <Paper p={'md'} mb={'md'}>
        <Title order={4} mb={'md'}>
          Work Information
        </Title>
        <Grid>
          <Grid.Col>
            <TextInput
              label={'Organization'}
              readOnly
              value={data?.organization}
            />
          </Grid.Col>
          <Grid.Col>
            <TextInput label={'Job Title'} readOnly value={data?.title} />
          </Grid.Col>
        </Grid>
      </Paper>
      {data?.workAddress && (
        <Paper p={'md'} mb={'md'}>
          <Title order={4} mb={'md'}>
            Work Address
          </Title>
          <AddressInfo address={data.workAddress} />
        </Paper>
      )}
    </Fragment>
  );
};

export default CardsDetails;
