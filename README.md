# Add New File

VSCode extension to enable adding new files with template based on file type.

Inspired by Visual Studio extension [AddAnyFile](https://github.com/madskristensen/AddAnyFile)

## Available Actions

### Add File: Add New File

Used for creating new file at the path specified by the user. Opens input box prepopulated with the root path of the current workspace.

### Add File: Edit Custom Templates

Opens the custom templates file for editing. If it does not exist it will be created in global storage.

## Customising Templates

You can define your own templates by running "Edit Custom Templates" from the command palette. This will generate a JSON file for you to place your own templates. You can even use it to overwrite the existing templates by setting the identifier to match the one from the default templates.

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

### Typescript Jasmine Test

#### Pattern

```regex
^.+[.]spec[.]ts$
```

#### FileTemplate

```typescript
describe('AppComponent', () => {
    beforeEach(() => {

    });

    it('should create the app', () => {

    });
});
```

## New Templates

If you want a file template to be added then you can either:

- Raise a PR with the new template
- Create an issue

### Raising a PR

If you decide to add the template yourself you will need to:

- Add the tempalte details to default.templates.json
- Update the README with the details of the new template

### Raising an issue

Requests for new template require 3 pieces of information to be included in the raised issue:

- Type of the template (C# Class, GitIgnore, Angular Module, etc)
- An example file name to create the pattern from
- The default template content
