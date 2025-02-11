import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, PhoneField, RutField } from '@/components/forms/Fields';
import { ClientSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

export const OptionalClientFormSchema = ClientSchema.partial();

export const ClientFormSchema = ClientSchema.omit({ id: true });

const completeDefaultValues: z.infer<typeof ClientFormSchema> = {
  nombre_completo: '',
  telefono: '',
  mail: '',
  rut: '',
};

export const ClientForm = <T extends typeof ClientFormSchema | typeof OptionalClientFormSchema>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title = 'Crear Cliente',
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
        className={`flex flex-wrap justify-around gap-4 ${className}`}
      >
        <InputField form={form} fieldId="nombre_completo" fieldName="Nombre Completo" />
        <PhoneField form={form} fieldId="telefono" fieldName="Teléfono" />
        <InputField form={form} fieldId="mail" fieldName="Email" />
        <RutField form={form} fieldId="rut" fieldName="RUT" />
        <div className="my-4 flex w-full items-end justify-center">
          <Button className="min-w-[200px]" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </Form>
  );
};
