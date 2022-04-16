import { useQuery } from 'react-query';
import cardService from '@/services/card-service';

const useCard = (id: string) => {
  return useQuery(['card', id], () => cardService.fetchCard(id));
};

export default useCard;
