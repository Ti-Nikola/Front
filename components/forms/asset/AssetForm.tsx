import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { getStaff } from '@/api/staff/getStaff';
import { ComboboxField, DatePickerField, InputField } from '@/components/forms/Fields';
import { AssetSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { OptionsArray } from '@/types/Generic';
import { Staff } from '@/types/Staff';
import { cn } from '@/utils/cn';

export const AssetFormSchema = AssetSchema.omit({ id: true });

export const OptionalAssetFormSchema = AssetSchema.partial();

export const AssetForm = <T extends typeof AssetFormSchema | typeof OptionalAssetFormSchema>({
  schema,
  handleSubmit,
  defaultValues,
  className,
  title = 'Crear Activo',
}: {
  schema: T;
  handleSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  title?: string;
}) => {
  const { toast } = useToast();
  const [staff, setStaff] = useState<OptionsArray>([]);

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

  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await getStaff();
      const mappedStaff = staff.map((member: Staff) => ({
        label: member.nombre_completo,
        value: member.id,
      }));
      setStaff(mappedStaff);
    };
    fetchStaff();
  }, []);

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
        <ComboboxField form={form} fieldId="responsable" fieldName="Responsable" options={staff} />
        <InputField form={form} fieldId="valor" fieldName="Valor" type="number" />
        <InputField form={form} fieldId="codigo_interno" fieldName="Código Interno" />
        <InputField form={form} fieldId="numero_factura" fieldName="Nº Factura" type="number" />
        <DatePickerField form={form} fieldId="fecha_adquisicion" fieldName="Fecha de Adquisición" />
        <div className="flex w-full justify-center">
          <Button className="my-6 px-12" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </Form>
  );
};
