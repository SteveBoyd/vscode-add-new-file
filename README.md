# Add New File

VSCode extension to enable adding new files with template based on file type.

Inspired by Visual Studio extension [AddAnyFile](https://github.com/madskristensen/AddAnyFile)

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
