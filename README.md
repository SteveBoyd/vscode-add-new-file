# Add New File

VSCode extension to enable adding new files with template based on file type.

Inspired by Visual Studio extension [AddAnyFile](https://github.com/madskristensen/AddAnyFile)

## Available Actions

### Add File: Add New File

Used for creating new file at the path specified by the user. Opens input box prepopulated with the root path of the current workspace.

### Add File: Add Custom Templates

Generates a JSON file at the root of the project to hold user defined templates.

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

### Typescript Angular Component

#### Pattern

```regex
^.+[.]component[.]ts$
```

#### FileTemplate

```typescript
import { Component } from '@angular/core';

@Component({
    selector: '',
    templateUrl: '',
    styleUrls: ['']
})
export class [[FileName]] {

}
```

### Typescript Angular Module

#### Pattern

```regex
^.+[.]module[.]ts$
```

#### FileTemplate

```typescript
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
    providers: [],
    bootstrap: []
})
export class [[FileName]] {

}
```

### Typescript Angular Serice

#### Pattern

```regex
^.+[.]service[.]ts$
```

#### FileTemplate

```typescript
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class [[FileName]] {

    constructor() { }
}
```

## New Templates

If you want a file template to be added then you can either:

- Raise a PR with the new template
- Create an issue

### Raising a PR

If you decide to add the template yourself you will need to:

- Add the tempalte details to file-type-configuration.json
- Update the README with the details of the new template

### Raising an issue

Requests for new template require 3 pieces of information to be included in the raised issue:

- Type of the template (C# Class, GitIgnore, Angular Module, etc)
- An example file name to create the pattern from
- The default template content
