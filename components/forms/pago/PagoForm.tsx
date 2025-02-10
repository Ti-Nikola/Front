import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, PercentageField, SelectField, TextareaField } from '@/components/forms/Fields';
import {
  CreateExtraPagoSchema,
  EditExtraPagoSchema,
  EditNormalPagoSchema,
} from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { estadoDePagoChoices } from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/utils/cn';

const allDefaultValues: Partial<z.infer<typeof EditNormalPagoSchema | typeof EditExtraPagoSchema>> =
  {
    monto: '0',
    estado: 'Ok por el momento',
  };

export const PagoForm = <
  T extends typeof EditNormalPagoSchema | typeof EditExtraPagoSchema | typeof CreateExtraPagoSchema,
>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title,
}: {
  schema: T;
  handleSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  title?: string;
}) => {
  const { toast } = useToast();

  const isNormalPayment = schema === EditNormalPagoSchema;

  const mergedDefaultValues: DefaultValues<z.infer<T>> = {
    ...allDefaultValues,
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
        className={`flex flex-col justify-around gap-4 ${className}`}
      >
        <div className="flex items-start justify-around gap-4">
          <div className="flex flex-col gap-4">
            <InputField form={form} fieldId="monto" fieldName="Monto" type="number" />
            {isNormalPayment && (
              <PercentageField form={form} fieldId="porcentaje" fieldName="Porcentaje" />
            )}
            <InputField form={form} fieldId="valor_pago" fieldName="Valor" type="number" />
            <SelectField
              form={form}
              fieldId="estado"
              fieldName="Estado de Pago"
              options={estadoDePagoChoices}
            />
          </div>
          <div className="flex flex-col gap-4">
            <InputField form={form} fieldId="numero_pago" fieldName="Nº de Hito" type="number" />
            <TextareaField
              form={form}
              fieldId="mensaje"
              fieldName="Descripción"
              className={cn('w-[300px]', isNormalPayment ? 'h-[200px]' : 'h-[150px]')}
            />
          </div>
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
