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

  const matches: [FileConfiguration, RegExpMatchArray][] = [];

  for (let fileConfig of configurationData) {
    const match = fileName.match(fileConfig.Pattern);
    if (match) {
      matches.push([fileConfig, match]);
    }
  }

  if (matches.length !== 0) {
    let selectedMatch: FileConfiguration = matches[0][0];

    for (let i = 1; i < matches.length; i++) {
      const currentMatch = matches[i];

      if (currentMatch[0].Priority > selectedMatch.Priority) {
        selectedMatch = matches[i][0];
      }
    }

    return selectedMatch;
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
