import { format as fnsFormat } from 'date-fns';

const defaultTemplate = 'yyy-MM-dd HH:mm:ss';

const format =
  (template = defaultTemplate) =>
  (millis: number) =>
    fnsFormat(new Date(millis), template);

const formatDefault = format();

const dateUtils = {
  format,
  formatDefault,
};

export default dateUtils;
