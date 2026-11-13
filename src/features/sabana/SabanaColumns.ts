import { createColumnHelper } from "@tanstack/react-table";

export interface SabanaRow {
  folio: string;                    // A: folio
  adn?: string;                     // B: adn
  chipSiniiga?: string;             // C: CHIP (484...)
  fechaNacimiento: string;          // D: FECHA NACIMIENTO
  fechaDestete?: string;            // E: FECHA DESTETE
  edadMeses: number;                // F: EDAD MESES
  edadDias: number;                 // G: EDAD DIAS
  pesoNacimientoKg?: number;        // H: PESO NACIMIENTO
  peso120DiasKg?: number;           // I: PESO 120 DIAS
  peso150DiasKg?: number;           // J: PESO 150 DIAS
  pesoEvaluacionKg?: number;        // K: PESO A LA EVALUACION
  circunferenciaEscrotalCm?: number;// L: CIRCUNFERENCIA
  pesoDesteteKg?: number;           // M: PESO DESTETE
  tipoDestete?: string;             // N: TIPO DESTETE
  padreFolioInterno?: string;       // O: PADRE
  folioPadreUno?: string;           // P: FOLIO PADRE
  madreFolioInterno?: string;       // Q: MADRE
  folioMadreUno?: string;           // R: FOLIO MADRE
  raza: string;                     // S: RAZA
  tipoParto: string;                // T: TIPO DE PARTO
  concepcion: "MN" | "IA" | "TE";   // U: CONCEPCION
  color: string;                    // V: COLOR
  sexo: "HEMBRA" | "MACHO";         // W: SEXO
  fechaCorteIso: string;            // X: =AHORA()
}

const columnHelper = createColumnHelper<SabanaRow>();

export const sabanaColumns = [
  columnHelper.accessor("folio", { header: "A · Folio" }),
  columnHelper.accessor("adn", { header: "B · ADN" }),
  columnHelper.accessor("chipSiniiga", { header: "C · CHIP SINIIGA" }),
  columnHelper.accessor("fechaNacimiento", { header: "D · Fecha Nac." }),
  columnHelper.accessor("fechaDestete", { header: "E · Fecha Destete" }),
  columnHelper.accessor("edadMeses", { header: "F · Edad (Meses)" }),
  columnHelper.accessor("edadDias", { header: "G · Edad (Días)" }),
  columnHelper.accessor("pesoNacimientoKg", { header: "H · Peso Nac. (kg)" }),
  columnHelper.accessor("peso120DiasKg", { header: "I · Peso 120d (kg)" }),
  columnHelper.accessor("peso150DiasKg", { header: "J · Peso 150d (kg)" }),
  columnHelper.accessor("pesoEvaluacionKg", { header: "K · Peso Eval. (kg)" }),
  columnHelper.accessor("circunferenciaEscrotalCm", { header: "L · Circ. Escrotal (cm)" }),
  columnHelper.accessor("pesoDesteteKg", { header: "M · Peso Destete (kg)" }),
  columnHelper.accessor("tipoDestete", { header: "N · Tipo Destete" }),
  columnHelper.accessor("padreFolioInterno", { header: "O · Padre" }),
  columnHelper.accessor("folioPadreUno", { header: "P · Folio Padre UNO" }),
  columnHelper.accessor("madreFolioInterno", { header: "Q · Madre" }),
  columnHelper.accessor("folioMadreUno", { header: "R · Folio Madre UNO" }),
  columnHelper.accessor("raza", { header: "S · Raza" }),
  columnHelper.accessor("tipoParto", { header: "T · Tipo Parto" }),
  columnHelper.accessor("concepcion", { header: "U · Concepción" }),
  columnHelper.accessor("color", { header: "V · Color" }),
  columnHelper.accessor("sexo", { header: "W · Sexo" }),
  columnHelper.accessor("fechaCorteIso", { header: "X · Fecha Corte" }),
];
