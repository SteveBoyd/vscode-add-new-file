import { FileType } from './enums/file-type.enum';

export class FileTypeIdentifier {
  identifyFileType(name: string): FileType {
    if (name.endsWith('\\') || name.endsWith('/')) {
      return FileType.Directory;
    }

    if (name.endsWith('.enum.ts')) {
      return FileType.TypescriptEnum;
    }

    if (name.endsWith('.ts')) {
      return FileType.TypescriptClass;
    }

    return FileType.Unknown;
  }
}
