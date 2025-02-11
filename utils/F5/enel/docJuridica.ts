import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const docJuridica = async (projectStage: any) => {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `CONTRATO DE CONEXIÓN CLIENTE N°${projectStage.num_cliente_distribuidora}`,
                bold: true,
                underline: {
                  type: 'single',
                  color: '#000000',
                },

                size: 32,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `En Santiago de Chile, a ${formattedDate}, entre ENEL DISTRIBUCIÓN CHILE S.A., RUT N° 96.800.570-7, representada por don Maximiliano Domínguez Rivera, cédula nacional de identidad N° 9.216.950-2, ambos domiciliados en Avenida Santa Rosa N° 76, Piso 8, de la comuna y ciudad de Santiago, en adelante también e indistintamente la Empresa Distribuidora, por una parte, y, por la otra, ${projectStage.client_name}, en adelante también e indistintamente el Usuario o Cliente Final, RUT N° ${projectStage.client.rut}, 
                representada por ${projectStage.client_name}, cédula nacional de identidad N° ${projectStage.client.rut}, ambos (todos, si tiene más de un representante) domiciliados en ${projectStage.direccion}, de la comuna de ${projectStage.comuna}, de la ciudad de Santiago, se ha convenido en el siguiente contrato de conexión:`,
                break: 3,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `PRIMERO: `,
                break: 2,
                bold: true,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `Por el presente instrumento ENEL DISTRIBUCIÓN CHILE S.A. y el Usuario o Cliente Final acuerdan celebrar un contrato de conexión que se regirá por las siguientes cláusulas.`,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `El Usuario o Cliente Final, mediante Certificado de Dominio Vigente de fecha ________, acredita que es propietario del inmueble ubicado en ______________________, de la comuna de ______________________, de la ciudad de Santiago.`,
                break: 2,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `SEGUNDO: `,
                break: 2,
                bold: true,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `La opción tarifaria para la energía eléctrica inyectada a la red de distribución de ENEL DISTRIBUCIÓN CHILE S.A. será la establecida en la normativa vigente.`,

                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `TERCERO: `,
                break: 2,
                bold: true,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `La Capacidad Instalada del Equipamiento de Generación corresponderá a ${projectStage.potencia_kw} kW.`,

                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `CUARTO: `,
                break: 2,
                bold: true,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `La capacidad de inyección del Equipamiento de Generación será de ${projectStage.potencia_kw} kW. La valorización de las inyecciones será descontada en la boleta correspondiente al mes en el cual se realizaron dichas inyecciones. De existir un saldo a favor del Usuario o Cliente Final, éste será descontado en las boletas siguientes y reajustados de acuerdo al Índice de Precios al Consumidor (IPC), conforme lo dispone el artículo 50° del Reglamento de generación distribuida para autoconsumo.`,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `QUINTO: `,
                break: 2,
                bold: true,
                size: 24,
                font: 'Arial MT',
              }),
              new TextRun({
                text: `La propiedad del equipo medidor corresponde a Enel y La modalidad de lectura será____________________(la que rija en el contrato de suministro u otra contratada). (Debe ser llenado por Enel).`,
                size: 24,
                font: 'Arial MT',
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `SEXTO: `,
                    bold: true,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Las características técnicas esenciales del Equipamiento de Generación, en conformidad a los literales c), d) y e) del artículo 17° del Reglamento de generación distribuida para autoconsumo, serán basado en inversores.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Toda modificación a las características técnicas esenciales del Equipamiento de Generación identificadas en conformidad con el literal f) del artículo 20 del Reglamento de la Ley N° 20.571, deberá ser informada por el Usuario o Cliente Final a la Empresa Distribuidora. La Empresa Distribuidora, a su vez, deberá comunicar al Usuario o Cliente Final su conformidad o su negativa, en cuyo caso se podrá fundar exclusivamente cuando se ponga en riesgo la continuidad de suministro, la calidad del producto eléctrico o la seguridad de las personas o cosas, dentro del plazo y forma establecidos.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `En lo demás, se aplicará lo dispuesto en la normativa vigente.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `SÉPTIMO: `,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `El empalme está ubicado en ${projectStage.direccion}`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `OCTAVO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `La fecha de Conexión del Equipamiento de Generación es __________________________ (Debe ser llenado por Enel).`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `NOVENO: `,
                    bold: true,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Las Partes convienen que se podrá dar término anticipado al contrato, de acuerdo a los casos establecidos a continuación:`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `1. Por Acuerdo entre las Partes. Las Partes podrán poner término anticipado al contrato, de común acuerdo, cuando a juicio de ambas se presenten causas que hagan imposible su cumplimiento y cuya solución no está contemplada en el contrato.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `2. Por Incumplimiento del Usuario o Cliente Final. Por contravención del usuario a cualquiera de las exigencias que impone la regulación eléctrica, lo que dará derecho a ENEL DISTRIBUCIÓN CHILE S.A. a poner término de inmediato a éste, sin derecho a indemnización para el Usuario o Cliente Final y a exigir el pago de las indemnizaciones que correspondan por los perjuicios causados.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Las Partes acuerdan que el pago de los remanentes no descontados, señalados en el inciso final del artículo 40 del Reglamento de la Ley N° 20.571, se efectuará al Usuario o Cliente Final en el mes de agosto de cada año, lo que será debidamente informado por carta u otro medio disponible al Usuario o Cliente Final.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Esta devolución se realizará a través de vale vista, transferencia bancaria u otro medio disponible, según corresponda. Los datos por tanto son los siguientes:`,
                    size: 24,
                    break: 2,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `NOMBRE DEL CLIENTE:`,
                    bold: true,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `RUT:`,
                    bold: true,
                    break: 1,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `NUMERO CUENTA CORRIENTE:`,
                    break: 1,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `BANCO:`,
                    break: 1,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `CORREO ELECTRÓNICO:`,
                    break: 1,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `TELÉFONO MÓVIL:`,
                    break: 1,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Ante cualquier modificación de datos, el cliente deberá informar oportunamente a la empresa distribuidora`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO PRIMERO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `El presente contrato es indefinido, salvo que ambas partes manifiesten su intención en contrario y por escrito.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO SEGUNDO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `ENEL DISTRIBUCIÓN CHILE S.A. dispondrá de sus canales de atención, publicados en su sitio web, como medios de comunicación con el cliente y notificará al usuario final a través de correo electrónico, mensaje de texto u otros medios similares determinados por la compañía. El usuario final tendrá la obligación de mantener informados y actualizados los datos para ser contactado.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO TERCERO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `ENEL DISTRIBUCIÓN CHILE S.A. no será responsable de los perjuicios que pueda sufrir el Usuario o Cliente Final por la falta total o parcial de energía eléctrica, motivada por caso fortuito o fuerza mayor, trabajos programados, o por problemas ajenos a su sistema eléctrico, que interrumpa, paralice o perturbe el servicio.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `En caso de trabajos programados o no y en el evento que sea necesario, ENEL DISTRIBUCIÓN CHILE S.A. podrá solicitar al Usuario o Cliente Final la desconexión temporal del Equipamiento de Generación, a lo que éste deberá acceder.`,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO CUARTO: `,
                    bold: true,
                    break: 2,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Todo lo que no está estipulado en el presente contrato, se regirá por lo establecido en el Decreto con Fuerza de Ley (DFL) N° 4 del Ministerio de Economía, Fomento y Reconstrucción del año 2006, el Decreto N° 327 del Ministerio de Minería del año 1997, el Reglamento de la Ley N° 20.571 y Ley N° 21.118 y las normas técnicas e instructivos que se impartan sobre el particular, o los que en el futuro los reemplacen o modifiquen.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO QUINTO: `,
                    bold: true,
                    size: 24,
                    break: 2,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Los datos personales del cliente serán procesados con estricto apego a lo dispuesto en la Ley N° 19.628 sobre protección a la vida privada y demás normativa vigente sobre la materia. Las obligaciones de Enel Distribución Chile S.A. como responsable del tratamiento, y los derechos que el cliente puede ejercer como titular de sus datos, se explican en la política de privacidad de la compañía. La política de privacidad puede ser consultada en cualquier momento, en el footer del sitio web de la compañía, www.enel.cl.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              // ... existing code ...
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Enel Distribución Chile S.A., asegura la confidencialidad de los datos personales contenidos en este instrumento, los cuales serán tratados de manera exclusiva para los fines comerciales y técnicos relacionados con la entrega del suministro de energía eléctrica de acuerdo a las exigencias de la "Normativa Técnica de Calidad de Servicio para Sistemas de Distribución" dictada por la Comisión Nacional de Energía, tales como notificar cortes de suministros y continuidad del servicio eléctrico, informar detalles y estados de la facturación, enviar comunicados y boletines de noticias de la compañía, contactar para dar respuesta o requerir información respecto a solicitudes, consultas y reclamos, generar encuestas asociadas a calidad de servicio, entre otras.`,
                    break: 1,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO SEXTO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Para todos los efectos legales que deriven del presente contrato, las Partes fijan domicilio en la comuna y ciudad de Santiago y se someten a la competencia de sus Tribunales Ordinarios de Justicia.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `DÉCIMO SÉPTIMO: `,
                    break: 2,
                    bold: true,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `El presente contrato se firma en dos (2) ejemplares de idéntico tenor y fecha, quedando uno (1) en poder de ENEL DISTRIBUCIÓN CHILE S.A. y uno en poder del cliente.`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `La personería de don Maximiliano Domínguez Rivera, para comparecer en representación de ENEL DISTRIBUCIÓN CHILE S.A., consta en escritura pública de fecha 30 de Diciembre de 2022, otorgada en la Notaría de Santiago de Sergio Rodríguez Uribe, documentos que no se insertan por ser conocidos de las Partes y a su expresa solicitud.`,
                    size: 24,
                    font: 'Arial MT',
                    break: 2,
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: `--------------------------------`,
                    size: 24,
                    break: 3,
                    font: 'Arial MT',
                    color: '#FFFFFF',
                    underline: {
                      type: 'single',
                      color: '#000000',
                    },
                  }),
                  new TextRun({
                    text: `\t\t\t`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `--------------------------------`,
                    size: 24,
                    font: 'Arial MT',
                    color: '#FFFFFF',
                    underline: {
                      type: 'single',
                      color: '#000000',
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: `ENEL DISTRIBUCIÓN CHILE S.A.`,
                    size: 24,
                    break: 1,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `\t\t`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `USUARIO O CLIENTE FINAL*`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'right',
                children: [
                  new TextRun({
                    text: `\t\t\t\t`,
                    size: 24,
                    font: 'Arial MT',
                  }),
                  new TextRun({
                    text: `Nombre: ${projectStage.client_name}`,
                    size: 24,
                    font: 'Arial MT',
                    break: 1,
                  }),

                  new TextRun({
                    text: `Rut: ${projectStage.client.rut}`,
                    size: 24,
                    font: 'Arial MT',
                    break: 1,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `*Contrato debe ser firmado por todos los propietarios asociados al inmueble o lugar de instalación, conforme a lo indicado en Certificado de Dominio Vigente.`,
                    size: 20,
                    font: 'Arial MT',
                    break: 2,
                  }),
                ],
              }),
            ],
          }),

          // Add more paragraphs as needed
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `F5_${projectStage.key}.docx`);
};
