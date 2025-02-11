import { ChevronRight } from 'lucide-react';

import { deleteContractorPayment } from '@/api/contractorPayment/deleteContractorPayment';
import { deletePago } from '@/api/pago/deletePago';
import { ProjectDetail } from '@/types/Project';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { CustomCard } from './CustomCard';
import { CustomTab } from './CustomTab';
import { PagoContratistaExtraTable } from './paymentTables/PagoContratistaExtraTable';
import { PagoContratistaTable } from './paymentTables/PagoContratistaTable';
import { PagoExtraTable } from './paymentTables/PagoExtraTable';
import { PagoTable } from './paymentTables/PagoTable';

export const PaymentsCard = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const hitoNeto = project.payments
    ?.filter((p) => !p.is_extra)
    .reduce((acc, pago) => acc + pago.monto, 0);
  const hitoExtra = project.payments
    ?.filter((p) => p.is_extra)
    .reduce((acc, pago) => acc + pago.monto, 0);

  const cpNeto = project.contractor_payments
    ?.filter((p) => !p.is_extra)
    .reduce((acc, pago) => acc + pago.valor_pago, 0);
  const cpExtra = project.contractor_payments
    ?.filter((p) => p.is_extra)
    .reduce((acc, pago) => acc + pago.valor_pago, 0);

  const handleAddNewPago = async () => {};

  const handleAddNewContractorPayment = async () => {};

  const handleDelete = async (deleteFn: (id: string) => Promise<boolean>, id: string) => {
    try {
      const success = await deleteFn(id);
      if (success) triggerRefetch();
    } catch (error) {
      console.error(`Error deleting:`, error);
    }
  };

  return (
    <CustomCard title="Pagos" className="relative">
      <div className="flex flex-col">
        <CustomTab
          noClass
          tabs={[
            {
              title: 'Hitos de Pago',
              content: (
                <>
                  <div className="flex items-end justify-between">
                    <div className="flex-col">
                      <PaymentItem
                        title="Precio Venta Neto"
                        value={formatCurrency(project.precio_venta_neto)}
                        strong
                      />
                      <PaymentItem
                        title="Cantidad Pagos"
                        value={project.cantidad_pagos ?? '-'}
                        strong
                      />
                      <PaymentsDisclousure neto={hitoNeto} extra={hitoExtra} />
                    </div>
                    <div className="hidden w-full justify-end sm:flex">
                      <Button onClick={handleAddNewPago}>Agregar Pago</Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <PagoTable project={project} triggerRefetch={triggerRefetch} />

                    <PagoExtraTable
                      project={project}
                      triggerRefetch={triggerRefetch}
                      handleDeletePago={(id: string) => handleDelete(deletePago, id)}
                    />
                    <div className="flex w-full justify-center sm:hidden">
                      <Button onClick={handleAddNewPago}>Agregar Pago</Button>
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: 'Pagos Contratistas',
              content: (
                <>
                  <div className="flex items-end justify-between">
                    <div className="flex-col">
                      <PaymentItem
                        title="Presupuesto"
                        value={formatCurrency(project.presupuesto_original_contratista)}
                        strong
                      />
                      <PaymentsDisclousure neto={cpNeto} extra={cpExtra} />
                    </div>
                    <div className="hidden w-full justify-end sm:flex">
                      <Button onClick={handleAddNewContractorPayment}>Agregar Pago</Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <PagoContratistaTable project={project} triggerRefetch={triggerRefetch} />

                    <PagoContratistaExtraTable
                      project={project}
                      triggerRefetch={triggerRefetch}
                      handleDeletePago={(id: string) => handleDelete(deleteContractorPayment, id)}
                    />
                    <div className="flex w-full justify-center sm:hidden">
                      <Button onClick={handleAddNewContractorPayment}>Agregar Pago</Button>
                    </div>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </CustomCard>
  );
};

function PaymentsDisclousure({ neto, extra }: { neto: number; extra: number }) {
  const total = neto + extra;

  return (
    <Accordion
      className="flex w-full flex-col"
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      variants={{
        expanded: {
          opacity: 1,
          scale: 1,
        },
        collapsed: {
          opacity: 0,
          scale: 0.7,
        },
      }}
    >
      <AccordionItem value="getting-started">
        <AccordionTrigger className="w-full py-0.5 text-left">
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[expanded]:rotate-90" />
            <PaymentItem title="Total" value={formatCurrency(total)} strong className="ml-2" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="origin-left">
          <PaymentItem title="Neto" value={formatCurrency(neto)} />
          <PaymentItem title="Extra" value={formatCurrency(extra)} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const PaymentItem = ({
  title,
  value,
  strong = false,
  className,
}: {
  title: string;
  value: string | number;
  strong?: boolean;
  className?: string;
}) => (
  <div className={cn('ml-6 flex w-[350px]', strong && 'text-lg font-semibold', className)}>
    <p className="flex w-full text-muted-foreground">{title}</p>
    <p className="flex w-full">{value}</p>
  </div>
);
