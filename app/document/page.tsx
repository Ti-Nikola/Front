'use client';

import { generateDocument } from '@/utils/documentService';

export default function DocumentGenerator() {
  const handleGenerateDocument = async () => {
    const projectData = {
      client_name: 'John Doe',
      project_date: '2024-02-07',
      project_details: 'Installation of 10 solar panels',
      project_amount: '$15,000',
      company_name: 'SolarTech Solutions',
      contact_email: 'support@solartech.com',
    };

    try {
      await generateDocument(projectData);
    } catch (error) {
      console.error('Failed to generate document:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <button
      onClick={handleGenerateDocument}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Generate Document
    </button>
  );
}
