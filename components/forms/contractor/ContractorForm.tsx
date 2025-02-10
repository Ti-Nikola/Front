import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, PercentageField } from '@/components/forms/Fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/utils/cn';

import { ContractorSchema } from '../Schemas';

export const ContractorFormSchema = ContractorSchema.omit({ id: true });

export const OptionalContractorFormSchema = ContractorSchema.partial();

const completeDefaultValues: z.infer<typeof ContractorFormSchema> = {
  nombre: '',
  telefono: '',
  mail: '',
  rut: '',
  rut_empresa: '',
  nombre_empresa: '',
  representante_empresa: '',
  porcentaje_de_pago_1: '0.00',
  porcentaje_de_pago_2: '90.00',
  porcentaje_de_pago_3: '10.00',
};

export const ContractorForm = <
  T extends typeof ContractorFormSchema | typeof OptionalContractorFormSchema,
>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title = 'Crear Contratista',
}: {
  schema: T;
  handleSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  title?: string;
}) => {
  const { toast } = useToast();

  const mergedDefaultValues: DefaultValues<z.infer<T>> = {
    ...completeDefaultValues,
    ...defaultValues,
  } as DefaultValues<z.infer<T>>;

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: mergedDefaultValues,
  });

  function onSubmit(data: z.infer<T>) {
    try {
      handleSubmit(data);
    } catch (error) {
      console.error('Submission failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: String(error),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-wrap justify-around gap-4 space-x-4 space-y-6', className)}
      >
        <InputField
          form={form}
          fieldId="nombre"
          fieldName="Nombre"
          containerClassName="ml-4 mt-6"
        />
        <InputField
          form={form}
          fieldId="telefono"
          fieldName="Teléfono"
          tooltip="Sin + ni espacios"
          tooltipClassName="right-[50px]"
        />
        <InputField form={form} fieldId="mail" fieldName="Email" />
        <InputField form={form} fieldId="rut" fieldName="RUT" />
        <InputField form={form} fieldId="rut_empresa" fieldName="RUT Empresa" />
        <InputField form={form} fieldId="nombre_empresa" fieldName="Nombre Empresa" />
        <InputField form={form} fieldId="representante_empresa" fieldName="Representante Empresa" />
        <PercentageField
          form={form}
          fieldId="porcentaje_de_pago_1"
          fieldName="Porcentaje de Pago 1"
        />
        <PercentageField
          form={form}
          fieldId="porcentaje_de_pago_2"
          fieldName="Porcentaje de Pago 2"
        />
        <PercentageField
          form={form}
          fieldId="porcentaje_de_pago_3"
          fieldName="Porcentaje de Pago 3"
        />
        <div className="flex w-full justify-center">
          <Button className="mt-12 px-12" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </Form>
  );
};
