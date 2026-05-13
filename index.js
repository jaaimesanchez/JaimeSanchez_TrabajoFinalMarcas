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

// Obtener reseñas de un videojuego
app.get("/videojuegos/:id/reseñas", (req, res) => {
    const id = parseInt(req.params.id);

    const resultado = reseñas.filter(
        r => r.videojuego_id === id
    );

    res.json(resultado);
});

// Crear reseña
app.post("/reseñas", (req, res) => {
    const nueva = req.body;

    reseñas.push(nueva);

    res.status(201).json({
        mensaje: "Reseña creada",
        nueva
    });
});

// Eliminar reseña
app.delete("/reseñas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    reseñas = reseñas.filter(r => r.id !== id);

    res.json({
        mensaje: "Reseña eliminada"
    });
});