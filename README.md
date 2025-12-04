```
  - USA ESTE PROYECTO COMO GUÍA, NO TIENE POR QUÉ SER EXACTO (LA ARQUITECTURA GENERAL SI DEBE SER RESPETADA {PUEDES OMITIR LA COMPLEJIDAD LÓGICA DEL LAYOUT Y SUS COMPONENTES}).
  - MODIFICARLA Y ENRIQUECERLA TAMBIÉN ESTÁ PERMITIDO.    
  - LA ÚLTIMA PREGUNTA ES IMPORTANTE "ALLÍ ES DONDE TIENES QUE BRILLAR"
  - ESTE PROYECTO SE ENCONTRARÁ EN UN GRUPO en gitLab
  - EL PROYECTO PRINCIPAL SERÁ LA PRUEBA, Y EL SEGUNDO UN PROYECTO INICIADO VACÍO (TENDRÁ TU NOMBRE) -> LA IDEA ES QUE CLONES ESTE PRIMERO, LO REVISES Y LUEGO TRABAJES SOBRE EL SEGUNDO 
  ```
  


# Bienvenido 🐝
  - Esta es una evaluación sencilla para desarrollo en Angular

## 1 Aplicación
  - La estructura del proyecto debe quedar de la siguiente manera
  
    ````
        proyecto/
        ├─ public/
        │   └─ (assets estáticos: logos, favicons, imágenes)
        │
        ├─ src/
        │   ├─ app/
        │   │   ├─ layout/
        │   │   │   ├─ assets/scss/
        │   │   │   ├─ components/
        │   │   │   ├─ core/
        │   │   │   │   ├─ interfaces/
        │   │   │   │   ├─ services/
        │   │   │   │   └─ types/
        │   │   │   └─ layout.ts
        │   │   ├─ core
        │   │   │   ├─ interfaces/
        │   │   │   ├─ types/
        │   │   │   ├─ services/
        │   │   │   ├─ store/ **
        │   │   │   └─ pipes/
        │   │   │
        │   │   ├─ pages/
        │   │   │   ├─ home/
        │   │   │   ├─ page_2/ ***
        │   │   │   └─ pages.routes.ts
        |   |   |
        │   │   ├─ components/
        │   │   │
        │   │   ├─ app.ts
        │   │   ├─ app.html
        │   │   ├─ app.config.ts
        │   │   ├─ app.routes.ts
        │   │   └─ app.scss
        |   |
        │   ├─ resources/
        |   |   ├─ keycloak-config.ts /*
        │   │   └─ custom-theme.ts
        |   |
        │   ├─ environments/
        │   ├─ index.html
        │   ├─ main.ts
        │   └─ styles.scss
        │
        ├─ Dockerfile
        ├─ nginx.conf
        ├─ tailwind.config.js
        ├─ angular.json
        ├─ package.json
        └─ README.md
    

### Indicaciones
  ## 1 Base
  - Se debe construir una aplicación en base a la api <a href="https://rickandmortyapi.com/">rick&mortyAPI</a>.
  - De utilizar alguna librería de estilos, se recomienda <a href="https://primeng.org/">prime-ng</a>
  - Se espera de esta: 
     - que contenga un layout (`<header><section><footer>`)
     - que despliegue la colección proporcionada por el endpoint.
     - que permita visualizar la información individual de cada elemento (una vista detalle)
     - de existir posibles nuevas secciones para visualización, que se pueda acceder a ellas por medio del de un menú.
     - la aplicación debe dockerizar correctamente, la revisión de esta será por medio de su despliegue en un contenedor
     
## 2 Ejercicios
  - Con los datos obtenidos de la API organizar colecciones (characters) según siguientes criterios (idealmente de forma dinámica por medio de input):
    - status
    - species
    - origin
  - Con los datos obtenidos de la API, organizar las colecciones (locations) según los siguientes criterios:
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
  