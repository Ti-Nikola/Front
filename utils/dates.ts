import * as dateFns from 'date-fns';
import { es } from 'date-fns/locale';

dateFns.setDefaultOptions({ locale: es });

export function formatAllDates<T>(data: T): T {
  const formattedData: any = Array.isArray(data) ? [...data] : { ...data };

  Object.keys(formattedData as object).forEach((key) => {
    const value = (formattedData as any)[key];

    if (value && typeof value === 'object' && !(value instanceof Date)) {
      (formattedData as any)[key] = formatAllDates(value); // Recursive call for nested objects
    } else if (value instanceof Date) {
      (formattedData as any)[key] = formatDateToISO(value);
    }
  });

  return formattedData as T;
}

export const formatDateToDisplay = (date: Date | string) => {
  if (!date) return '';
  if (typeof date === 'string') date = new Date(date);
  const day = dateFns.format(date, 'd');
  const month = dateFns.format(date, 'MMM');
  const year = dateFns.format(date, 'yyyy');

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} de ${capitalizedMonth}, ${year}`;
};

export const formatStrToDate = (date: string | undefined) => {
  // "2024-07-24"
  if (!date) return undefined;
  return dateFns.parse(date, 'yyyy-MM-dd', new Date());
};

export function formatDateToISO(date: Date | undefined): string | undefined {
  return date ? date.toISOString().split('T')[0] : undefined;
}
