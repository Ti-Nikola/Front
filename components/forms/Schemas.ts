import { z } from 'zod';

import {
  z_boolean,
  z_decimal,
  z_number,
  z_percentage,
  z_small_int,
  z_string,
} from '@/utils/zodTypes';

// Project
export const ProjectCoreSchema = z.object({
  id: z.number(),
  key: z_small_int,
  titulo: z_string,
  centro_costo: z_string,
  etapa_proyecto: z_string,
  estado_proyecto: z_string,
  comentarios: z_string,

  client: z.number(),
  vendedor: z.number(),
  ingeniero: z.number(),
  contratista: z.number(),

  direccion: z_string,
  coordenadas: z_string,
  comuna: z.number(),

  razon_social: z_string,
  rut_facturacion: z_string,
  distribuidora: z_string,
  numero_medidor: z_string,
  num_cliente_distribuidora: z_string,

  banco: z_string,
  opcion_tarifa: z_string,
  financiamiento: z_string,
  facturacion_naturaleza: z_string,

  cantidad_pagos: z_small_int,
  precio_venta_neto: z_number,
  presupuesto_original_contratista: z_number,

  fecha_firma_contrato: z.date(),
  fecha_inicio_obra: z.date(),
  fecha_termino_obra: z.date(),
});

export const ProcessSchema = z.object({
  numero_proceso_sec: z_number,
  numero_solicitud_f3: z_number,
  numero_solicitud_f5: z_number,
  codigo_verif_te4: z_number,
  folio_inscripcion_te4: z_number,
  manifestacion_conformidad: z_boolean,

  fecha_ingreso_f3: z.date(),
  fecha_ingreso_f5: z.date(),
  fecha_ingreso_te4: z.date(),
  fecha_ingreso_te6: z.date(),
  fecha_aprobacion_f3: z.date(),
  fecha_aprobacion_f5: z.date(),
  fecha_aprobacion_te4: z.date(),
  fecha_aprobacion_te6: z.date(),
});

export const PlantSchema = z.object({
  tipo_empalme: z_string,
  tipo_proyecto: z_string,
  tipo_instalacion: z_string,
  sistema_respaldo: z_string,
  cargador_electrico: z_string,

  potencia_kw: z_decimal,
  potencia_conectada_casa_kw: z_decimal,

  diferencial_mA: z_decimal,
  proteccion_empalme_A: z_decimal,
  diferencial_presenta_caidas: z_boolean,

  peak_kwp: z_decimal,
  numero_paneles: z_number,
  potencia_panel_Wp: z_number,

  numero_baterias: z_number,
  capacidad_baterias_kwh: z_decimal,
});

export const ProjectSchema = ProjectCoreSchema.merge(ProcessSchema).merge(PlantSchema);

// Client
export const ClientSchema = z.object({
  id: z.number(),
  nombre_completo: z_string,
  telefono: z_string,
  mail: z_string.email(),
  rut: z_string,
});

// Staff
export const StaffSchema = z.object({
  id: z.number(),
  nombre_completo: z_string,
  telefono: z_string,
  mail: z_string.email(),
  rut: z_string,
  area: z_string,
  rol: z_string,
});

// Asset
export const AssetSchema = z.object({
  id: z.number(),
  responsable: z.number(),
  valor: z_number,
  nombre: z_string,
  codigo_interno: z_string,
  numero_factura: z_number,
  fecha_adquisicion: z.date(),
});

// Contractor
export const ContractorSchema = z.object({
  id: z.number(),
  nombre: z_string,
  telefono: z_string,
  mail: z_string.email(),
  rut: z_string.optional(),
  rut_empresa: z_string,
  nombre_empresa: z_string,
  representante_empresa: z_string.optional(),
  porcentaje_de_pago_1: z_decimal.default('0.00'),
  porcentaje_de_pago_2: z_decimal.default('90.00'),
  porcentaje_de_pago_3: z_decimal.default('10.00'),
});

// ContractorPayment
export const CPSchema = z.object({
  id: z.number(),
  project: z.number(),
  tipo_pago: z_string,
  valor_pago: z_number,
  descripcion: z_string,
  estado_de_pago: z_string,
  is_extra: z_boolean,
  extra_contractor: z.number(),
});

export const EditCPSchema = CPSchema.partial()
  .extend({ id: z.number(), tipo_pago: z_string })
  .omit({ project: true, extra_contractor: true });

export const EditExtraCPSchema = CPSchema.partial()
  .extend({ id: z.number(), extra_contractor: z.number() })
  .omit({ project: true, tipo_pago: true });

export const CreateExtraCPSchema = EditExtraCPSchema.extend({ project: z.number() }).omit({
  id: true,
});

// Payment
export const PagoSchema = z.object({
  id: z.number(),
  project: z.number(),
  numero_pago: z_number,
  monto: z_number,
  estado: z_string,
  mensaje: z_string,
  is_extra: z_boolean,
  porcentaje: z_percentage,
});
export const EditPagoSchema = PagoSchema.omit({ project: true }).partial().extend({
  id: z.number(),
  numero_pago: z_number,
  monto: z_number,
  is_extra: z_boolean,
});

export const EditNormalPagoSchema = EditPagoSchema.extend({ porcentaje: z_percentage });
export const EditExtraPagoSchema = EditPagoSchema.omit({ porcentaje: true });
export const CreateExtraPagoSchema = PagoSchema.omit({
  id: true,
  numero_pago: true,
  porcentaje: true,
});
