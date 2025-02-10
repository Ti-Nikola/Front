export interface Contractor {
  id: number;
  nombre: string;
  telefono: string;
  mail: string;
  rut: string;
  rut_empresa: string;
  nombre_empresa: string;
  representante_empresa: string;
  porcentaje_de_pago_1: string; // 50.00
  porcentaje_de_pago_2: string;
  porcentaje_de_pago_3: string;

  created_at: string;
  updated_at: string;
}

export interface ContractorPost {
  nombre: string;
  telefono: string;
  mail: string;
  rut: string;
  rut_empresa: string;
  nombre_empresa: string;
  representante_empresa: string;
}
