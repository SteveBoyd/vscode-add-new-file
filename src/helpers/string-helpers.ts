export class StringHelpers {
  public replaceAll(
    originalString: string,
    findValue: string,
    replacementValue: string
  ): string {
    var reg = new RegExp(findValue, 'g');
    return originalString.replace(reg, replacementValue);
  }
}
