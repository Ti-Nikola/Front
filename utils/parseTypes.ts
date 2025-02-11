import {
  AreaType,
  BancoType,
  CargadorElectricoType,
  EmpalmeType,
  EstadoProyectoType,
  EtapaProyectoType,
  FacturacionType,
  FinanciamientoType,
  InstalacionType,
  PagoContratistaType,
  ProyectoType,
  RolType,
  SistemaRespaldoType,
  TarifaType,
} from '@/const/formChoices';
import { AssetPost } from '@/types/Asset';
import { ContractorPayment } from '@/types/ContractorPayment';
import { Coordinates, EstadoDePagoType } from '@/types/Generic';
import { Pago } from '@/types/Pago';
import { ProjectPost } from '@/types/Project';
import { Staff } from '@/types/Staff';

import { filterNonEmptyFields } from './comparison';
import { formatAllDates, formatDateToISO } from './dates';
import { removeNonNumericAndLeadingZeros } from './numbers';

function formatProjectValues(project: any) {
  return {
    ...project,
    key: formatNumber(project.key),
    client: formatNumber(project.client),
    vendedor: formatNumber(project.vendedor),
    ingeniero: formatNumber(project.ingeniero),
    contratista: formatNumber(project.contratista),
    comuna: formatNumber(project.comuna),
    cantidad_pagos: formatNumber(project.cantidad_pagos),
    precio_venta_neto: formatNumber(project.precio_venta_neto),
    presupuesto_original_contratista: formatNumber(project.presupuesto_original_contratista),
    numero_paneles: formatNumber(project.numero_paneles),
    potencia_panel_Wp: formatNumber(project.potencia_panel_Wp),
    numero_baterias: formatNumber(project.numero_baterias),

    etapa_proyecto: project.etapa_proyecto
      ? (project.etapa_proyecto as EtapaProyectoType)
      : undefined,
    estado_proyecto: project.estado_proyecto
      ? (project.estado_proyecto as EstadoProyectoType)
      : undefined,
    banco: project.banco ? (project.banco as BancoType) : undefined,
    opcion_tarifa: project.opcion_tarifa ? (project.opcion_tarifa as TarifaType) : undefined,
    financiamiento: project.financiamiento
      ? (project.financiamiento as FinanciamientoType)
      : undefined,
    facturacion_naturaleza: project.facturacion_naturaleza
      ? (project.facturacion_naturaleza as FacturacionType)
      : undefined,
    tipo_empalme: project.tipo_empalme ? (project.tipo_empalme as EmpalmeType) : undefined,
    tipo_proyecto: project.tipo_proyecto ? (project.tipo_proyecto as ProyectoType) : undefined,
    tipo_instalacion: project.tipo_instalacion
      ? (project.tipo_instalacion as InstalacionType)
      : undefined,
    sistema_respaldo: project.sistema_respaldo
      ? (project.sistema_respaldo as SistemaRespaldoType)
      : undefined,
    cargador_electrico: project.cargador_electrico
      ? (project.cargador_electrico as CargadorElectricoType)
      : undefined,

    fecha_inicio_obra: formatDateToISO(
      project.fecha_inicio_obra ? new Date(project.fecha_inicio_obra) : undefined
    ),
    fecha_termino_obra: formatDateToISO(
      project.fecha_termino_obra ? new Date(project.fecha_termino_obra) : undefined
    ),
    fecha_firma_contrato: formatDateToISO(
      project.fecha_firma_contrato ? new Date(project.fecha_firma_contrato) : undefined
    ),
    fecha_ingreso_f3: formatDateToISO(
      project.fecha_ingreso_f3 ? new Date(project.fecha_ingreso_f3) : undefined
    ),
    fecha_aprobacion_f3: formatDateToISO(
      project.fecha_aprobacion_f3 ? new Date(project.fecha_aprobacion_f3) : undefined
    ),
    fecha_ingreso_te6: formatDateToISO(
      project.fecha_ingreso_te6 ? new Date(project.fecha_ingreso_te6) : undefined
    ),
    fecha_aprobacion_te6: formatDateToISO(
      project.fecha_aprobacion_te6 ? new Date(project.fecha_aprobacion_te6) : undefined
    ),
    fecha_ingreso_f5: formatDateToISO(
      project.fecha_ingreso_f5 ? new Date(project.fecha_ingreso_f5) : undefined
    ),
    fecha_aprobacion_f5: formatDateToISO(
      project.fecha_aprobacion_f5 ? new Date(project.fecha_aprobacion_f5) : undefined
    ),
    fecha_ingreso_te4: formatDateToISO(
      project.fecha_ingreso_te4 ? new Date(project.fecha_ingreso_te4) : undefined
    ),
    fecha_aprobacion_te4: formatDateToISO(
      project.fecha_aprobacion_te4 ? new Date(project.fecha_aprobacion_te4) : undefined
    ),
  };
}

