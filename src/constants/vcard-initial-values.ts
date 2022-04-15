import { Vcard } from '@/interfaces/cards/vcard';
import { BasicInfo } from '@/interfaces/cards/basic-info';
import { Address } from '@/interfaces/cards/address';
import { WorkInfo } from '@/interfaces/cards/work-info';

const address: Address = {
  city: '',
  countryCode: '',
  label: '',
  postalCode: '',
  state: '',
  street: '',
} as const;

const basicInfo: BasicInfo = {
  address: address,
  contact: '',
  email: '',
  firstName: '',
  lastName: '',
} as const;

const workInfo: WorkInfo = {
  address: address,
  contact: '',
  email: '',
  organization: '',
  title: '',
} as const;

export const vcardInitialValues: Vcard = {
  basicInfo: basicInfo,
  notes: '',
  workInfo: workInfo,
};
