import { z } from 'zod';

import { removeNonNumericAndLeadingZeros } from './numbers';

export const z_number = z
  .string({ required_error: 'Obligatorio' })
  .refine((val) => !val || !isNaN(Number(removeNonNumericAndLeadingZeros(val))), {
    message: 'Debe ser un número',
  })
  .refine((val) => Number(removeNonNumericAndLeadingZeros(val)) >= 0, {
    message: 'Debe ser positivo',
  })
  .refine((val) => Number(removeNonNumericAndLeadingZeros(val)) < 2147483647, {
    message: 'Debe ser menor a 2.147.483.647',
  });

export const z_decimal = z
  .string()
  .min(4, { message: 'Debe tener 4 caracteres como mínimo' }) // 0.00
  .max(10, { message: 'Debe tener 10 caracteres como máximo' })
  .includes('.', { message: 'Debe tener un punto decimal' });

export const z_percentage = z
  .string()
  .min(4, { message: 'Debe tener 4 caracteres como mínimo' })
  .max(5, { message: 'Debe tener 5 caracteres como máximo' })
  .includes('.', { message: 'Debe tener un punto decimal' });

export const z_string = z.string({
  required_error: 'Obligatorio',
  invalid_type_error: 'Debe ser un string',
});

export const z_boolean = z.boolean({
  required_error: 'Obligatorio',
  invalid_type_error: 'Debe ser un boolean',
});

export const z_small_int = z
  .string({ required_error: 'Obligatorio' })
  .refine((val) => !val || !isNaN(Number(removeNonNumericAndLeadingZeros(val))), {
    message: 'Debe ser un número',
  })
  .refine((val) => Number(removeNonNumericAndLeadingZeros(val)) >= 0, {
    message: 'Debe ser positivo',
  })
  .refine((val) => Number(removeNonNumericAndLeadingZeros(val)) < 32767, {
    message: 'Debe ser menor a 32.767',
  });
