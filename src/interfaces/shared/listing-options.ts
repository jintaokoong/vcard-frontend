import { Pagination } from '@/interfaces/shared/pagination';

export interface ListingOptions<T> {
  pagination?: Pagination;
  filters?: T;
}
