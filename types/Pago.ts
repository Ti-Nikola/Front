import { EstadoDePagoType } from './Generic';

export interface Pago {
  id: number;
  numero_pago: number;
  monto: number;
  porcentaje: string; // 5.00
  mensaje: string;
  estado: EstadoDePagoType;
  is_extra: boolean;
  proyecto: number;
}

export interface PagoPost {
  numero_pago: number;
  monto: number;
  porcentaje: string; // 5.00
  mensaje: string;
  estado: EstadoDePagoType;
  is_extra: boolean;
  proyecto: number;
}
