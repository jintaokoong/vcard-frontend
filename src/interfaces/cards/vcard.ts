import { Address } from '@/interfaces/cards/address';

type Optional<T> = T | undefined;

export interface Vcard {
  _id: string;
  firstName: Optional<string>;
  lastName: Optional<string>;
  contact: Optional<string>;
  email: Optional<string>;
  address: Optional<Address>;
  title: Optional<string>;
  organization: Optional<string>;
  workContact: Optional<string>;
  workEmail: Optional<string>;
  workAddress: Optional<Address>;
  notes: Optional<string>;
  createdBy: Optional<string>;
  createdAt: number;
  updatedAt: number;
}
