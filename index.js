const express = require("express");
const app = express();

app.use(express.json());

const PORT = 5878;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});