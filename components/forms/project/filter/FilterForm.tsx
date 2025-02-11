'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getTableProject } from '@/api/project/getTableProject';
import {
  ComboboxField,
  DatePickerField,
  SelectField,
  SwitchField,
} from '@/components/forms/Fields';
import { ProjectSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { SheetClose } from '@/components/ui/sheet';
import {
  bancosChoices,
  comunasChoices,
  distribuidorasChoices,
  estadosChoices,
  etapasChoices,
  facturacionChoices,
  financiamientoChoices,
  opcionTarifaChoices,
  regionesChoices,
  tipoInstalacionChoices,
  tipoProyectoChoices,
} from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { OptionsArray } from '@/types/Generic';
import { ProjectTable } from '@/types/Project';
import { fetchTeam } from '@/utils/fetchTeam';
import { parseProjectFilter } from '@/utils/parseTypes';
import { z_boolean, z_string } from '@/utils/zodTypes';

const FormSchema = ProjectSchema.pick({
  etapa_proyecto: true,
  estado_proyecto: true,
  vendedor: true,
  ingeniero: true,
  contratista: true,
  comuna: true,
  distribuidora: true,
  banco: true,
  opcion_tarifa: true,
  financiamiento: true,
  facturacion_naturaleza: true,
  fecha_firma_contrato: true,
  fecha_inicio_obra: true,
  fecha_termino_obra: true,

  tipo_proyecto: true,
  tipo_instalacion: true,
})
  .extend({
    region: z_string,
    comentarios: z_boolean,
    diferencial_presenta_caidas: z_boolean,
    fecha_firma_contrato_end: z.date(),
    fecha_inicio_obra_end: z.date(),
    fecha_termino_obra_end: z.date(),
  })
  .partial();

const filterFields = [
  { id: 'etapa_proyecto', label: 'Etapa Proyecto' },
  { id: 'estado_proyecto', label: 'Estado Proyecto' },
  { id: 'vendedor', label: 'Vendedor' },
  { id: 'ingeniero', label: 'Ingeniero' },
  { id: 'contratista', label: 'Contratista' },
  { id: 'region', label: 'Región' },
  { id: 'comuna', label: 'Comuna' },
  { id: 'distribuidora', label: 'Distribuidora' },
  { id: 'comentarios', label: 'Comentarios' },
  { id: 'tipo_proyecto', label: 'Tipo de Proyecto' },
  { id: 'tipo_instalacion', label: 'Tipo Instalación' },
  { id: 'diferencial_presenta_caidas', label: 'Caídas Diferencial' },

  { id: 'banco', label: 'Banco' },
  { id: 'opcion_tarifa', label: 'Opción Tarifa' },
  { id: 'financiamiento', label: 'Financiamiento' },
  { id: 'facturacion_naturaleza', label: 'Facturación Naturaleza' },
  { id: 'fecha_firma_contrato', label: 'Fecha Firma Contrato' },
  { id: 'fecha_inicio_obra', label: 'Fecha Inicio Obra' },
  { id: 'fecha_termino_obra', label: 'Fecha Término Obra' },
] as const;

export const FilterForm = ({ setData }: { setData: (data: ProjectTable[]) => void }) => {
  const { toast } = useToast();

  const [vendors, setVendors] = useState<OptionsArray>([]);
  const [engineers, setEngineers] = useState<OptionsArray>([]);
  const [contractors, setContractors] = useState<OptionsArray>([]);

  const [selectedItems, setSelectedItems] = useState<string[]>([
    'etapa_proyecto',
    'estado_proyecto',
    'vendedor',
    'ingeniero',
    'contratista',
    'region',
    'comuna',
    'distribuidora',
    'comentarios',
    'tipo_proyecto',
    'tipo_instalacion',
    'diferencial_presenta_caidas',
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => (checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)));

    if (!checked) {
      form.setValue(itemId as keyof z.infer<typeof FormSchema>, undefined);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const queryParams = parseProjectFilter(data);
    console.log(queryParams);
    getTableProject(null, queryParams)
      .then(setData)
      .then(() => toast({ description: 'Filtros Aplicados' }))
      .catch((error) => console.error('Error fetching projects:', error));
  }

  useEffect(() => {
    fetchTeam({ setVendors, setEngineers, setContractors });
  }, []);

  return (
    <>
      {/* Select Filters */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Selecciona los filtros a aplicar</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {filterFields.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
              />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-wrap items-center justify-around gap-4 mb-6">
            {selectedItems.includes('etapa_proyecto') && (
              <SelectField
                form={form}
                options={etapasChoices}
                fieldId="etapa_proyecto"
                fieldName="Etapa Proyecto"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('estado_proyecto') && (
              <SelectField
                form={form}
                options={estadosChoices}
                fieldId="estado_proyecto"
                fieldName="Estado Proyecto"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('distribuidora') && (
              <ComboboxField
                form={form}
                options={distribuidorasChoices}
                fieldId="distribuidora"
                fieldName="Distribuidora"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('vendedor') && (
              <ComboboxField
                form={form}
                options={vendors}
                fieldId="vendedor"
                fieldName="Vendedor"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('ingeniero') && (
              <ComboboxField
                form={form}
                options={engineers}
                fieldId="ingeniero"
                fieldName="Ingeniero"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('contratista') && (
              <ComboboxField
                form={form}
                options={contractors}
                fieldId="contratista"
                fieldName="Contratista"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('region') && (
              <ComboboxField
                form={form}
                options={regionesChoices}
                fieldId="region"
                fieldName="Región"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('comuna') && (
              <ComboboxField
                form={form}
                options={comunasChoices}
                fieldId="comuna"
                fieldName="Comuna"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('comentarios') && (
              <SwitchField
                form={form}
                fieldId="comentarios"
                fieldName="Comentarios"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('tipo_proyecto') && (
              <SelectField
                form={form}
                options={tipoProyectoChoices}
                fieldId="tipo_proyecto"
                fieldName="Tipo Proyecto"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('tipo_instalacion') && (
              <SelectField
                form={form}
                options={tipoInstalacionChoices}
                fieldId="tipo_instalacion"
                fieldName="Tipo Instalacion"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('diferencial_presenta_caidas') && (
              <SwitchField
                form={form}
                fieldId="diferencial_presenta_caidas"
                fieldName="Caídas Diferencial"
                containerClassName="mt-6"
              />
            )}

            {selectedItems.includes('banco') && (
              <ComboboxField
                form={form}
                options={bancosChoices}
                fieldId="banco"
                fieldName="Banco"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('opcion_tarifa') && (
              <SelectField
                form={form}
                options={opcionTarifaChoices}
                fieldId="opcion_tarifa"
                fieldName="Opción Tarifa"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('financiamiento') && (
              <SelectField
                form={form}
                options={financiamientoChoices}
                fieldId="financiamiento"
                fieldName="Financiamiento"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('facturacion_naturaleza') && (
              <SelectField
                form={form}
                options={facturacionChoices}
                fieldId="facturacion_naturaleza"
                fieldName="Facturación Naturaleza"
                containerClassName="mt-6"
              />
            )}
            {selectedItems.includes('fecha_firma_contrato') && (
              <>
                <DatePickerField
                  form={form}
                  fieldId="fecha_firma_contrato"
                  fieldName="Fecha Firma Contrato - desde"
                  containerClassName="mt-6"
                />
                <DatePickerField
                  form={form}
                  fieldId="fecha_firma_contrato_end"
                  fieldName="Fecha Firma Contrato - hasta"
                  containerClassName="mt-6"
                />
              </>
            )}
            {selectedItems.includes('fecha_inicio_obra') && (
              <>
                <DatePickerField
                  form={form}
                  fieldId="fecha_inicio_obra"
                  fieldName="Fecha Inicio Obras - desde"
                  containerClassName="mt-6"
                />
                <DatePickerField
                  form={form}
                  fieldId="fecha_inicio_obra_end"
                  fieldName="Fecha Inicio Obras - hasta"
                  containerClassName="mt-6"
                />
              </>
            )}
            {selectedItems.includes('fecha_termino_obra') && (
              <>
                <DatePickerField
                  form={form}
                  fieldId="fecha_termino_obra"
                  fieldName="Fecha Término Obras - desde"
                  containerClassName="mt-6"
                />
                <DatePickerField
                  form={form}
                  fieldId="fecha_termino_obra_end"
                  fieldName="Fecha Término Obras - hasta"
                  containerClassName="mt-6"
                />
              </>
            )}
          </div>
          <SheetClose asChild className="mt-6">
            <Button type="submit">Filtrar</Button>
          </SheetClose>
        </form>
      </Form>
    </>
  );
};
