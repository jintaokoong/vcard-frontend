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
import { defaultTo, length, pipe, prop, when } from 'ramda';
import { createOption, createOptions } from '@/utils/dropdown-utils';
import countries from '@/constants/countries';
import { Country } from '@/interfaces/shared/country';
import { CreateVcardRequest } from '@/interfaces/cards/create-vcard-req';
import useCreateCard from '@/hooks/cards/use-create-card';
import { useEffect, useRef } from 'react';

/* eslint-disable */
interface Props extends SlimModalProps {}

const CreateCardModal = (props: Props) => {
  const { opened } = props;
  const [state, handlers] = useAccordionState({ initialItem: 0, total: 5 });
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVcardRequest>();
  const resetRef = useRef(reset);
  const { mutate, isLoading } = useCreateCard();

  const onValid = (values: CreateVcardRequest) => {
    mutate(values, {
      onSuccess: () => {
        props.onClose();
      },
    });
  };

  useEffect(() => {
    !opened && resetRef.current();
  }, [opened]);

  return (
    <Modal title={'Create New Card'} size={'lg'} {...props}>
      <form onSubmit={handleSubmit(onValid)}>
        <TextInput
          mx={'sm'}
          mb={'md'}
          label={'Card Label'}
          error={errors.label?.message}
          {...register('label', {
            validate: (value) => (!value ? 'Label is required' : undefined),
          })}
        />
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
                <TextInput {...register('firstName')} label={'First Name'} />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput {...register('lastName')} label={'Last Name'} />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'Contact'} {...register('contact')} />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'Email'} {...register('email')} />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item label={'Personal Address'}>
            <Grid>
              <Grid.Col>
                <TextInput
                  label={'Address Label'}
                  {...register('address.label')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'Street'} {...register('address.street')} />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'City'} {...register('address.city')} />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput label={'State'} {...register('address.state')} />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'Postal Code'}
                  {...register('address.postalCode')}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  control={control}
                  name={'address.countryCode'}
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
                      )(field.value ?? '')}
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
                <TextInput label={'Title'} {...register('title')} />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Organization'}
                  {...register('organization')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Work Contact'}
                  {...register('workContact')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'Work Email'} {...register('workEmail')} />
              </Grid.Col>
            </Grid>
          </Accordion.Item>
          <Accordion.Item label={'Work Address'}>
            <Grid>
              <Grid.Col>
                <TextInput
                  label={'Address Label'}
                  {...register('workAddress.label')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={'Street'}
                  {...register('workAddress.street')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput label={'City'} {...register('workAddress.city')} />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput label={'State'} {...register('workAddress.state')} />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  label={'Postal Code'}
                  {...register('workAddress.postalCode')}
                />
              </Grid.Col>
              <Grid.Col>
                <Controller
                  control={control}
                  name={'workAddress.countryCode'}
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
                      )(field.value ?? '')}
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
        <Button loading={isLoading} type={'submit'} fullWidth>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CreateCardModal;
