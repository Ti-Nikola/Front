export interface Region {
  id: number;
  nombre: string;
}

export interface Comuna extends Region {
  region: number;
}
