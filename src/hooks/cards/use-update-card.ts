import { useMutation, useQueryClient } from 'react-query';
import cardService from '@/services/card-service';
import { Vcard } from '@/interfaces/cards/vcard';
import { AxiosError } from 'axios';
import { ApiError } from '@/interfaces/shared/api-error';
import { UpdateVcardRequest } from '@/interfaces/cards/update-vcard-req';

const useUpdateCard = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Vcard, AxiosError<ApiError>, UpdateVcardRequest>(
    ['update-card', id],
    cardService.updateCard(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cards-listing']);
      },
    },
  );
};

export default useUpdateCard;
