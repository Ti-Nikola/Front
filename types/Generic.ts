export type OptionsArray = readonly { label: string; value: string | number; className?: string }[];

export type EstadoDePagoType =
  | 'Ok por el momento'
  | 'Facturar pronto'
  | 'Pagado por Facturar'
  | 'Facturado por Pagar'
  | 'Facturado y Pagado';

export interface Coordinates {
  lat: string;
  lng: string;
}
