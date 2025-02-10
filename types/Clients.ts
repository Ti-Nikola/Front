export interface Client {
  id: number;
  nombre_completo: string;
  rut: string;
  mail: string;
  telefono: string;

  created_at: string;
  updated_at: string;
}

export interface ClientPost {
  nombre_completo: string;
  rut: string;
  mail: string;
  telefono: string;
}
