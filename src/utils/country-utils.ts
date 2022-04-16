import { Country } from '@/interfaces/shared/country';
import { compose, defaultTo, find, pipe, prop } from 'ramda';

const findCountryByCode = (countries: Country[]) => (code: string) =>
  find<Country>((c) => c.code === code)(countries);

const getCountryName = (country: Country | undefined): string =>
  country === undefined ? '' : pipe(prop('name'), defaultTo(''))(country);

const getCountryNameByCode = (countries: Country[]) =>
  compose(getCountryName, findCountryByCode(countries), defaultTo(''));

const countryUtils = {
  findCountryByCode,
  getCountryName,
  getCountryNameByCode,
};

export default countryUtils;
