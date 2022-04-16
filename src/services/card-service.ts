import { Vcard } from '@/interfaces/cards/vcard';
import axiosInstance from '@/configurations/axios';
import { pipe, prop } from 'ramda';
import { AxiosResponse } from 'axios';
import { CreateVcardRequest } from '@/interfaces/cards/create-vcard-req';
import { ListingOptions } from '@/interfaces/shared/listing-options';
import { ListingResponse } from '@/interfaces/shared/listing-response';
import { ApiResponse } from '@/interfaces/shared/api-response';
import { UpdateVcardRequest } from '@/interfaces/cards/update-vcard-req';

const fetchCardListing = (options: ListingOptions<never>) => {
  return axiosInstance
    .get<ListingResponse<Vcard>>('/cards', {
      params: {
        page: options.pagination?.page,
        pageSize: options.pagination?.pageSize,
      },
    })
    .then(prop('data'));
};

const fetchCards = () =>
  axiosInstance
    .get<{ data: Vcard[] }>('/cards/all')
    .then(pipe(prop('data'), prop('data')));

const createCard = (payload: Partial<Vcard>) =>
  axiosInstance
    .post<Vcard, AxiosResponse<Vcard>, CreateVcardRequest>('/cards', payload)
    .then(prop('data'));

const fetchCard = (id: string) =>
  axiosInstance
    .get<ApiResponse<Vcard>>(`/cards/${id}`)
    .then(pipe(prop('data'), prop('data')));

const deleteCard = (id: string) =>
  axiosInstance.delete(`/cards/${id}`).then(prop('data'));

const updateCard = (id: string) => (payload: UpdateVcardRequest) =>
  axiosInstance
    .put<Vcard, AxiosResponse<Vcard>, UpdateVcardRequest>(
      `/cards/${id}`,
      payload,
    )
    .then(prop('data'));

const cardService = {
  createCard,
  deleteCard,
  fetchCards,
  fetchCard,
  updateCard,
  fetchCardListing,
};

export default cardService;
