'use client';

import { useState } from 'react';

import { EditClientForm } from '@/components/forms/client/EditClient';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectDetail } from '@/types/Project';
import { EditText } from '@/utils/text';

import { ChangeClientForm } from './ClientChange';
import { AssignNewClient } from './ClientNew';

export const EditProjectClientForm = ({
  data,
  triggerRefetch,
}: {
  data: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const txt = new EditText('Cliente');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll md:max-w-[600px]">
        <ClientTabs
          tabs={[
            {
              title: 'Editar',
              content: (
                <EditClientForm
                  data={data.client}
                  onClose={() => setOpen(false)}
                  triggerRefetch={triggerRefetch}
                />
              ),
              dialog: {
                title: txt.title,
                description: txt.description,
              },
            },
            {
              title: 'Cambiar',
              content: (
                <ChangeClientForm
                  data={data}
                  onClose={() => setOpen(false)}
                  triggerRefetch={triggerRefetch}
                />
              ),
              dialog: {
                title: txt.title,
                description: txt.description,
              },
            },
            {
              title: 'Crear',
              content: (
                <AssignNewClient
                  data={data}
                  onClose={() => setOpen(false)}
                  triggerRefetch={triggerRefetch}
                />
              ),
              dialog: {
                title: txt.title,
                description: txt.description,
              },
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};

const ClientTabs = ({
  tabs,
}: {
  tabs: {
    title: string;
    content: React.ReactNode;
    dialog: { title: string; description: string };
  }[];
}) => (
  <Tabs defaultValue={tabs[0]?.title || ''}>
    <TabsList className="mt-4 grid w-full grid-cols-3 justify-self-center">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.title} value={tab.title}>
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map((tab) => (
      <TabsContent key={tab.title} value={tab.title} className="flex w-full flex-col space-y-8">
        <DialogHeader className="mt-4">
          <DialogTitle>{tab.dialog.title}</DialogTitle>
          <DialogDescription>{tab.dialog.description}</DialogDescription>
        </DialogHeader>
        {tab.content}
      </TabsContent>
    ))}
  </Tabs>
);
