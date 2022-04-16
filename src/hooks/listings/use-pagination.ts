import { useCallback, useState } from 'react';

const INITIAL_STATE = {
  page: 1,
  pageSize: 10,
};

export interface PageOptions {
  page: number;
  pageSize: number;
}

interface PageResult {
  state: PageOptions;
  onChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  resetPage: () => void;
}

export const usePagination = (
  initialValues?: PageOptions | undefined,
): PageResult => {
  const [p, setPage] = useState(initialValues?.page ?? INITIAL_STATE.page);
  const [ps, setPageSize] = useState(
    initialValues?.pageSize ?? INITIAL_STATE.pageSize,
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  return {
    state: { page: p, pageSize: ps },
    onChange: setPage,
    onPageSizeChange: setPageSize,
    resetPage,
  };
};

export default usePagination;
