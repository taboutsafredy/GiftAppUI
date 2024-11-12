// src/utils/formatDate.ts

/*
* formatDate
* An formatDate function which takes a date string and returns a formatted date string.
*/

export const formatDate = (dateString: string, t: (key: string) => string): string => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}.${month}.${year} ${t('at')} ${hours}:${minutes}`;
};