export const formatPhoneNumber = (value: string): string => {
    const cleaned = ('' + value).replace(/\D/g, '');
  
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 11) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 11)}`;
    }
  };