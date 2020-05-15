


## Components Params

- Input parameters
  - Define @Input() after the field from the component. The father can send it with [name]="fathername".

- Output parameters
  - ? Events ?


## Interfaces

Create ts interfaces from json. For all the Responses we get from the spring application we need to now the type of the object it will return. We can just paste the data in the following website and copy the ts interfaces.

`http://json2ts.com/`

Also we need to define as class all the POST body we want to sent to the spring boot server. For that we need to create a class instead of an interface. Instanciate an object and pass it to the service.

## Authorization

Http interceptor. Is imported in the app module and it handles every http request that is sent to the springboot application. We import the provider defined in the `auth.interceptor.ts` file.

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

