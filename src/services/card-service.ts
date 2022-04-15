import { Vcard } from '@/interfaces/cards/vcard';
import axiosInstance from '@/configurations/axios';
import { identity, pipe, prop } from 'ramda';
import { AxiosResponse } from 'axios';
import { CreateVcardRequest } from '@/interfaces/cards/create-vcard-req';

const fetchCards = () =>
  axiosInstance
    .get<{ data: Vcard[] }>('/cards')
    .then(pipe(prop('data'), prop('data')));

const createCard = (payload: Partial<Vcard>) =>
  axiosInstance
    .post<Vcard, AxiosResponse<Vcard>, CreateVcardRequest>('/cards', payload)
    .then(prop('data'));

const cardService = {
  createCard,
  fetchCards,
};

export default cardService;
