export const formatRut = (value: string) => {
  // Remove any non-numeric or non-"k/K" characters
  const cleaned = value.replace(/[^0-9kK]/g, '').toUpperCase();

  // Extract RUT body and verifier
  const body = cleaned.slice(0, -1);
  const verifier = cleaned.slice(-1);

  // Add dots every three digits
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combine the formatted body and verifier with a dash
  return body ? `${formattedBody}-${verifier}` : cleaned;
};
