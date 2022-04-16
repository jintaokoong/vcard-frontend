import { useBooleanToggle } from '@mantine/hooks';

const useBooleanModal = () => {
  const [opened, setOpened] = useBooleanToggle();
  const onClose = () => setOpened(false);
  const onOpen = () => setOpened(true);

  return {
    opened,
    onOpen,
    onClose,
  };
};

export default useBooleanModal;
