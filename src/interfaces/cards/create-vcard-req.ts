import { Vcard } from '@/interfaces/cards/vcard';

export type CreateVcardRequest = Omit<
  Partial<Vcard>,
  '_id' | 'createdAt' | 'createdBy' | 'updatedAt'
>;
