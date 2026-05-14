# JaimeSanchez_TrabajoFinalMarcas

# API REST de Videojuegos 🎮

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una API REST completa utilizando **Node.js** y **Express**.

**Express es una librería de Node la cual facilitará la creación de nuestra API.**

La temática elegida ha sido **videojuegos**, donde se gestionan dos recursos:

### Recurso principal: Videojuegos

Cada videojuego contiene:

* id
* nombre
* genero
* plataforma
* precio
* desarrolladora
* fechaLanzamiento
* stock
* disponible

### Recurso secundario: Reseñas

Cada reseña está vinculada a un videojuego mediante el campo:

* videojuego_id

Cada reseña contiene:

* id
* videojuego_id
* usuario
* comentario
* puntuacion

# Tecnologías utilizadas

* Node.js
* Express
* JavaScript
* JSON

# Instalación

Instalar dependencias:

```bash
npm install express
```

# Ejecutar proyecto

```bash
node index.js
```

Mensaje esperado en consola:

```bash
Servidor de Node en marcha!
```

# Endpoint de comprobación

## GET /ping

### Descripción

Comprueba que el servidor está funcionando correctamente.

### Ejemplo

```bash
localhost:5878/ping
```

### Respuesta

```json
{
 "mensaje": "Ping realizado correctamente"
}
```

# ENDPOINTS VIDEOJUEGOS

## 1. Obtener todos los videojuegos

### Método:

GET

### Ruta:

`/videojuegos`

### Descripción:

Devuelve todos los videojuegos registrados.

### Ejemplo:

`localhost:5878/videojuegos`

## 2. Obtener videojuego por ID

### Método:

GET

### Ruta:

`/videojuegos/:id`

### Descripción:

Obtiene un videojuego específico mediante su ID.

### Ejemplo:

`localhost:5878/videojuegos/1`

## 3. Buscar videojuego por nombre

### Método:

GET

### Ruta:

`/buscar?nombre=FIFA`

### Descripción:

Busca videojuegos por nombre utilizando query params.

## 4. Crear videojuego

### Método:

POST

### Ruta:

`/videojuegos`

### Descripción:

Crea un nuevo videojuego.

### Ejemplo JSON:

```json
{
  "id": 3,
  "nombre": "GTA VI",
  "genero": "Accion",
  "plataforma": "PS5",
  "precio": 80,
  "desarrolladora": "Rockstar",
  "fechaLanzamiento": "2026-01-01",
  "stock": 40,
  "disponible": true
}
```

## 5. Modificar videojuego

### Método:

PUT

### Ruta:

`/videojuegos/:id`

### Descripción:

Actualiza un videojuego existente.

### Ejemplo:

`localhost:5878/videojuegos/1`

## 6. Eliminar videojuego

### Método:

DELETE

### Ruta:

`/videojuegos/:id`

### Descripción:

Elimina un videojuego existente.

# ENDPOINTS RESEÑAS

## 7. Obtener todas las reseñas

### Método:

GET

### Ruta:

`/reseñas`

### Descripción:

Devuelve todas las reseñas registradas.

## 8. Obtener reseñas de un videojuego

### Método:

GET

### Ruta:

`/videojuegos/:id/reseñas`

### Descripción:

Devuelve todas las reseñas de un videojuego concreto.

### Ejemplo:

`localhost:5878/videojuegos/1/reseñas`

## 9. Crear reseña

### Método:

POST

### Ruta:

`/reseñas`

### Descripción:

Crea una nueva reseña.

### Ejemplo JSON:

```json
{
  "id": 3,
  "videojuego_id": 1,
  "usuario": "Jaime",
  "comentario": "Muy entretenido",
  "puntuacion": 9
}
```

## 10. Eliminar reseña

### Método:

DELETE

### Ruta:

`/reseñas/:id`

### Descripción:

Elimina una reseña.

# FILTROS Y BÚSQUEDAS

## Filtrar por género

### Método:

GET

### Ruta:

`/filtro/genero?genero=Deportes`

## Filtrar por precio mínimo y máximo

### Método:

GET

### Ruta:

`/filtro/precio?min=20&max=80`

## Filtrar videojuegos disponibles

### Método:

GET

### Ruta:

`/filtro/disponibles`

## Ordenar videojuegos por precio

### Método:

GET

### Ruta:

`/ordenar/precio?tipo=asc`

o

`/ordenar/precio?tipo=desc`

# ESTADÍSTICAS

## Media de precios

### Método:

GET

### Ruta:

`/stats/media-precio`

## Precio máximo

### Método:

GET

### Ruta:

`/stats/precio-max`

## Total de registros

### Método:

GET

### Ruta:

`/stats/totales`

### Respuesta:

* Total de videojuegos
* Total de reseñas

## Conteo por género

### Método:

GET

### Ruta:

`/stats/generos`

# Manejo de errores HTTP

La API implementa los siguientes códigos:

* **200 OK** → consultas correctas
* **201 Created** → creación correcta
* **400 Bad Request** → datos incorrectos
* **404 Not Found** → recurso no encontrado
* **500 Internal Server Error** → error inesperado

# Conclusión

Esta API permite gestionar videojuegos y sus reseñas utilizando operaciones CRUD completas, filtros avanzados, estadísticas y manejo de errores siguiendo las convenciones REST.

