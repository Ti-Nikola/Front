import { AreaType, RolType } from '@/const/formChoices';

export interface Staff {
  id: number;
  nombre_completo: string;
  area: AreaType;
  rol: RolType;
  mail: string;
  telefono: string;
  rut: string;
}

export type StaffPost = Omit<Staff, 'id'>;
