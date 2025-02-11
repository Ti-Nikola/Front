'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  ComboboxField,
  DatePickerField,
  InputField,
  RutField,
  SelectField,
  TextareaField,
} from '@/components/forms/Fields';
import { ProjectCoreSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  ProyectoType,
  bancosChoices,
  comunasChoices,
  distribuidorasChoices,
  estadosChoices,
  etapasChoices,
  facturacionChoices,
  financiamientoChoices,
  opcionTarifaChoices,
  tipoProyectoChoices,
} from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { ProjectPost } from '@/types/Project';
import { getProjectKey } from '@/utils/getProjectTitle';
import { parsePartialProject } from '@/utils/parseTypes';
import { z_string } from '@/utils/zodTypes';

const FormSchema = ProjectCoreSchema.omit({
  id: true,
  client: true,
  vendedor: true,
  ingeniero: true,
  contratista: true,
})
  .partial({
    comentarios: true,
    coordenadas: true,
    numero_medidor: true,
    num_cliente_distribuidora: true,
    opcion_tarifa: true,
    presupuesto_original_contratista: true,
    fecha_inicio_obra: true,
    fecha_termino_obra: true,
    fecha_firma_contrato: true,
  })
  .extend({
    tipo_proyecto: z_string,
  });

type FormSchema = z.infer<typeof FormSchema>;

export const CreateProjectForm = ({
  updateProject,
  clientName,
}: {
  updateProject: (data: Partial<ProjectPost>, post?: boolean) => void;
  clientName: string;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    etapa_proyecto: 'Bienvenida',
    estado_proyecto: 'verde',
    cantidad_pagos: '4',
    fecha_firma_contrato: new Date(),
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: FormSchema) {
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

  async function handleSubmit(data: FormSchema) {
    const project = parsePartialProject(data);
    updateProject(project, true);
  }

  const keyValue = form.watch('key');
  const projectTypeValue = form.watch('tipo_proyecto');

  useEffect(() => {
    if (!clientName || !projectTypeValue || !keyValue) return;

    const titulo = `${getProjectKey(projectTypeValue as ProyectoType, keyValue)} - ${clientName}`;
    const centroCosto = `${getProjectKey(projectTypeValue as ProyectoType, keyValue)} - ${clientName.toUpperCase()}`;

    form.setValue('titulo', titulo);
    form.setValue('centro_costo', centroCosto);
  }, [keyValue, projectTypeValue, clientName, form]);

  return (
    <>
      <h1 className="mb-12 text-3xl font-medium">Crear Proyecto</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="-mt-12 flex flex-col items-center justify-center"
        >
          <div className="mb-8 flex flex-wrap items-center justify-around gap-4 space-x-4 space-y-6">
            <SelectField
              form={form}
              fieldId="tipo_proyecto"
              fieldName="Tipo de Proyecto"
              options={tipoProyectoChoices}
              containerClassName="mt-6 ml-4"
            />
            <InputField form={form} fieldId="key" fieldName="Key" type="number" />

            <InputField form={form} fieldId="titulo" fieldName="Título" disabled={true} />

            <InputField form={form} fieldId="razon_social" fieldName="Razón Social" />
            <RutField form={form} fieldId="rut_facturacion" fieldName="Rut Facturación" />

            <ComboboxField
              form={form}
              options={comunasChoices}
              fieldId="comuna"
              fieldName="Comunas"
              inputPlaceholder="Buscar comuna..."
            />
            <InputField form={form} fieldId="direccion" fieldName="Dirección" />
            <InputField form={form} fieldId="coordenadas" fieldName="Coordenadas" />

            <ComboboxField
              form={form}
              fieldId="distribuidora"
              fieldName="Distribuidora"
              options={distribuidorasChoices}
            />
            <InputField form={form} fieldId="numero_medidor" fieldName="Nº de medidor" />
            <InputField
              form={form}
              fieldId="num_cliente_distribuidora"
              fieldName="Nº cliente distribuidora"
            />

            <InputField
              form={form}
              fieldId="precio_venta_neto"
              fieldName="Precio Venta Neto"
              type="number"
            />
            <InputField
              form={form}
              fieldId="presupuesto_original_contratista"
              fieldName="Presupuesto Original Contratista"
              type="number"
            />
            <ComboboxField form={form} fieldId="banco" fieldName="Banco" options={bancosChoices} />
            <SelectField
              form={form}
              fieldId="opcion_tarifa"
              fieldName="Opción Tarifa"
              options={opcionTarifaChoices}
            />
            <SelectField
              form={form}
              fieldId="financiamiento"
              fieldName="Financiamiento"
              options={financiamientoChoices}
            />
            <SelectField
              form={form}
              fieldId="facturacion_naturaleza"
              fieldName="Facturacion Naturaleza"
              options={facturacionChoices}
            />

            <InputField
              form={form}
              fieldId="cantidad_pagos"
              fieldName="Cantidad de pagos"
              type="number"
            />

            <ComboboxField
              form={form}
              options={etapasChoices}
              fieldId="etapa_proyecto"
              fieldName="Etapas"
              inputPlaceholder="Buscar etapa..."
            />
            <SelectField
              form={form}
              options={estadosChoices}
              fieldId="estado_proyecto"
              fieldName="Estados"
            />

            <DatePickerField
              form={form}
              fieldId="fecha_firma_contrato"
              fieldName="Fecha firma contrato"
            />
            <DatePickerField
              form={form}
              fieldId="fecha_inicio_obra"
              fieldName="Fecha inicio obras"
            />
            <DatePickerField
              form={form}
              fieldId="fecha_termino_obra"
              fieldName="Fecha término obras"
            />
            <TextareaField form={form} fieldId="comentarios" fieldName="Comentarios" />
          </div>
          <Button type="submit" className="px-10">
            Crear
          </Button>
        </form>
      </Form>
    </>
  );
};
