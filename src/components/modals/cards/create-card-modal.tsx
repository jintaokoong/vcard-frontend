import {
  Accordion,
  Button,
  Grid,
  Modal,
  Select,
  Space,
  Textarea,
  TextInput,
  useAccordionState,
} from '@mantine/core';
import { SlimModalProps } from '@/interfaces/utils/slim-modal-props';
import { Controller, useForm } from 'react-hook-form';
import { Vcard } from '@/interfaces/cards/vcard';
import { vcardInitialValues } from '@/constants/vcard-initial-values';
import { defaultTo, length, pipe, prop, when } from 'ramda';
import { createOption, createOptions } from '@/utils/dropdown-utils';
import countries from '@/constants/countries';
import { Country } from '@/interfaces/shared/country';

/* eslint-disable */
interface Props extends SlimModalProps {}

const CreateCardModal = (props: Props) => {
  const [state, handlers] = useAccordionState({ initialItem: 0, total: 5 });
  const { control, register, handleSubmit } = useForm<Vcard>({
    defaultValues: vcardInitialValues,
  });

  return (
    <Modal title={'Create New Card'} size={'lg'} {...props}>
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <Accordion
          state={state}
          onChange={handlers.setState}
          styles={{
            content: { paddingLeft: 0 },
            item: { ':last-child': { borderBottom: 0 } },
          }}
          multiple
        >
          <Accordion.Item offsetIcon={false} label={'Personal Information'}>
            <Grid>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  {...register('basicInfo.firstName')}
                  label={'First Name'}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  {...register('basicInfo.lastName')}
                  label={'Last Name'}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Contact'}
                  {...register('basicInfo.contact')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'Email'} {...register('basicInfo.email')} />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item label={'Personal Address'}>
            <Grid>
              <Grid.Col>
                <TextInput
                  label={'Address Label'}
                  {...register('basicInfo.address.label')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Street'}
                  {...register('basicInfo.address.street')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'City'}
                  {...register('basicInfo.address.city')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'State'}
                  {...register('basicInfo.address.state')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'Postal Code'}
                  {...register('basicInfo.address.postalCode')}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  control={control}
                  name={'basicInfo.address.countryCode'}
                  render={({ field }) => (
                    <Select
                      searchable
                      clearable
                      label={'Country'}
                      data={createOptions<Country>(
                        createOption<Country>(prop('name'))('code'),
                      )(countries)}
                      value={when<string, string | null>(
                        (value) => length(value) === 0,
                        () => null,
                      )(field.value)}
                      onChange={pipe(defaultTo(''), field.onChange)}
                    />
                  )}
                />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item offsetIcon={false} label={'Work Information'}>
            <Grid>
              <Grid.Col>
                <TextInput label={'Title'} {...register('workInfo.title')} />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Organization'}
                  {...register('workInfo.organization')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Work Contact'}
                  {...register('workInfo.contact')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Work Email'}
                  {...register('workInfo.email')}
                />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item label={'Work Address'}>
            <Grid>
              <Grid.Col>
                <TextInput
                  label={'Address Label'}
                  {...register('workInfo.address.label')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Street'}
                  {...register('workInfo.address.street')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'City'}
                  {...register('workInfo.address.city')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'State'}
                  {...register('workInfo.address.state')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'Postal Code'}
                  {...register('workInfo.address.postalCode')}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  control={control}
                  name={'workInfo.address.countryCode'}
                  render={({ field }) => (
                    <Select
                      searchable
                      clearable
                      label={'Country'}
                      data={createOptions<Country>(
                        createOption<Country>(prop('name'))('code'),
                      )(countries)}
                      value={when<string, string | null>(
                        (value) => length(value) === 0,
                        () => null,
                      )(field.value)}
                      onChange={pipe(defaultTo(''), field.onChange)}
                    />
                  )}
                />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item offsetIcon={false} label={'Extra Information'}>
            <Textarea label={'Notes'} {...register('notes')} />
          </Accordion.Item>
        </Accordion>
        <Space h={'sm'} />
        <Button type={'submit'} fullWidth>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreateCardModal;
