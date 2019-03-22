import * as vscode from 'vscode';
import * as data from '../data/file-type-configuration.json';
import * as fileSystemWrapper from '../file-system-wrapper';
import { FileConfiguration } from '../models/file-configuration';

export function getFileConfiguration(fileName: string): FileConfiguration {
  if (fileName.endsWith('\\') || fileName.endsWith('/')) {
    return { Identifier: 'Directory' } as FileConfiguration;
  }

  let configurationData: FileConfiguration[] = data.FileTypeConfigurations;

  const customDataPath = `${
    vscode.workspace.rootPath
  }\\file-type-configuration.json`;
  let customData = fileSystemWrapper.readJsonFile(customDataPath);
  if (customData) {
    for (let customConfig of customData) {
      configurationData = configurationData.filter(
        item => item.Identifier !== customConfig.Identifier
      );
      configurationData = configurationData.concat(customConfig);
    }
  }

  for (let fileConfig of configurationData) {
    if (fileName.match(fileConfig.Pattern)) {
      return {
        Identifier: fileConfig.Identifier,
        FileTemplate: fileConfig.FileTemplate
      } as FileConfiguration;
    }
  }

  return {
    Identifier: 'Unknown',
    FileTemplate: ''
  } as FileConfiguration;
}

export function getDefaultFileConfigurationJson(): string {
  return JSON.stringify(data.FileTypeConfigurations);
}
