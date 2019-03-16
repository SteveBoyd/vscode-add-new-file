export function replaceAll(
  originalString: string,
  findValue: string,
  replacementValue: string
): string {
  return originalString.split(findValue).join(replacementValue);
}

export function split(
  originalString: string,
  delimeter: string,
  keepDelimiter: boolean
): RegExpMatchArray | null {
  if (!keepDelimiter) {
    return originalString.split(delimeter);
  } else {
    const regex = new RegExp(`[^\\${delimeter}]+\\${delimeter}?`, 'g');
    return originalString.match(regex);
  }
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
