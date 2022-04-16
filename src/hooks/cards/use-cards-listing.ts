import { useQuery } from 'react-query';
import cardService from '@/services/card-service';
import { ListingOptions } from '@/interfaces/shared/listing-options';

const useCardsListing = (options: ListingOptions<never>) => {
  return useQuery(
    ['card-listing', options.pagination?.page, options.pagination?.pageSize],
    () => cardService.fetchCardListing(options),
  );
};

export default useCardsListing;
