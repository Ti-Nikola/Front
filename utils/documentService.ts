import { getToken } from '@/utils/auth';

export const generateDocument = async (projectData: any) => {
  try {
    // Get the authentication token from wherever you store it (localStorage, Redux store, etc.)
    const token = await getToken(); // Adjust this based on your auth implementation

    const response = await fetch('http://localhost:8000/api/generate-document/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Uncommented and added token
      },
      body: JSON.stringify(projectData),
      credentials: 'include', // Include cookies if using session auth
    });

    if (!response.ok) {
      // Try to get error details from response
      const errorData = await response.json().catch(() => null);
      console.error('Server response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Failed to generate document: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (
      !contentType?.includes(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    ) {
      console.error('Unexpected content type:', contentType);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers.get('content-disposition');
    const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
    a.download = filenameMatch ? filenameMatch[1] : 'project_document.docx';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
};
