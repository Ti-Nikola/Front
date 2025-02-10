'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { patchProject } from '@/api/project/patchProject';
import { Divider } from '@/components/Divider';
import {
  ComboboxField,
  DatePickerField,
  DecimalField,
  InputField,
  SelectField,
  SwitchField,
  TextareaField,
} from '@/components/forms/Fields';
import { ProjectSchema } from '@/components/forms/Schemas';
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
  cargadorElectricoChoices,
  comunasChoices,
  estadosChoices,
  etapasChoices,
  opcionTarifaChoices,
  sistemaRespaldoChoices,
  tipoEmpalmeChoices,
  tipoInstalacionChoices,
  tipoProyectoChoices,
} from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { OptionsArray } from '@/types/Generic';
import { Project, ProjectDetail } from '@/types/Project';
import { cn } from '@/utils/cn';
import { areValuesEqual } from '@/utils/comparison';
import { formatStrToDate } from '@/utils/dates';
import { fetchTeam } from '@/utils/fetchTeam';
import { formatStr, parseProjectToPatch } from '@/utils/parseTypes';
import { EditText } from '@/utils/text';

export const EditProjectDetailsForm = ({
  data,
  triggerRefetch,
}: {
  data: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const txt = new EditText('Proyecto');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll md:max-w-[600px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{txt.title}</DialogTitle>
          <DialogDescription>{txt.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditProjectForm
            data={data}
            onClose={() => setOpen(false)}
            triggerRefetch={triggerRefetch}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FormSchema = ProjectSchema.pick({
  id: true,
  key: true,
  titulo: true,
  tipo_proyecto: true,
  tipo_instalacion: true,
  etapa_proyecto: true,
  estado_proyecto: true,
  num_cliente_distribuidora: true,
  peak_kwp: true,
  potencia_kw: true,
  sistema_respaldo: true,
  direccion: true,
  comuna: true,
  vendedor: true,
  ingeniero: true,
  contratista: true,
  fecha_inicio_obra: true,
  fecha_termino_obra: true,
  fecha_firma_contrato: true,
  // Otros
  numero_medidor: true,
  opcion_tarifa: true,
  numero_baterias: true,
  capacidad_baterias_kwh: true,
  potencia_conectada_casa_kw: true,
  diferencial_mA: true,
  proteccion_empalme_A: true,
  potencia_panel_Wp: true,
  numero_paneles: true,
  cargador_electrico: true,
  tipo_empalme: true,
  diferencial_presenta_caidas: true,
  coordenadas: true,
  comentarios: true,
}).partial();

type FormSchema = z.infer<typeof FormSchema>;

function EditProjectForm({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) {
  const { toast } = useToast();

  const [vendors, setVendors] = useState<OptionsArray>([]);
  const [engineers, setEngineers] = useState<OptionsArray>([]);
  const [contractors, setContractors] = useState<OptionsArray>([]);

  const defaultValues = {
    // Proyecto
    id: data.id,
    key: formatStr(data.key),
    titulo: formatStr(data.titulo),
    tipo_proyecto: formatStr(data.tipo_proyecto),
    tipo_instalacion: formatStr(data.tipo_instalacion),
    etapa_proyecto: formatStr(data.etapa_proyecto),
    estado_proyecto: formatStr(data.estado_proyecto),

    num_cliente_distribuidora: formatStr(data.num_cliente_distribuidora),
    peak_kwp: data.peak_kwp,
    potencia_kw: data.potencia_kw,
    sistema_respaldo: formatStr(data.sistema_respaldo),

    direccion: formatStr(data.direccion),
    coordenadas: formatStr(data.coordenadas),
    comuna: data.comuna,
    vendedor: data.vendedor,
    ingeniero: data.ingeniero,
    contratista: data.contratista,

    fecha_inicio_obra: formatStrToDate(data.fecha_inicio_obra),
    fecha_termino_obra: formatStrToDate(data.fecha_termino_obra),
    fecha_firma_contrato: formatStrToDate(data.fecha_firma_contrato),

    // Otros
    numero_medidor: formatStr(data.numero_medidor),
    opcion_tarifa: formatStr(data.opcion_tarifa),
    numero_baterias: formatStr(data.numero_baterias, '0'),
    capacidad_baterias_kwh: formatStr(data.capacidad_baterias_kwh, '0.00'),
    potencia_conectada_casa_kw: formatStr(data.potencia_conectada_casa_kw, '0.00'),

    diferencial_mA: formatStr(data.diferencial_mA, '0.00'),
    proteccion_empalme_A: formatStr(data.proteccion_empalme_A, '0.00'),

    potencia_panel_Wp: formatStr(data.potencia_panel_Wp, '550'),
    numero_paneles: formatStr(data.numero_paneles, '0'),
    cargador_electrico: formatStr(data.cargador_electrico),
    tipo_empalme: formatStr(data.tipo_empalme),
    diferencial_presenta_caidas: data.diferencial_presenta_caidas,
    comentarios: formatStr(data.comentarios),
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
    if (defaultValues && data && areValuesEqual(defaultValues, data)) {
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

  useEffect(() => {
    fetchTeam({ setVendors, setEngineers, setContractors });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-around gap-4 space-y-6"
      >
        <SelectField
          form={form}
          options={tipoProyectoChoices}
          fieldId="tipo_proyecto"
          fieldName="Tipo Proyecto"
          containerClassName="mt-6"
        />
        <InputField form={form} fieldId="key" fieldName="Key" type="number" />
        <InputField
          form={form}
          fieldId="titulo"
          fieldName="Título"
          tooltip='¡Atención! Al cambiar manualmente el título debe actualizar el "Tipo Proyecto", "Key" o "Nombre Cliente" por consistencia.'
          tooltipClassName="w-[300px] right-[120px]"
        />
        <SelectField
          form={form}
          options={tipoInstalacionChoices}
          fieldId="tipo_instalacion"
          fieldName="Tipo Instalación"
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

        <InputField
          form={form}
          fieldId="num_cliente_distribuidora"
          fieldName="Nº Cliente Distribuidora"
        />
        <DecimalField form={form} fieldId="peak_kwp" fieldName="Potencia Peak (kWp)" />
        <DecimalField form={form} fieldId="potencia_kw" fieldName="Potencia Inversor (kW)" />
        <SelectField
          form={form}
          fieldId="sistema_respaldo"
          fieldName="Sistema Respaldo"
          options={sistemaRespaldoChoices}
        />

        <InputField form={form} fieldId="direccion" fieldName="Dirección" />
        <ComboboxField
          form={form}
          options={comunasChoices}
          fieldId="comuna"
          fieldName="Comunas"
          inputPlaceholder="Buscar comuna..."
        />

        <ComboboxField
          form={form}
          options={engineers}
          fieldId="ingeniero"
          fieldName="Ingeniero"
          inputPlaceholder="Selecciona un ingeniero..."
        />
        <ComboboxField
          form={form}
          options={vendors}
          fieldId="vendedor"
          fieldName="Vendedor"
          inputPlaceholder="Selecciona un vendedor..."
        />
        <ComboboxField
          form={form}
          options={contractors}
          fieldId="contratista"
          fieldName="Contratista"
          inputPlaceholder="Selecciona un contratista..."
        />

        <DatePickerField
          form={form}
          fieldId="fecha_firma_contrato"
          fieldName="Fecha firma contrato"
        />
        <DatePickerField form={form} fieldId="fecha_inicio_obra" fieldName="Fecha inicio obras" />
        <DatePickerField form={form} fieldId="fecha_termino_obra" fieldName="Fecha término obras" />

        <Divider />

        <InputField form={form} fieldId="numero_medidor" fieldName="Nº Medidor" />
        <ComboboxField
          form={form}
          fieldId="opcion_tarifa"
          fieldName="Opción Tarifa"
          options={opcionTarifaChoices}
        />
        <InputField form={form} fieldId="numero_paneles" fieldName="Nº Paneles" type="number" />
        <InputField form={form} fieldId="numero_baterias" fieldName="Nº Baterías" type="number" />
        <DecimalField
          form={form}
          fieldId="capacidad_baterias_kwh"
          fieldName="Capacidad Baterias (kWh)"
        />
        <DecimalField
          form={form}
          fieldId="potencia_conectada_casa_kw"
          fieldName="Potencia Conectada Casa (kW)"
        />
        <DecimalField form={form} fieldId="diferencial_mA" fieldName="Diferencial (mA)" />
        <DecimalField
          form={form}
          fieldId="proteccion_empalme_A"
          fieldName="Proteccion de Empalme (A)"
        />
        <InputField
          form={form}
          fieldId="potencia_panel_Wp"
          fieldName="Potencia Panel (Wp)"
          type="number"
        />
        <SelectField
          form={form}
          fieldId="tipo_empalme"
          fieldName="Tipo de Empalme"
          options={tipoEmpalmeChoices}
        />
        <SelectField
          form={form}
          fieldId="cargador_electrico"
          fieldName="Cargador Eléctrico"
          options={cargadorElectricoChoices}
        />
        <SwitchField
          form={form}
          fieldId="diferencial_presenta_caidas"
          fieldName="Diferencial presenta caídas"
        />
        <InputField
          form={form}
          fieldId="coordenadas"
          fieldName="Coordenadas"
          className="w-[300px]"
        />
        <TextareaField
          form={form}
          fieldId="comentarios"
          fieldName="Comentarios"
          className={cn('w-[300px] md:w-[500px]', `h-[${defaultValues.comentarios && 200}px]`)}
        />

        <Divider />

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
