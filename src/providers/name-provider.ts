import * as stringHelpers from '../helpers/string-helpers';

export function getNameFromFileName(fileName: string): string {
  const dotSeparatedParts = fileName.split('.');
  if (!dotSeparatedParts[0] || dotSeparatedParts[0] === '') {
    if (!dotSeparatedParts[1]) {
      return fileName;
    }

    return dotSeparatedParts[1];
  }
  let newFileName = '';
  for (let i = 0; i < dotSeparatedParts.length - 1; i++) {
    let dashSeparatedParts = dotSeparatedParts[i].split('-');
    for (let part of dashSeparatedParts) {
      let modifiedPart = stringHelpers.capitalizeFirstLetter(part);
      newFileName = newFileName.concat(modifiedPart);
    }
  }

  return newFileName;
}
