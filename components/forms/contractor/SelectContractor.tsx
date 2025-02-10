'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getContractor } from '@/api/contractor/getContractor';
import { ComboboxField } from '@/components/forms/Fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Contractor } from '@/types/Contractor';

export const SelectContractorFormSchema = z.object({
  contractor: z.number(),
});

export const SelectContractorForm = ({
  handleSubmit,
}: {
  handleSubmit: (data: z.infer<typeof SelectContractorFormSchema>) => void;
}) => {
  const [contractors, setContractors] = useState<Contractor[] | null>(null);

  const form = useForm<z.infer<typeof SelectContractorFormSchema>>({
    resolver: zodResolver(SelectContractorFormSchema),
  });

  function onSubmit(data: z.infer<typeof SelectContractorFormSchema>) {
    try {
      handleSubmit(data);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }

  useEffect(() => {
    const fetchContractorMembers = async () => {
      const contractor = await getContractor();
      setContractors(contractor);
    };

    fetchContractorMembers();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start justify-evenly gap-4 space-y-5"
      >
        <ComboboxField
          form={form}
          options={
            contractors?.map((contractor) => ({
              value: contractor.id,
              label: contractor.nombre,
            })) ?? []
          }
          fieldId="contractor"
          fieldName="Contratista"
          inputPlaceholder="Buscar..."
          formDescription="Elige el contratista que se encargará de este proyecto"
        />
        <div className="flex w-full justify-center">
          <Button variant={'secondary'} type="submit" className="mt-1">
            Elegir
          </Button>
        </div>
      </form>
    </Form>
  );
};
