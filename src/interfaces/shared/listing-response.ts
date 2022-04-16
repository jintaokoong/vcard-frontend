export interface ListingResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}
