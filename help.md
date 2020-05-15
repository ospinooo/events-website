


## Interfaces

Create ts interfaces from json

`http://json2ts.com/`


## Modules


1. Root Module
2. Feature Module
3. Shared Module
4. Core Module


### Root Module

The root module loads the root component and all other module


### Feature Module

Containes all the components, pipes and directives to implement a feature. All the components must be in the directory.

`Admin Module`

├── src
│   ├── app
│   │   ├── admin 
│   │   │   ├── components
│   │   │   │   ├── shared.component.ts
│   │   │   ├── directives
│   │   │   │   ├── first.directive.ts
│   │   │   │   ├── another.directive.ts
│   │   │   ├── pages
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── rights
│   │   │   │   │   ├── rights.component.ts
│   │   │   │   ├── user
│   │   │   │   │   ├── user.component.ts
│   │   │   │   ├── admin.component.ts
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.css
│   │   │   │   ├── index.ts
│   │   │   ├── pipes
│   │   │   │   ├── first.pipe.ts
│   │   │   │   ├── another.pipe.ts
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.routing.module.ts
│   │   │   ├── index.ts


### Shared Module

Use across different modules.

`/src/app/shared`

The Shared module should not have any dependency on any of the other modules in the application.

