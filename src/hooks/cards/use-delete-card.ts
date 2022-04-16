import { useMutation, useQueryClient } from 'react-query';
import cardService from '@/services/card-service';
import { AxiosError } from 'axios';
import { ApiError } from '@/interfaces/shared/api-error';

const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, string>(
    ['delete-card'],
    cardService.deleteCard,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cards-listing']);
      },
    },
  );
};

export default useDeleteCard;
