import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const docCGE = async (projectStage: any) => {
  const table = new Table({
    width: {
      size: 4535,
      type: 'pct',
    },

    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Nombre',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'test',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'RUT',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${projectStage.client.rut}`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'test',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Add more rows and cells as needed to match the structure in the image
      // ...
    ],
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'CONTRATO DE CONEXIÓN EQUIPAMIENTO DE GENERACIÓN INDIVIDUAL',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'ANTECEDENTES DEL CLIENTE (CUADRO 1)',
                bold: true,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Si es Persona natural:',
                break: 2,
                size: 24,
              }),
            ],
          }),
          table,
        ],
        properties: {},
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `F5_${projectStage.key}.docx`);
};
