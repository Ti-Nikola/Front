import React from 'react';

import { Button } from '@/components/ui/button';
import { ProjectDetail } from '@/types/Project';
import { docCGE } from '@/utils/F5/CGE/docCGE';
import { docContratoNatural } from '@/utils/F5/enel/docContratoNatural';
import { docJuridica } from '@/utils/F5/enel/docJuridica';

interface DocumentGenerationCardProps {
  onGenerate: () => void;
  project: ProjectDetail;
}

export const DocumentGenerationCard: React.FC<DocumentGenerationCardProps> = ({
  onGenerate,
  project,
}) => {
  const [distribuidora, setDistribuidora] = React.useState(project.distribuidora || '');
  const [clientRUT, setClientRUT] = React.useState(project.client.rut || '');
  const [useDefaultRUT, setUseDefaultRUT] = React.useState(true);
  const [personalidadJuridica, setPersonalidadJuridica] = React.useState('natural');
  const [useDefaultClientName, setUseDefaultClientName] = React.useState(true);
  const [clientName, setClientName] = React.useState(project.client.nombre_completo || '');
  const [additionalClientName, setAdditionalClientName] = React.useState('');
  const [additionalClientRUT, setAdditionalClientRUT] = React.useState('');

  const handleGenerate = () => {
    const finalRUT = useDefaultRUT ? project.client.rut : clientRUT;
    const finalClientName = useDefaultClientName ? project.client.nombre_completo : clientName;

    if (distribuidora === 'Enel' && personalidadJuridica === 'natural') {
      docContratoNatural({
        ...project,
        clientRUT: finalRUT,
        clientName: finalClientName,
        distribuidora,
        personalidadJuridica,
      });
    } else if (distribuidora === 'Enel' && personalidadJuridica === 'juridica') {
      docJuridica({
        ...project,
        clientRUT: finalRUT,
        clientName: finalClientName,
        distribuidora,
        personalidadJuridica,
      });
    } else if (distribuidora === 'anotherDistribuidora' && personalidadJuridica === 'natural') {
      docContratoNatural({
        ...project,
        clientRUT: finalRUT,
        clientName: finalClientName,
        distribuidora,
        personalidadJuridica,
      });
    } else if (personalidadJuridica === 'natural_two') {
      docContratoNatural({
        ...project,
        clientRUT: finalRUT,
        clientName: finalClientName,
        additionalClientRUT,
        additionalClientName,
        distribuidora,
        personalidadJuridica,
      });
    } else if (distribuidora === 'cge' && personalidadJuridica === 'natural') {
      docCGE({
        ...project,
        clientRUT: finalRUT,
        clientName: finalClientName,
        distribuidora,
        personalidadJuridica,
      });
    }

    onGenerate();
  };

  return (
    <div className="justify-left mt-6 flex flex-col">
      <div className="mb-4">
        <label>Distribuidora:</label>
        <input
          type="text"
          value={distribuidora}
          onChange={(e) => setDistribuidora(e.target.value)}
          className="rounded border px-2 py-1"
          disabled={true}
        />
        <div></div>
      </div>
      <div className="mb-4">
        <label>RUT del cliente:</label>
        <input
          type="text"
          value={clientRUT}
          onChange={(e) => setClientRUT(e.target.value)}
          className="rounded border px-2 py-1"
          disabled={useDefaultRUT}
        />
        <div>
          <input
            type="checkbox"
            checked={useDefaultRUT}
            onChange={() => setUseDefaultRUT(!useDefaultRUT)}
          />
          <label>Usar RUT por defecto</label>
        </div>
      </div>
      <div className="mb-4">
        <label>Nombre del cliente:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="rounded border px-2 py-1"
          disabled={useDefaultClientName}
        />
        <div>
          <input
            type="checkbox"
            checked={useDefaultClientName}
            onChange={() => setUseDefaultClientName(!useDefaultClientName)}
          />
          <label>Usar nombre del cliente por defecto</label>
        </div>
      </div>

      <div className="mb-4">
        <label>Personalidad Jurídica:</label>
        <select
          value={personalidadJuridica}
          onChange={(e) => setPersonalidadJuridica(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="natural">Natural</option>
          <option value="natural_two">Natural X2</option>
          <option value="juridica">Jurídica</option>
        </select>
      </div>
      {personalidadJuridica === 'natural_two' && (
        <div className="mb-4">
          <label>Nombre del cliente adicional:</label>
          <input
            type="text"
            value={additionalClientName}
            onChange={(e) => setAdditionalClientName(e.target.value)}
            className="rounded border px-2 py-1"
          />
          <label>RUT del cliente adicional:</label>
          <input
            type="text"
            value={additionalClientRUT}
            onChange={(e) => setAdditionalClientRUT(e.target.value)}
            className="rounded border px-2 py-1"
          />
        </div>
      )}
      <Button
        onClick={handleGenerate}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Generar Contrato F5
      </Button>
    </div>
  );
};
