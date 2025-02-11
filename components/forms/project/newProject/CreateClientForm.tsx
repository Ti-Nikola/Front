'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getClient } from '@/api/client/getClient';
import { postClient } from '@/api/client/postClient';
import { Divider } from '@/components/Divider';
import { ComboboxField } from '@/components/forms/Fields';
import { ClientForm, ClientFormSchema } from '@/components/forms/client/ClientForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Client } from '@/types/Clients';
import { OptionsArray } from '@/types/Generic';

export const SelectProjectClientForm = ({
  setClient,
  handleStep,
  defaultValue,
}: {
  setClient: (client: { id: number; name: string }) => void;
  handleStep: () => void;
  defaultValue?: number;
}) => {
  const { toast } = useToast();
  const width = useWindowWidth() ?? 0;

  const [clients, setClients] = useState<OptionsArray>([]);

  const handleSubmit = (id: number) => {
    setClient({
      id: id,
      name: clients.find((c) => c.value === id)?.label ?? '',
    });
    toast({ description: 'Cliente Asignado' });
    setTimeout(() => {
      handleStep();
    }, 1000);
  };

  async function handleNewClientSubmit(data: z.infer<typeof ClientFormSchema>) {
    const newClient = await postClient(data);
    handleSubmit(newClient.id);
  }

  async function handleSelectClientSubmit(data: SelectClientSchema) {
    try {
      handleSubmit(data.client);
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
      const mappedClients = (Array.isArray(clients) ? clients : []).map((client: Client) => ({
        label: client.nombre_completo,
        value: client.id,
      }));
      setClients(mappedClients);
    };
    fetchClients();
  }, []);

  return (
    <>
      <h1 className="mb-12 text-3xl font-medium">Crear Cliente</h1>
      <div className="flex w-full max-w-[1300px] flex-col items-start justify-center md:flex-row">
        <div className="flex max-w-[600px] flex-col gap-6">
          <h1 className="text-xl">Crear Nuevo Cliente</h1>
          <ClientForm
            schema={ClientFormSchema}
            handleSubmit={handleNewClientSubmit}
            title="Crear y Asignar"
          />
        </div>
        {width > 768 ? (
          <Divider type="vertical" className="mx-12" />
        ) : (
          <Divider className="my-12" />
        )}
        <div className="flex h-full max-w-[350px] flex-col gap-6">
          <h1 className="text-xl">Elegir Cliente</h1>
          <SelectClientForm
            handleSubmit={handleSelectClientSubmit}
            defaultValues={defaultValue ? { client: defaultValue } : undefined}
            clients={clients}
          />
        </div>
      </div>
    </>
  );
};

const SelectClientSchema = z.object({
  client: z.number(),
});

type SelectClientSchema = z.infer<typeof SelectClientSchema>;

const SelectClientForm = ({
  handleSubmit,
  defaultValues,
  clients,
}: {
  handleSubmit: (data: SelectClientSchema) => void;
  defaultValues?: SelectClientSchema;
  clients: OptionsArray;
}) => {
  const form = useForm<SelectClientSchema>({
    resolver: zodResolver(SelectClientSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-wrap justify-center space-y-5"
      >
        <ComboboxField
          form={form}
          options={clients}
          fieldId="client"
          fieldName=""
          inputPlaceholder="Buscar id..."
        />
        <div className="flex w-full items-end justify-center">
          <Button className="min-w-[200px]" type="submit">
            Seleccionar Cliente
          </Button>
        </div>
      </form>
    </Form>
  );
};
