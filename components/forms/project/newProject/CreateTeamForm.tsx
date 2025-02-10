'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Divider } from '@/components/Divider';
import { ComboboxField } from '@/components/forms/Fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { OptionsArray } from '@/types/Generic';
import { ProjectPost } from '@/types/Project';
import { fetchTeam } from '@/utils/fetchTeam';

const SelectTeamFormSchema = z
  .object({
    vendorId: z.number(),
    engineerId: z.number(),
    contractorId: z.number().optional(),
  })
  .partial();

type SelectTeamFormSchema = z.infer<typeof SelectTeamFormSchema>;

export const SelectProjectTeamForm = ({
  updateProject,
  defaultValues,
  handleStep,
}: {
  updateProject: (data: Partial<ProjectPost>) => void;
  defaultValues?: z.infer<typeof SelectTeamFormSchema>;
  handleStep: () => void;
}) => {
  const { toast } = useToast();
  const width = useWindowWidth() ?? 0;

  const [vendors, setVendors] = useState<OptionsArray>([]);
  const [engineers, setEngineers] = useState<OptionsArray>([]);
  const [contractors, setContractors] = useState<OptionsArray>([]);

  const form = useForm<SelectTeamFormSchema>({
    resolver: zodResolver(SelectTeamFormSchema),
    defaultValues,
  });

  function onSubmit(data: SelectTeamFormSchema) {
    try {
      handleSubmit(data);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }

  const handleSubmit = (data: SelectTeamFormSchema) => {
    if (!data.vendorId || !data.engineerId) {
      toast({
        title: 'Error',
        description: 'Por favor asigna al menos un vendedor y un ingeniero',
      });
      return;
    }
    if (data.contractorId) updateProject({ contratista: data.contractorId });
    updateProject({ vendedor: data.engineerId });
    updateProject({ ingeniero: data.vendorId });

    toast({
      title: 'Team Asignado',
      description: `Se han asignado a: Vendedor${data.contractorId ? ', Ingeniero y Contratista\n' : ' e Ingeniero\n'}`,
    });
    setTimeout(() => {
      handleStep();
    }, 1000);
  };

  useEffect(() => {
    fetchTeam({ setVendors, setEngineers, setContractors });
  }, []);

  return (
    <>
      <h1 className="mb-12 text-3xl font-medium">Escoger Equipo</h1>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-evenly gap-4 space-y-5"
          >
            <div className="flex w-full flex-col items-start justify-between md:flex-row">
              <div className="flex max-w-[400px] flex-col gap-6">
                <h1 className="text-xl">Elegir Vendedor</h1>
                <ComboboxField
                  form={form}
                  options={vendors}
                  fieldId="vendorId"
                  fieldName="Vendedor"
                  inputPlaceholder="Buscar..."
                  formDescription="Elige el vendedor que se encargará de este proyecto"
                />
              </div>
              {width > 768 ? (
                <Divider type="vertical" className="mx-6" />
              ) : (
                <Divider className="my-12" />
              )}
              <div className="flex max-w-[400px] flex-col gap-6">
                <h1 className="text-xl">Elegir Ingeniero</h1>
                <ComboboxField
                  form={form}
                  options={engineers}
                  fieldId="engineerId"
                  fieldName="Ingeniero"
                  inputPlaceholder="Buscar..."
                  formDescription="Elige el ingeniero que se encargará de este proyecto"
                />
              </div>
              {width > 768 ? (
                <Divider type="vertical" className="mx-6" />
              ) : (
                <Divider className="my-12" />
              )}
              <div className="flex max-w-[400px] flex-col gap-6">
                <h1 className="text-xl">Elegir Contratista</h1>
                <ComboboxField
                  form={form}
                  options={contractors}
                  fieldId="contractorId"
                  fieldName="Contratista"
                  inputPlaceholder="Buscar..."
                  formDescription="Elige el contratista que se encargará de este proyecto"
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button type="submit" className="mt-10 w-40">
                Elegir
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
