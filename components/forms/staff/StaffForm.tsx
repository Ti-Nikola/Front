import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputField, PhoneField, SelectField } from '@/components/forms/Fields';
import { StaffSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { areaChoices, rolChoices } from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/utils/cn';

export const StaffFormSchema = StaffSchema.omit({ id: true });

export const OptionalStaffFormSchema = StaffSchema.partial();

export const StaffForm = <T extends typeof StaffFormSchema | typeof OptionalStaffFormSchema>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title = 'Crear Staff',
}: {
  schema: T;
  handleSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  title?: string;
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>> | undefined,
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
          fieldId="nombre_completo"
          fieldName="Nombre"
          containerClassName="ml-4 mt-6"
        />
        <PhoneField form={form} fieldId="telefono" fieldName="Teléfono" />
        <InputField form={form} fieldId="mail" fieldName="Email" />
        <InputField form={form} fieldId="rut" fieldName="RUT" />
        <SelectField form={form} fieldId="area" fieldName="Área" options={areaChoices} />
        <SelectField form={form} fieldId="rol" fieldName="Rol" options={rolChoices} />
        <div className="flex w-full justify-center">
          <Button className="mt-12 px-12" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </Form>
  );
};
