export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return ' ';

  // Check if the phone number starts with '569' and format it
  if (phone.startsWith('569')) {
    return `+${phone.slice(0, 2)} ${phone[2]} ${phone.slice(3, 7)} ${phone.slice(7)}`;
  }

  return phone;
}
