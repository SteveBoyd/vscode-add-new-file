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
            "FileTemplate": "export class [[FileName]] \n{\n\t\n}"
        },
        {
            "Identifier": "TypescriptEnum",
            "Pattern": "^[^.]+[.]enum[.]ts$",
            "FileTemplate": "export enum [[FileName]] \n{\n\t\n}"
        },
        {
            "Identifier": "GitIgnore",
            "Pattern": "[.]gitignore",
            "FileTemplate": "dist/\nnode_modules/"
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

#### FileTemplate

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

#### FileTemplate

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

#### FileTemplate

```
dist/
node_modules/
```
