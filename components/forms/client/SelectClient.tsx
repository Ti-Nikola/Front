'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getClient } from '@/api/client/getClient';
import { ComboboxField } from '@/components/forms/Fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/Clients';

const SelectClientSchema = z.object({
  id: z.number(),
  client: z.number(),
});

export type SelectClientSchema = z.infer<typeof SelectClientSchema>;

export const SelectClientForm = ({
  handleSubmit,
  defaultValues,
  title,
  description,
  buttonTitle = 'Seleccionar Cliente',
}: {
  handleSubmit: (data: SelectClientSchema) => void;
  defaultValues?: Partial<SelectClientSchema>;
  title?: string;
  description?: string;
  buttonTitle?: string;
}) => {
  const [clients, setClients] = useState<Client[] | null>(null);

  const { toast } = useToast();

  const form = useForm<SelectClientSchema>({
    resolver: zodResolver(SelectClientSchema),
    defaultValues,
  });

  function onSubmit(data: SelectClientSchema) {
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
    const fetchClients = async () => {
      const clients = await getClient();
      setClients(Array.isArray(clients) ? clients : [clients]);
    };
    fetchClients();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap justify-center space-y-5"
      >
        <ComboboxField
          form={form}
          options={
            clients?.map((client) => ({
              value: client.id,
              label: client.nombre_completo,
            })) ?? []
          }
          fieldId="client"
          fieldName={title ?? ''}
          inputPlaceholder="Buscar id..."
          formDescription={description}
        />
        <div className="flex w-full items-end justify-center">
          <Button className="min-w-[200px]" type="submit">
            {buttonTitle}
          </Button>
        </div>
      </form>
    </Form>
  );
};
