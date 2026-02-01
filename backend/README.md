# Sistema Web para Visualización del Menú de Restaurantes Universitarios (FoodDash)

## 1. Descripción General
El **Sistema Web para la Visualización del Menú de Restaurantes Universitarios** es una plataforma desarrollada con el stack **PERN (PostgreSQL, Express, React y Node.js)** que permite a los estudiantes consultar los menús diarios de los restaurantes de la universidad, visualizar precios, puntuar los platos y realizar reseñas.  

Asimismo, los restaurantes pueden gestionar dinámicamente su menú diario y acceder a indicadores clave mediante un dashboard.

---

## 2. Objetivos del Sistema

### 2.1 Objetivo General
Desarrollar un sistema web centralizado que permita la gestión y visualización diaria de los menús de los restaurantes universitarios, incorporando funcionalidades de búsqueda, puntuación y análisis de datos.

### 2.2 Objetivos Específicos
- Permitir a los estudiantes visualizar restaurantes, platos y precios actualizados diariamente.
- Implementar un sistema de puntuación y reseñas de platos.
- Facilitar a los restaurantes la administración dinámica de su menú diario.
- Proveer indicadores y métricas de desempeño a los restaurantes mediante un dashboard.
- Gestionar accesos mediante roles diferenciados (Estudiante y Restaurante).

---

## 3. Alcance del Sistema
El sistema cubrirá:
- Gestión de usuarios con autenticación básica.
- Visualización de restaurantes y menús diarios.
- Sistema de ranking y puntuación de platos.
- Gestión de menús por parte de los restaurantes.
- Visualización de indicadores básicos para la toma de decisiones.

**Fuera de alcance (versión actual):**
- Integración con pasarelas de pago externas.
- Gestión logística de pedidos.

---

## 4. Stack Tecnológico

- **Base de Datos:** PostgreSQL  
- **Backend:** Node.js + Express  
- **Frontend:** React  
- **Arquitectura:** API REST  
- **Autenticación:** Login básico con control de roles  

---

## 5. Roles del Sistema

### 5.1 Estudiante
Usuario que consulta restaurantes, menús diarios, puntúa platos y realiza reseñas.

### 5.2 Restaurante
Usuario encargado de administrar su menú diario y analizar indicadores de desempeño.

---

## 6. Requerimientos Funcionales

### 6.1 Autenticación y Autorización
- **RF-01:** El sistema debe permitir el registro e inicio de sesión de usuarios.
- **RF-02:** El sistema debe controlar el acceso a funcionalidades según el rol del usuario.

---

### 6.2 Funcionalidades del Estudiante

#### Pantalla 1: Listado de Restaurantes
- **RF-03:** Mostrar todos los restaurantes registrados.
- **RF-04:** Implementar un buscador dinámico por nombre de restaurante.
- **RF-05:** Visualizar información básica del restaurante (nombre, descripción y puntuación promedio).

#### Pantalla 2: Menú del Día y Ranking
- **RF-06:** Mostrar el menú diario del restaurante seleccionado.
- **RF-07:** Visualizar platos con nombre, descripción y precio.
- **RF-08:** Mostrar un ranking de platos según puntuación.
- **RF-09:** Permitir al estudiante puntuar un plato.
- **RF-10:** Permitir al estudiante dejar una reseña del plato.
- **RF-11:** Mostrar una opción de compra (funcionalidad referencial).

---

### 6.3 Funcionalidades del Restaurante

#### Pantalla 1: Gestión del Menú del Día
- **RF-12:** Crear, editar y eliminar platos del menú diario.
- **RF-13:** Actualizar el menú de forma dinámica mediante formularios.
- **RF-14:** Definir y actualizar precios por plato.

#### Pantalla 2: Indicadores y Dashboard
- **RF-15:** Visualizar indicadores de desempeño del restaurante.
- **RF-16:** Mostrar los platos más puntuados.
- **RF-17:** Mostrar el promedio de puntuaciones.
- **RF-18:** Visualizar la cantidad de reseñas por plato.

---

## 7. Requerimientos No Funcionales
- **RNF-01:** El sistema debe ser responsive (desktop y mobile).
- **RNF-02:** El tiempo de respuesta no debe superar los 3 segundos.
- **RNF-03:** El menú debe actualizarse diariamente.
- **RNF-04:** Garantizar la integridad y consistencia de los datos.
- **RNF-05:** La arquitectura debe permitir escalabilidad y mantenimiento.

---

## 8. Modelo de Datos (Alto Nivel)

- **Usuario**
  - id
  - nombre
  - email
  - contraseña
  - rol

- **Restaurante**
  - id
  - nombre
  - descripción

- **Plato**
  - id
  - nombre
  - descripción
  - precio
  - restaurante_id

- **Menú**
  - id
  - fecha
  - restaurante_id

- **Puntuación**
  - id
  - valor
  - comentario
  - usuario_id
  - plato_id

---

## 9. Consideraciones Finales
El sistema está diseñado bajo una arquitectura modular basada en el stack PERN, permitiendo una clara separación entre frontend y backend. Esto facilita la escalabilidad, el mantenimiento y la futura incorporación de nuevas funcionalidades.

Este documento sirve como base para el desarrollo, control de alcance y documentación del repositorio en GitHub.
