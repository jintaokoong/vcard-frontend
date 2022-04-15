import { useQuery } from 'react-query';
import cardService from '@/services/card-service';

const useCards = () => useQuery(['cards'], cardService.fetchCards);

export default useCards;
