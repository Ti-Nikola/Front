export interface Asset {
  id: number;
  nombre: string;
  valor: number;
  fecha_adquisicion: string;
  codigo_interno: string;
  numero_factura: number;
  responsable: number;
}

export type AssetPost = Omit<Asset, 'id'>;

export type AssetTable = Asset & {
  responsable_name: string;
};
