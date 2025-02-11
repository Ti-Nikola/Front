'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DecimalField, InputField, SelectField, SwitchField } from '@/components/forms/Fields';
import { PlantSchema } from '@/components/forms/Schemas';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MIN_DECIMAL } from '@/const/const';
import {
  cargadorElectricoChoices,
  sistemaRespaldoChoices,
  tipoEmpalmeChoices,
  tipoInstalacionChoices,
} from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';
import { ProjectPost } from '@/types/Project';
import {
  formatDecimal,
  removeNonNumericAndLeadingZeros,
  roundToTwoDecimals,
} from '@/utils/numbers';
import { parsePartialProject } from '@/utils/parseTypes';

const PlantFormSchema = PlantSchema.omit({ tipo_proyecto: true });
type PlantFormSchema = z.infer<typeof PlantFormSchema>;

export const CreateProjectPlantForm = ({
  updateProject,
  handleStep,
}: {
  updateProject: (data: Partial<ProjectPost>) => void;
  handleStep: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues: Partial<PlantFormSchema> = {
    diferencial_presenta_caidas: false,
  };

  const form = useForm<PlantFormSchema>({
    resolver: zodResolver(PlantFormSchema),
    defaultValues,
  });

  function onSubmit(data: PlantFormSchema) {
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

  async function handleSubmit(data: PlantFormSchema) {
    const project = parsePartialProject(data);
    updateProject(project);

    toast({ description: 'Planta Creada' });
    handleStep();
  }

  const numPaneles = form.watch('numero_paneles');
  const potenciaPanel = form.watch('potencia_panel_Wp');

  useEffect(() => {
    if (numPaneles && potenciaPanel) {
      const peakValue_Wp =
        Number(removeNonNumericAndLeadingZeros(numPaneles)) *
        Number(removeNonNumericAndLeadingZeros(potenciaPanel));

      const peakValue_kWp = roundToTwoDecimals(peakValue_Wp / 1000);

      if (peakValue_kWp < MIN_DECIMAL) {
        form.setValue('peak_kwp', '0');
        return;
      }
      const peakValue = formatDecimal((peakValue_kWp * 100).toString()); // formatDecimal uses the last 2 digits as decimals
      form.setValue('peak_kwp', peakValue);
    }
  }, [form, numPaneles, potenciaPanel]);

  return (
    <>
      <h1 className="mb-12 text-3xl font-medium">Crear Planta</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap justify-around gap-4 space-x-4 space-y-6"
        >
          <SelectField
            form={form}
            fieldId="tipo_empalme"
            fieldName="Tipo de Empalme"
            options={tipoEmpalmeChoices}
            containerClassName="mt-6 ml-4"
          />
          <SelectField
            form={form}
            fieldId="tipo_instalacion"
            fieldName="Tipo de Instalación"
            options={tipoInstalacionChoices}
          />
          <SelectField
            form={form}
            fieldId="sistema_respaldo"
            fieldName="Sistema de Respaldo"
            options={sistemaRespaldoChoices}
          />
          <SelectField
            form={form}
            fieldId="cargador_electrico"
            fieldName="Cargador Eléctrico"
            options={cargadorElectricoChoices}
          />

          <InputField form={form} fieldId="numero_paneles" fieldName="Nº paneles" type="number" />
          <InputField
            form={form}
            fieldId="potencia_panel_Wp"
            fieldName="Potencia panel (Wp)"
            type="number"
          />
          <DecimalField form={form} fieldId="peak_kwp" fieldName="Potencia Peak (kWp)" disabled />

          <DecimalField form={form} fieldId="potencia_kw" fieldName="Potencia Inversor (kW)" />
          <DecimalField
            form={form}
            fieldId="potencia_conectada_casa_kw"
            fieldName="Potencia Conectada Casa (kW)"
          />

          <DecimalField
            form={form}
            fieldId="capacidad_baterias_kwh"
            fieldName="Cap. baterias (kWh)"
          />
          <InputField form={form} fieldId="numero_baterias" fieldName="Nº baterías" type="number" />

          <DecimalField form={form} fieldId="diferencial_mA" fieldName="Diferencial (mA)" />
          <DecimalField
            form={form}
            fieldId="proteccion_empalme_A"
            fieldName="Proteccion de Empalme (A)"
          />
          <SwitchField
            form={form}
            fieldId="diferencial_presenta_caidas"
            fieldName="Diferencial presenta caídas"
          />
          <div className="flex w-full justify-center">
            <Button className="mt-12 px-12" type="submit">
              Siguiente
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
