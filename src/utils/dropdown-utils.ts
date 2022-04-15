import { SelectItem } from '@mantine/core';

export const createOption =
  <T>(label: keyof T | ((item: T) => string)) =>
  (value: keyof T) =>
  (data: T) => ({
    label: typeof label !== 'function' ? String(data[label]) : label(data),
    value: String(data[value]),
  });

export const createOptionStr =
  <T extends string>(label: (item: T) => string) =>
  (value: (item: T) => string) =>
  (data: T) => ({
    label: label(data),
    value: value(data),
  });

export const createOptions =
  <T>(transformer: (item: T) => SelectItem) =>
  (data: T[] | readonly T[]) =>
    data.map(transformer);

const dropdownUtils = {
  createOption,
  createOptions,
};

export default dropdownUtils;
