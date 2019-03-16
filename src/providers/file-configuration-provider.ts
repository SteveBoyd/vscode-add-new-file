import { FileConfiguration } from '../models/file-configuration';
import * as data from '../data/file-type-configuration.json';

export function getFileConfiguration(fileName: string): FileConfiguration {
  if (fileName.endsWith('\\') || fileName.endsWith('/')) {
    return { identifier: 'Directory' } as FileConfiguration;
  }

  for (let fileConfig of data.FileTypeConfigurations) {
    if (fileName.match(fileConfig.Pattern)) {
      return {
        identifier: fileConfig.Identifier,
        fileTemplate: fileConfig.FileTemplate
      } as FileConfiguration;
    }
  }

  return {
    identifier: 'Unknown',
    fileTemplate: ''
  } as FileConfiguration;
}
