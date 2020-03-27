# ADR Integración Continua

## Contexto
Se necesita definir una serie de herramientas capaces de proporcionar una forma ágil de integrar los cambios en el proyecto.
Asimismo, deben posibilitar que una vez integrado, todo funcione correctamente.

## Decisión
Utilizar las siguientes herramientas:
  1. **Jenkins**: disposición de *Pipelines* para los tests de integración.
  2. **Docker**: despliegue de la aplicación.

Se decide del mismo modo que no es necesario realizar tests de rendimiento, debido a que el alcance del proyecto no es tan amplio como para registrar un gran flujo de usuarios o peticiones del servicio.

## Estado
(Tachar las que no apliquen)
1. Aceptado
2. ~~Rechazado~~
3. ~~Reemplazado~~

## Implicaciones
La utilización de las herramientas elegidas supone que el equipo de desarrollo deba aprender a manejarlas, lo cual conllevará un tiempo considerable a tener en cuenta en la gestión inicial del proyecto.
#### Fecha
26 de marzo de 2020
