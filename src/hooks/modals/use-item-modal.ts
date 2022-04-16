import { useState } from 'react';

const useItemModal = <T>() => {
  const [item, setItem] = useState<T>();
  return {
    opened: item !== undefined,
    item,
    onOpen: (i: T) => setItem(i),
    onClose: () => setItem(undefined),
  };
};

export default useItemModal;
