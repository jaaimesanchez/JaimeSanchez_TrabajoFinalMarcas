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


