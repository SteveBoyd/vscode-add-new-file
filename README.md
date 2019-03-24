# Add New File

VSCode extension to enable adding new files with template based on file type.

Inspired by Visual Studio extension [AddAnyFile](https://github.com/madskristensen/AddAnyFile)

## Customising Templates

You can replace existing templates or specify your own by placing a file-type-configuration.json file at the root of the workspace. The content of the file should be as follows:

```
{
    "FileTypeConfigurations": [
        {
            "Identifier": "TypescriptClass",
            "Pattern": "^[^.]+[.]ts$",
            "File Template": "export class [[FileName]] \n{\n\t\n}"
        },
        {
            "Identifier": "TypescriptEnum",
            "Pattern": "^[^.]+[.]enum[.]ts$",
            "File Template": "export enum [[FileName]] \n{\n\t\n}"
        },
        {
            "Identifier": "GitIgnore",
            "Pattern": "[.]gitignore",
            "File Template": "dist/\nnode_modules/"
        }
    ]
}
```

## Available Templates

### TypescriptClass

#### Pattern

```regex
^[^.]+[.]ts$"
```

#### File Template

```typescript
export class [[FileName]]
{

}
```

### TypescriptEnum

#### Pattern

```regex
^[^.]+[.]enum[.]ts$
```

#### File Template

```typescript
export enum [[FileName]]
{

}
```

### GitIgnore

#### Pattern

```regex
[.]gitignore
```

#### File Template

```
dist/
node_modules/
```

### C# Interface

#### Pattern

```regex
^I.+[.]cs$
```

#### File Template

```C#
public interface [[FileName]] {

}
```

### C# Class

#### Pattern

```regex
^[^I].+[.]cs$
```

#### File Template

```C#
public class [[FileName]] {

}
```

### JSON

#### Pattern

```regex
^.+[.]json$
```

#### File Template

```
{
    "[[FileName]]": ""
}
```
