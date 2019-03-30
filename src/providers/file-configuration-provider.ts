import * as vscode from 'vscode';
import * as data from '../data/default.templates.json';
import * as fileSystemWrapper from '../file-system-wrapper';
import { FileConfiguration } from '../models/file-configuration';

export function getFileConfiguration(
  fileName: string,
  customConfigPath: string
): FileConfiguration {
  if (fileName.endsWith('\\') || fileName.endsWith('/')) {
    return { Identifier: 'Directory' } as FileConfiguration;
  }

  let configurationData: FileConfiguration[] = getConfigurationData(
    customConfigPath
  );

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

export function getCustomConfigFilePath(
  context: vscode.ExtensionContext
): vscode.Uri {
  return vscode.Uri.file(`${context.globalStoragePath}/user.templates.json`);
}

function getConfigurationData(customConfigPath: string): FileConfiguration[] {
  let configurationData: FileConfiguration[] = data.FileTypeConfigurations;

  if (!customConfigPath || !fileSystemWrapper.fileExists(customConfigPath)) {
    return configurationData;
  }

  let customData: any = fileSystemWrapper.readJsonFile(customConfigPath);
  if (customData && customData.FileTypeConfigurations) {
    for (let customConfig of customData.FileTypeConfigurations) {
      configurationData = configurationData.filter(
        item => item.Identifier !== customConfig.Identifier
      );
      configurationData = configurationData.concat(customConfig);
    }
  }

  return configurationData;
}
