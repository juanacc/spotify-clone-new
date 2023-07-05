# SpotifyCloneJpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

##******************************************************************************************************************************************************************
## Crear nueva aplicacion
    `ng new app_name`
    Esto me preguntara si quiero usar rutas y los estilos
    Tambien puedo ejecutar el comando:
        `ng new app_name --routing --style=css`
        Esto me genera el mismo proyecto pero sin hacerme las preguntas sobre routing y css

## Comandos utiles para Angular
    Fuente: https://codigoencasa.com/los-comandos-de-angular-mas-usados/

## Levantar app por un puerto especifico
    `ng s --port=2500`

## Compartir app en red local
    `ng s --host=0.0.0.0 --port=XXXX`
    Luego busco IP local de mi equipo(ipconfig)
    Una vez que tengo la ip local, puedo usarla desde cualquier dispositivo conectado en la misma red poniendo ip_local:puerto

## Assets
    Iconos: https://iconscout.com/
        En explorer, seleccionar "Uniconns" y copiar CDN
        En index.html pegar CDN
    Fuentes: https://fonts.google.com/specimen/Poppins?query=poppi
        Selecciono Regular 400, Medium 500, SemiBold 600 y copiar CDN y lo pego en el index.html

## Dataset
    Para poder usar el dataset, dentro del archivo tsconfig.json ubico el objeto compilerOptions y agrego la propiedad: "resolveJsonModule": true esto permite usar importaciones de archivos json dentro de los componentes

## Brand Color
    Edito archivo styles.css
    :root{} es una propiedad de CSS para declarar variables

## Scaffolding
    core: recursos o clases que no se neceiten importar en un modulo
    modules: contiene todos los modulos de la app
    shared: contiene todos los recursos que se suelen compartir entre modulos

## Modulos
    Referencia: https://angular.io/guide/architecture-modules
    Para generar modulos ejecuto el comando:
    `ng g m module_name` --> como no indico adonde quiero generarlo, esto genera un modulo dentro de la carpeta app(lo mismo aplica para componentes, directivas, etc)
    `ng g m modules/module_name` --> esto genera un modulo dentro de la carpeta indicada
    `ng g m modules/auth --routing` crea un modulo dentro de la carpeta modules llamado auth y tendra rounting
    `ng g m shared/shared --flat` para no generar una carpeta dentro de otra

## Lazy-loading
    Fuente: https://angular.io/guide/lazy-loading-ngmodules
    Video 16, seccion 4 explicacion de como ver lo que se va cargando en la app

    Crear un componente dentro de un modulo
    Ej: `ng g c modules/home/pages/homePage` esto crea dentro de modules/home una carpeta llamada pages y dentro de esta carpeta el componente

    Generar alias: es para acortar paths de las importaciones
        En el archivo tsconfig.json, dentro del objeeto "compilerOptions", crear una nueva propiedad llamada paths en donde se definen las rutas a distintas carpetas. Por ej:
        `"paths": {
            "@core/*": [
                "src/app/core/*"
            ],
            "@modules/*": [
                "src/app/modules/*"
            ],
            "@shared/*": [
                "src/app/shared/*"
            ],
        }`

        Luego al importar un componente que este dentro de alguna de esas rutas, puedo hacerlo por ej escribiendo:
        `import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';` --> en este caso el componente sidebar esta dentro de la carpeta shared
## Rutas
    Ver ejemplos de llamada a rutas con parametros desde el html, ts en el componente sidebar.component.html y sidebar.component.ts

## Directivas
    dentro de shared/directives creo una directiva. En el selector de la directiva le agrego 'img' al nombre para que la misma solo pueda aplicarse a imagenes

## Programacion reactiva(rxjs)
    https://osmancea.medium.com/programaci%C3%B3n-reactiva-con-rxjs-bebc9432485f
    ver explicacion grafica en video 29 seccion 6
    https://www.learnrxjs.io/learn-rxjs/operators
    https://www.learnrxjs.io/learn-rxjs/operators/creation/of

Avance: video 29, seccion 6