function formatProjectFilters(project: any) {
  return {
    ...project,
    vendedor: formatNumber(project.vendedor),
    ingeniero: formatNumber(project.ingeniero),
    contratista: formatNumber(project.contratista),
    comuna: formatNumber(project.comuna),
    region: formatNumber(project.region),
    fecha_inicio_obra: formatDateToISO(
      project.fecha_inicio_obra ? new Date(project.fecha_inicio_obra) : undefined
    ),
    fecha_termino_obra: formatDateToISO(
      project.fecha_termino_obra ? new Date(project.fecha_termino_obra) : undefined
    ),
    fecha_firma_contrato: formatDateToISO(
      project.fecha_firma_contrato ? new Date(project.fecha_firma_contrato) : undefined
    ),
    fecha_inicio_obra_end: formatDateToISO(
      project.fecha_inicio_obra ? new Date(project.fecha_inicio_obra) : undefined
    ),
    fecha_termino_obra_end: formatDateToISO(
      project.fecha_termino_obra ? new Date(project.fecha_termino_obra) : undefined
    ),
    fecha_firma_contrato_end: formatDateToISO(
      project.fecha_firma_contrato ? new Date(project.fecha_firma_contrato) : undefined
    ),
  };
}

export function parseContractorPaymentToPatch(
  data: any,
  isExtra: boolean = false
): Partial<ContractorPayment> {
  const base = {
    ...data,
    valor_pago: Number(data.valor_pago),
    estado_de_pago: data.estado_de_pago as EstadoDePagoType,
  };

  if (!isExtra) {
    return {
      ...base,
      tipo_pago: data.tipo_pago as PagoContratistaType,
    };
  }

  return base;
}

export function parsePagoToPatch(data: any): Partial<Pago> {
  const base = {
    ...data,
    monto: Number(data.monto),
    numero_pago: Number(data.numero_pago),
    estado_de_pago: data.estado_de_pago as EstadoDePagoType,
  };

  return base;
}

export function parseProjectToPatch(data: any): Partial<ProjectPost> {
  const projectFormatted = formatProjectValues(data);
  const projectPartial: Partial<ProjectPost> = filterNonEmptyFields(projectFormatted);
  const projectCleanDates = formatAllDates(projectPartial);
  return projectCleanDates;
}

export function parsePartialProject(data: any): Partial<ProjectPost> {
  const projectFormatted = formatProjectValues(data);
  const projectPartial: Partial<ProjectPost> = filterNonEmptyFields(projectFormatted);
  const projectCleanDates = formatAllDates(projectPartial);
  return projectCleanDates;
}

export function parseProjectFilter(data: any): any {
  const projectFormatted = formatProjectFilters(data);
  const projectPartial = Object.fromEntries(
    Object.entries(projectFormatted)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, typeof value === 'boolean' ? (value ? 'true' : 'false') : value])
  );
  return formatAllDates(projectPartial);
}

export function parseProcessToPost(data: any): any {
  const filteredData = filterNonEmptyFields(data);
  return formatAllDates(filteredData);
}

export function parseStaffToPatch(data: any): Partial<Staff> {
  const staff = { ...data, rol: data.rol as RolType, area: data.area as AreaType };
  return filterNonEmptyFields(staff);
}

export function parseAsset(data: any): AssetPost {
  const asset = {
    ...data,
    valor: formatNumber(data.valor),
    numero_factura: formatNumber(data.numero_factura),
  };

  return formatAllDates(asset);
}

export function formatStr(data: any, fallback: string = ''): string {
  return data ? data.toString() : fallback;
}

export function formatNumber(data: any): number | undefined {
  return data ? Number(removeNonNumericAndLeadingZeros(String(data))) : undefined;
}

export const parseCoordinates = (coordString: string): Coordinates => {
  const [lat, lng] = coordString.split(',').map((coord) => coord.trim());
  return { lat, lng };
};
