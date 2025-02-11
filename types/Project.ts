import {
  BancoType,
  CargadorElectricoType,
  EmpalmeType,
  EstadoProyectoType,
  EtapaProyectoType,
  FacturacionType,
  FinanciamientoType,
  InstalacionType,
  ProyectoType,
  SistemaRespaldoType,
  TarifaType,
} from '@/const/formChoices';

import { Client } from './Clients';
import { ContractorPayment } from './ContractorPayment';
import { Pago } from './Pago';

export interface Project {
  id: number;
  key: number;
  titulo: string;
  centro_costo: string;
  etapa_proyecto: EtapaProyectoType;
  estado_proyecto: EstadoProyectoType;
  comentarios: string;

  client: number;
  vendedor: number;
  ingeniero: number;
  contratista: number;

  comuna: number;
  direccion: string;
  coordenadas: string;

  rut_facturacion: string;
  titular_cdv: string;
  distribuidora: string;
  numero_medidor: string;
  razon_social: string;
  num_cliente_distribuidora: string;

  banco: BancoType;
  opcion_tarifa: TarifaType;
  financiamiento: FinanciamientoType;
  facturacion_naturaleza: FacturacionType;

  cantidad_pagos: number;
  precio_venta_neto: number;
  presupuesto_original_contratista: number;

  fecha_inicio_obra: string; // 2024-07-24
  fecha_termino_obra: string;
  fecha_firma_contrato: string;

  // Planta
  tipo_empalme: EmpalmeType;
  tipo_proyecto: ProyectoType;
  tipo_instalacion: InstalacionType;
  sistema_respaldo: SistemaRespaldoType;
  cargador_electrico: CargadorElectricoType;

  potencia_kw: string; // 5.00
  potencia_conectada_casa_kw: string; // 5.00

  diferencial_mA: string; // 5.00
  proteccion_empalme_A: string; // 5.00
  diferencial_presenta_caidas: boolean;

  peak_kwp: string; // 5.00
  numero_paneles: number;
  potencia_panel_Wp: number;

  numero_baterias: number;
  capacidad_baterias_kwh: string; // 5.00

  // Proceso SEC
  numero_proceso_sec: string;
  numero_solicitud_f3: string;
  numero_solicitud_f5: string;
  codigo_verif_te4: string;
  folio_inscripcion_te4: string;

  fecha_ingreso_f3: string; // 2024-07-24
  fecha_ingreso_f5: string;
  fecha_ingreso_te4: string;
  fecha_ingreso_te6: string;
  fecha_aprobacion_f3: string;
  fecha_aprobacion_f5: string;
  fecha_aprobacion_te4: string;
  fecha_aprobacion_te6: string;
  manifestacion_conformidad: boolean;
}

export type ProjectPost = Omit<Project, 'id'>;

export interface ProjectTable extends Project {
  client_name?: string;
  vendedor_name?: string;
  ingeniero_name?: string;
  contratista_name?: string;

  region_name?: string;
  comuna_name?: string;
}

export interface ProjectDetail extends Omit<ProjectTable, 'client'> {
  client: Client;
  contractor_payments: ContractorPayment[];
  payments: Pago[];
}
