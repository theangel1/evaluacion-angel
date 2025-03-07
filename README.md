# Bienvenido 🐝
  - Esta es una evaluación sencilla para desarrollo en Angular

## 1 Aplicación
  - La estructura del proyecto debe quedar de la siguiente manera
  
    ````
      src
      ├─ app
      |   ├─ home
      |   |    ├─ components
      |   |    |    ├─ component[n].ts
      |   |    |    └─ component[n].html
      |   |    ├─ home.ts
      |   |    └─ home.html
      |   ├─ core
      |   |    ├─ services
      |   |    |     └─ service[n].ts
      |   |    └─ interfaces
      |   |         └─ interface[n].ts
      |   ├─ shared
      |   |     └─ component-shared[n]
      |   |         ├─ component-shared[n].ts
      |   |         └─ component-shared[n].html               
      |   |
      |   ├─ app-component.ts
      |   └─ app-component.html
      ├─ assets
      |     ├─ images
      |     ├─ sass
      |     |   ├─ abstracts
      |     |   ├─ base
      |     |   ├─ components
      |     |   |    └─ component[n].scss
      |     |   ├─ pages
      |     |   ├─ themes
      |     |   └─ vendors
      |     └─ main.scss
      |
      ├─ environments
      |     ├─ environment.prod.ts
      |     ├─ environment.qa.ts
      |     └─ environment.ts
      └─ REST 

### Indicaciones
  ## 1 Base
  - Se debe construir una aplicación en base a la api <a href="https://rickandmortyapi.com/">rick&mortyAPI</a>.
  - De utilizar alguna librería de estilos, se recomienda <a href="https://primeng.org/">prime-ng</a>
  - Se espera de esta: 
     - que contenga un layout (`<header><section><footer>`)
     - que despliegue la colección proporcionada por el endpoint.
     - que permita visualizar la información individual de cada elemento (una vista detalle)
     - de existir posibles nuevas secciones para visualización, que se pueda acceder a ellas por medio del `<header>`
     - la aplicación debe dockerizar correctamente, la revisión de esta será por medio su despliegue en un contenedor
     
## 2 Ejercicios
  - Con los datos obtenidos de la API organizar colecciones (characters) según siguientes criterios (idealmente de forma dinámica por medio de input):
    - status
    - species
    - origin
  - Con los datos obtenidos de la API, organizar las colecciones (locations) sergún los siguientes criterios:
    - name
    - type

  - Frente al siguiente fragmento, ¿qué puede decir? 
    (No estamos esperando una respuesta específica, puede comentar todo lo que pueda observar, corregir, etc.)
    ````
    const arry: number[] = [1, 2, 3, 7];
    var multiply: number = 3

    function multiplyMe(arr: number[]): number[]{
      for(let i = 0; i < arr.length; i++){
        arr[i] = arr[i] * multiply;
      }
    }
  >RESPUESTA  
  --> 
  