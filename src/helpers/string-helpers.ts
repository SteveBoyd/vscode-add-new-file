export class StringHelpers {
  public replaceAll(
    originalString: string,
    findValue: string,
    replacementValue: string
  ): string {
    var reg = new RegExp(findValue, 'g');
    return originalString.replace(reg, replacementValue);
  }

  public split(
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
}
