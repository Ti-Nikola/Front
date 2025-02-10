export function removeNonNumericAndLeadingZeros(input: string): string {
  return input.replace(/[^0-9]/g, '').replace(/^0+/, '');
}

export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return ' ';

  if (phone.startsWith('569'))
    return `+${phone.slice(0, 2)} ${phone[2]} ${phone.slice(3, 7)} ${phone.slice(7)}`;

  return phone;
}

export const formatNumberWithDots = (input: string): string => {
  const sanitizedInput = removeNonNumericAndLeadingZeros(input);
  return sanitizedInput.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatRut = (value: string) => {
  // Remove any non-numeric or non-"k/K" characters
  const cleaned = value.replace(/[^0-9kK]/g, '').toUpperCase();

  const body = cleaned.slice(0, -1);
  const verifier = cleaned.slice(-1);

  // Add dots every three digits
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combine the formatted body and verifier with a dash
  return body ? `${formattedBody}-${verifier}` : cleaned;
};

export const formatPercentage = (input: string): string => {
  const sanitizedInput = removeNonNumericAndLeadingZeros(input).slice(0, 5); // Allow up to 5 digits

  let formatted = '';
  if (sanitizedInput.length === 1) {
    formatted = `.0${sanitizedInput}`;
  } else if (sanitizedInput.length === 2) {
    formatted = `.${sanitizedInput[0]}${sanitizedInput[1]}`;
  } else if (sanitizedInput.length === 3) {
    formatted = `${sanitizedInput[0]}.${sanitizedInput[1]}${sanitizedInput[2]}`;
  } else if (sanitizedInput.length === 4) {
    formatted = `${sanitizedInput[0]}${sanitizedInput[1]}.${sanitizedInput[2]}${sanitizedInput[3]}`;
  } else if (sanitizedInput.length === 5) {
    formatted = '100.00'; // Limit to 100
  }

  return formatted;
};

export function formatPercentageToDisplay(value: number | string): string {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  if (isNaN(value)) return '0 %';

  const formattedValue =
    value % 1 === 0 ? value.toString() : parseFloat(value.toFixed(2)).toString();

  return `${formattedValue} %`;
}

export const formatDecimal = (input: string): string => {
  const sanitizedInput = removeNonNumericAndLeadingZeros(input);
  if (sanitizedInput === '') return '0.00';

  const integerPart = sanitizedInput.slice(0, -2) || '0';
  const decimalPart = sanitizedInput.slice(-2).padStart(2, '0');
  return `${integerPart}.${decimalPart}`;
};

export const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

export const formatNumberToDisplay = (value: number | string): string => {
  if (!value) return '';

  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  if (isNaN(value)) return '';

  return value.toLocaleString('es-CL');
};
