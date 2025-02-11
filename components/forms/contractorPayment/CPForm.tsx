import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { getContractor } from '@/api/contractor/getContractor';
import { ComboboxField, InputField, SelectField, TextareaField } from '@/components/forms/Fields';
import { CreateExtraCPSchema, EditCPSchema, EditExtraCPSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { estadoDePagoChoices, pagoContratistaChoices } from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { Contractor } from '@/types/Contractor';

const normalDefaultValues: Partial<z.infer<typeof EditCPSchema>> = {
  tipo_pago: 'Avance',
  valor_pago: '0',
  estado_de_pago: 'Ok por el momento',
  is_extra: false,
};

const extraDefaultValues: Partial<z.infer<typeof EditExtraCPSchema>> = {
  valor_pago: '0',
  estado_de_pago: 'Ok por el momento',
  is_extra: true,
};

export const CPForm = <
  T extends typeof EditCPSchema | typeof EditExtraCPSchema | typeof CreateExtraCPSchema,
>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title = 'Crear Pago a Contratista',
}: {
  schema: T;
  handleSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  title?: string;
}) => {
  const { toast } = useToast();

  const [contractors, setContractors] = useState<Contractor[] | null>(null);

  const isNormalPayment = schema === EditCPSchema;
  console.log('isNormalPayment', isNormalPayment);
  console.log('schema', schema);
  console.log('EditCPSchema', EditCPSchema);
  console.log('are equal', schema === EditCPSchema);

  const mergedDefaultValues: DefaultValues<z.infer<T>> = {
    ...(isNormalPayment ? normalDefaultValues : extraDefaultValues),
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

  useEffect(() => {
    const fetchContractorMembers = async () => {
      const contractor = await getContractor();
      setContractors(contractor);
    };

    fetchContractorMembers();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-col justify-around gap-4 ${className}`}
      >
        <div className="flex items-start justify-around gap-4">
          <div className="flex flex-col gap-4">
            {isNormalPayment ? (
              <SelectField
                form={form}
                fieldId="tipo_pago"
                fieldName="Tipo de Pago"
                options={pagoContratistaChoices}
              />
            ) : (
              <ComboboxField
                form={form}
                options={
                  contractors?.map((contractor) => ({
                    value: contractor.id,
                    label: contractor.nombre,
                  })) ?? []
                }
                fieldId="contractor"
                fieldName="Contratista"
                inputPlaceholder="Buscar..."
                formDescription="Elige el contratista al que se le pagará"
              />
            )}
            <InputField form={form} fieldId="valor_pago" fieldName="Valor" type="number" />
            <SelectField
              form={form}
              fieldId="estado_de_pago"
              fieldName="Estado de Pago"
              options={estadoDePagoChoices}
            />
          </div>
          <TextareaField
            form={form}
            fieldId="descripcion"
            fieldName="Descripción"
            className="h-[200px] w-[300px] text-start"
          />
        </div>
        <div className="flex w-full justify-center">
          <Button className="mt-12 px-12" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </Form>
  );
};
