import { PagoContratistaType } from '@/const/formChoices';

import { EstadoDePagoType } from './Generic';

export interface ContractorPayment {
  id: number;
  proyecto: number;
  valor_pago: number;
  descripcion: string;
  estado_de_pago: EstadoDePagoType;
  is_extra: boolean;
  tipo_pago: PagoContratistaType;
  extra_contractor: number;

  created_at: string;
  updated_at: string;
}

export interface ContractorPaymentPost {
  proyecto: number;
  valor_pago: number;
  descripcion: string;
  estado_de_pago: EstadoDePagoType;
  is_extra: boolean;
  tipo_pago: PagoContratistaType;
  extra_contractor: number;
}
