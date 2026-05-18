const express = require("express"); 
const app = express();

app.use(express.json());

const PORT = 5878;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});

let videojuegos = [
    {
        id: 1,
        nombre: "FIFA 25",
        genero: "Deportes",
        plataforma: "PS5",
        precio: 69.99,
        desarrolladora: "EA Sports",
        fechaLanzamiento: "2025-09-20",
        stock: 50
    },
    {
        id: 2,
        nombre: "Minecraft",
        genero: "Sandbox",
        plataforma: "PC",
        precio: 29.99,
        desarrolladora: "Mojang",
        fechaLanzamiento: "2011-11-18",
        stock: 100
    },
    {
        id: 3,
        nombre: "Call of Duty",
        genero: "Shooter",
        plataforma: "Xbox",
        precio: 79.99,
        desarrolladora: "Activision",
        fechaLanzamiento: "2024-10-15",
        stock: 30
    }
];

let reseñas = [
    {
        id: 1,
        videojuego_id: 1,
        usuario: "Jaime",
        comentario: "Muy divertido",
        puntuacion: 9
    },
    {
        id: 2,
        videojuego_id: 1,
        usuario: "Carlos",
        comentario: "Buen modo online",
        puntuacion: 8
    },
    {
        id: 3,
        videojuego_id: 2,
        usuario: "Ana",
        comentario: "Muy creativo",
        puntuacion: 10
    }
];

// Endpoint ping

app.get("/ping", (req, res) => {
    res.send("Ping realizado correctamente");
});

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        videojuegos: videojuegos,
        reseñas: reseñas
    });
});

// Obtener todos los videojuegos
app.get("/videojuegos", (req, res) => {
    res.json(videojuegos);
});

// Obtener por ID
app.get("/videojuegos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const juego = videojuegos.find(v => v.id === id);

    if (!juego) {
        return res.status(404).json({
            mensaje: "Videojuego no encontrado"
        });
    }

    res.json(juego);
});

// Buscar por nombre (query param)
app.get("/buscar", (req, res) => {
    const nombre = req.query.nombre;

    const resultado = videojuegos.filter(v =>
        v.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    res.json(resultado);
});

// Crear videojuego
app.post("/videojuegos", (req, res) => {
    const nuevo = req.body;

    if (!nuevo.nombre || !nuevo.precio || !nuevo.plataforma) {
        return res.status(400).json({
            mensaje: "Faltan campos obligatorios"
        });
    }

    videojuegos.push(nuevo);

    res.status(201).json({
        mensaje: "Videojuego creado",
        nuevo
    });
});

// Modificar videojuego
app.put("/videojuegos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = videojuegos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensaje: "Videojuego no encontrado"
        });
    }

    videojuegos[index] = {
        ...videojuegos[index],
        ...req.body
    };

    res.json(videojuegos[index]);
});

// Eliminar videojuego
app.delete("/videojuegos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    videojuegos = videojuegos.filter(v => v.id !== id);

    res.json({
        mensaje: "Videojuego eliminado"
    });
});

// Obtener todas las reseñas
app.get("/reseñas", (req, res) => {
    res.json(reseñas);
});


// Obtener reseñas de un videojuego concreto
app.get("/videojuegos/:id/reseñas", (req, res) => {
    const id = parseInt(req.params.id);

    const resultado = reseñas.filter(
        r => r.videojuego_id === id
    );

    res.json(resultado);
});


// Crear nueva reseña
app.post("/reseñas", (req, res) => {
    const nueva = req.body;

    if (!nueva.videojuego_id || !nueva.usuario || !nueva.comentario) {
        return res.status(400).json({
            mensaje: "Faltan campos obligatorios"
        });
    }

    reseñas.push(nueva);

    res.status(201).json({
        mensaje: "Reseña creada correctamente",
        nueva
    });
});


// Eliminar reseña
app.delete("/reseñas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const existe = reseñas.find(r => r.id === id);

    if (!existe) {
        return res.status(404).json({
            mensaje: "Reseña no encontrada"
        });
    }

    reseñas = reseñas.filter(r => r.id !== id);

    res.json({
        mensaje: "Reseña eliminada correctamente"
    });
});

// Filtrar por género
app.get("/filtro/genero", (req, res) => {
    const genero = req.query.genero;

    const resultado = videojuegos.filter(
        v => v.genero.toLowerCase() === genero.toLowerCase()
    );

    res.json(resultado);
});

// Filtrar por precio
app.get("/filtro/precio", (req, res) => {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);

    const resultado = videojuegos.filter(
        v => v.precio >= min && v.precio <= max
    );

    res.json(resultado);
});

// Filtrar disponibles
app.get("/filtro/disponibles", (req, res) => {
    const resultado = videojuegos.filter(
        v => v.disponible === true
    );

    res.json(resultado);
});

// Ordenar por precio
app.get("/ordenar/precio", (req, res) => {
    const tipo = req.query.tipo;

    let resultado = [...videojuegos];

    if (tipo === "asc") {
        resultado.sort((a, b) => a.precio - b.precio);
    } else {
        resultado.sort((a, b) => b.precio - a.precio);
    }

    res.json(resultado);
});

// Precio medio
app.get("/stats/media-precio", (req, res) => {
    const suma = videojuegos.reduce(
        (acc, v) => acc + v.precio, 0
    );

    const media = suma / videojuegos.length;

    res.json({ media });
});

// Precio máximo
app.get("/stats/precio-max", (req, res) => {
    const max = Math.max(...videojuegos.map(v => v.precio));

    res.json({ max });
});

// Total registros
app.get("/stats/totales", (req, res) => {
    res.json({
        totalVideojuegos: videojuegos.length,
        totalReseñas: reseñas.length
    });
});

// Contar por género
app.get("/stats/generos", (req, res) => {
    let conteo = {};

    videojuegos.forEach(v => {
        if (conteo[v.genero]) {
            conteo[v.genero]++;
        } else {
            conteo[v.genero] = 1;
        }
    });

    res.json(conteo);
});

// Ruta inexistente
app.use((req, res) => {
    res.status(404).json({
        error: "404 Not Found",
        mensaje: "La ruta solicitada no existe"
    });
});

// Error interno del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: "500 Internal Server Error",
        mensaje: "Ha ocurrido un error inesperado en el servidor"
    });
});



//Todo: devolver los arrays 