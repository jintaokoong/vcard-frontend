import { useMutation, useQueryClient } from 'react-query';
import { Vcard } from '@/interfaces/cards/vcard';
import { CreateVcardRequest } from '@/interfaces/cards/create-vcard-req';
import cardService from '@/services/card-service';

const useCreateCard = () => {
  const queryClient = useQueryClient();
  return useMutation<Vcard, never, CreateVcardRequest>(
    ['create-card'],
    cardService.createCard,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cards']);
      },
    },
  );
};

export default useCreateCard;
