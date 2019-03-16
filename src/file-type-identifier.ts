import { FileType } from './enums/file-type.enum';

export class FileTypeIdentifier {
  identifyFileType(name: string): FileType {
    if (name.endsWith('\\') || name.endsWith('/')) {
      return FileType.Directory;
    }

    return FileType.Unknown;
  }
}
