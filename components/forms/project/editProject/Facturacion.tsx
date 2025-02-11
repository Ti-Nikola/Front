'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { patchProject } from '@/api/project/patchProject';
import { Divider } from '@/components/Divider';
import {
  ComboboxField,
  DatePickerField,
  InputField,
  RutField,
  SelectField,
  SwitchField,
} from '@/components/forms/Fields';
import { ProcessSchema, ProjectCoreSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  bancosChoices,
  distribuidorasChoices,
  facturacionChoices,
  financiamientoChoices,
} from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { Project, ProjectDetail } from '@/types/Project';
import { areValuesEqual } from '@/utils/comparison';
import { formatStr, parseProjectToPatch } from '@/utils/parseTypes';

export const EditFacturacionForm = ({
  data,
  triggerRefetch,
}: {
  data: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll md:max-w-[600px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Editar Tramitación</DialogTitle>
          <DialogDescription>
            Edita los campos de tramitación y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditFacturacionFormContent
            data={data}
            onClose={() => setOpen(false)}
            triggerRefetch={triggerRefetch}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const FacturacionSchema = z
  .object({
    id: z.number(),
  })
  .merge(
    ProjectCoreSchema.pick({
      centro_costo: true,
      rut_facturacion: true,
      razon_social: true,
      banco: true,
      financiamiento: true,
      facturacion_naturaleza: true,
      distribuidora: true,
    })
  )
  .merge(
    ProcessSchema.pick({
      numero_proceso_sec: true,
      numero_solicitud_f3: true,
      numero_solicitud_f5: true,
      folio_inscripcion_te4: true,
      codigo_verif_te4: true,

      fecha_ingreso_f3: true,
      fecha_aprobacion_f3: true,
      fecha_ingreso_f5: true,
      fecha_aprobacion_f5: true,
      fecha_ingreso_te4: true,
      fecha_aprobacion_te4: true,
      fecha_ingreso_te6: true,
      fecha_aprobacion_te6: true,

      manifestacion_conformidad: true,
    }).partial()
  );

function EditFacturacionFormContent({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    // Tramitación
    distribuidora: formatStr(data.distribuidora),
    numero_proceso_sec: formatStr(data.numero_proceso_sec),
    numero_solicitud_f3: formatStr(data.numero_solicitud_f3),
    numero_solicitud_f5: formatStr(data.numero_solicitud_f5),
    folio_inscripcion_te4: formatStr(data.folio_inscripcion_te4),
    codigo_verif_te4: formatStr(data.codigo_verif_te4),
    fecha_ingreso_f3: data.fecha_ingreso_f3 ? new Date(data.fecha_ingreso_f3) : undefined,
    fecha_aprobacion_f3: data.fecha_aprobacion_f3 ? new Date(data.fecha_aprobacion_f3) : undefined,
    fecha_ingreso_f5: data.fecha_ingreso_f5 ? new Date(data.fecha_ingreso_f5) : undefined,
    fecha_aprobacion_f5: data.fecha_aprobacion_f5 ? new Date(data.fecha_aprobacion_f5) : undefined,
    fecha_ingreso_te4: data.fecha_ingreso_te4 ? new Date(data.fecha_ingreso_te4) : undefined,
    fecha_aprobacion_te4: data.fecha_aprobacion_te4
      ? new Date(data.fecha_aprobacion_te4)
      : undefined,
    fecha_ingreso_te6: data.fecha_ingreso_te6 ? new Date(data.fecha_ingreso_te6) : undefined,
    fecha_aprobacion_te6: data.fecha_aprobacion_te6
      ? new Date(data.fecha_aprobacion_te6)
      : undefined,
    manifestacion_conformidad: data.manifestacion_conformidad,
    // Facturacion
    centro_costo: formatStr(data.centro_costo),
    rut_facturacion: formatStr(data.rut_facturacion),
    razon_social: formatStr(data.razon_social),
    banco: formatStr(data.banco),
    financiamiento: formatStr(data.financiamiento),
    facturacion_naturaleza: formatStr(data.facturacion_naturaleza),
  };

  const form = useForm<z.infer<typeof FacturacionSchema>>({
    resolver: zodResolver(FacturacionSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof FacturacionSchema>) {
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

  async function handleSubmit(data: z.infer<typeof FacturacionSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }
    const dataMapped = parseProjectToPatch(data as Partial<Project>);
    await patchProject(dataMapped);
    triggerRefetch();

    toast({ description: 'Projecto Actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-around gap-4 space-y-6"
      >
        <ComboboxField
          form={form}
          fieldId="distribuidora"
          fieldName="Distribuidora"
          options={distribuidorasChoices}
          containerClassName="mt-6"
        />
        <InputField
          form={form}
          fieldId="numero_proceso_sec"
          fieldName="Nº Proceso SEC"
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
          fieldId="folio_inscripcion_te4"
          fieldName="Folio Inscripción TE4"
          type="number"
        />
        <InputField
          form={form}
          fieldId="codigo_verif_te4"
          fieldName="Código Verif. TE4"
          type="number"
        />

        <DatePickerField form={form} fieldId="fecha_ingreso_f3" fieldName="Fecha Ingreso F3" />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_f3"
          fieldName="Fecha Aprobación F3"
        />
        <DatePickerField form={form} fieldId="fecha_ingreso_f5" fieldName="Fecha Ingreso F5" />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_f5"
          fieldName="Fecha Aprobación F5"
        />
        <DatePickerField form={form} fieldId="fecha_ingreso_te4" fieldName="Fecha Ingreso TE4" />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_te4"
          fieldName="Fecha Aprobación TE4"
        />
        <DatePickerField form={form} fieldId="fecha_ingreso_te6" fieldName="Fecha Ingreso TE6" />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_te6"
          fieldName="Fecha Aprobación TE6"
        />
        <SwitchField
          form={form}
          fieldId="manifestacion_conformidad"
          fieldName="Manifest. Conformidad"
          containerClassName="w-[250px] justify-between h-12 mt-3"
        />

        <Divider />

        <InputField form={form} fieldId="centro_costo" fieldName="Centro Costo" />
        <RutField form={form} fieldId="rut_facturacion" fieldName="RUT Facturación" />
        <InputField form={form} fieldId="razon_social" fieldName="Razón Social" />
        <ComboboxField form={form} fieldId="banco" fieldName="Banco" options={bancosChoices} />
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

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
