'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePickerField, InputField, SwitchField } from '@/components/forms/Fields';
import { ProcessSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ProjectPost } from '@/types/Project';
import { parseProcessToPost } from '@/utils/parseTypes';

const SecProcessSchema = ProcessSchema.partial();

type SecProcessSchema = z.infer<typeof SecProcessSchema>;

export const CreateProjectProcessForm = ({
  updateProject,
  handleStep,
}: {
  updateProject: (data: Partial<ProjectPost>) => void;
  handleStep: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues: Partial<SecProcessSchema> = {
    numero_proceso_sec: '0',
    numero_solicitud_f3: '0',
    numero_solicitud_f5: '0',
    codigo_verif_te4: '0',
    folio_inscripcion_te4: '0',
    manifestacion_conformidad: false,
  };

  const form = useForm<SecProcessSchema>({
    resolver: zodResolver(SecProcessSchema),
    defaultValues,
  });

  function onSubmit(data: SecProcessSchema) {
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

  async function handleSubmit(data: SecProcessSchema) {
    const project = parseProcessToPost(data);
    updateProject(project);

    toast({ description: 'Proceso Creado' });
    handleStep();
  }

  return (
    <>
      <h1 className="mb-12 text-3xl font-medium">Crear Proceso</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap justify-start gap-4 space-x-8 space-y-2"
        >
          <InputField
            form={form}
            fieldId="numero_proceso_sec"
            fieldName="Nº proceso SEC"
            className="ml-8 mt-2"
            type="number"
          />
          <InputField
            form={form}
            fieldId="numero_solicitud_f3"
            fieldName="Nº solicitud F3"
            type="number"
          />
          <InputField
            form={form}
            fieldId="numero_solicitud_f5"
            fieldName="Nº solicitud F5"
            type="number"
          />
          <InputField
            form={form}
            fieldId="codigo_verif_te4"
            fieldName="Código Verif. TE4"
            type="number"
          />
          <InputField
            form={form}
            fieldId="folio_inscripcion_te4"
            fieldName="Folio Inscripción TE4"
            type="number"
          />
          <SwitchField
            form={form}
            fieldId="manifestacion_conformidad"
            fieldName="Manifest. Conformidad"
            containerClassName="w-[250px] h-12 relative top-3"
          />

          <div className="h-2 w-full" />

          <DatePickerField
            form={form}
            fieldId="fecha_ingreso_f3"
            fieldName="Fecha Ingreso F3"
            placeholder=" "
          />
          <DatePickerField
            form={form}
            fieldId="fecha_aprobacion_f3"
            fieldName="Fecha Aprobación F3"
            placeholder=" "
          />

          <DatePickerField
            form={form}
            fieldId="fecha_ingreso_f5"
            fieldName="Fecha Ingreso F5"
            placeholder=" "
          />
          <DatePickerField
            form={form}
            fieldId="fecha_aprobacion_f5"
            fieldName="Fecha Aprobación F5"
            placeholder=" "
          />

          <DatePickerField
            form={form}
            fieldId="fecha_ingreso_te4"
            fieldName="Fecha Ingreso TE4"
            placeholder=" "
          />
          <DatePickerField
            form={form}
            fieldId="fecha_aprobacion_te4"
            fieldName="Fecha Aprobación TE4"
            placeholder=" "
          />

          <DatePickerField
            form={form}
            fieldId="fecha_ingreso_te6"
            fieldName="Fecha Ingreso TE6"
            placeholder=" "
          />
          <DatePickerField
            form={form}
            fieldId="fecha_aprobacion_te6"
            fieldName="Fecha Aprobación TE6"
            placeholder=" "
          />
          <div className="flex w-full justify-center">
            <Button type="submit" className="w-40">
              Siguiente
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
