export function convertDateForData(dateStr: string): string {
  return dateStr.replaceAll('/', '-');
}

export function convertDateForDisplay(dateStr: string): string {
  return dateStr.replaceAll('-', '/');
}
