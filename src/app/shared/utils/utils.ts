export function toCamelCase(text: string): string {
  const tmpText = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return tmpText.substring(0, 1).toLowerCase() + tmpText.substring(1);
}

export function safelyParseJSON(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

export const sunsetSunrise = (utc: number): string => {
  const date = new Date(utc * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
