import * as stringHelpers from './string-helpers';

export function hasReplaceableSections(template: string): boolean {
  var result = template.match('');
  if (!result) {
    return false;
  }

  return true;
}

export function runReplacement(
  template: string,
  replacementFileName: string
): string {
  var result = stringHelpers.replaceAll(
    template,
    '[[FileName]]',
    replacementFileName
  );

  return result;
}
