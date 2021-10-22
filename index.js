const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
    console.log(`El servidor está activo y escuchando por puerto ${PORT}, proceso ${process.pid}`);
})

app.use(express.static(path.join(__dirname, '/public/assets')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get("/abracadabra/conejo/:id", (req, res) => {
    const n = Math.floor(Math.random() * 4) + 1;
    res.sendFile(n == req.params.id ? __dirname + "/public/assets/conejito.jpg" : __dirname + "/public/assets/voldemort.jpg");
});

app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname + "/files/usuarios.json")
})

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario;
    const userArray = JSON.parse(JSON.stringify(require(__dirname + "/files/usuarios.json")));
    req.usuarioEncontrado = false;
    if (userArray.usuarios.find(user => user == usuario)) {
        req.usuarioEncontrado = true;
    };
    next();
})

app.get("/abracadabra/juego/:usuario", (req, res) => {
    if (req.usuarioEncontrado) {
        res.send({
            usuario: req.params.usuario,
            message: "usuario encontrado"
        })
    } else {
        res.sendFile(__dirname + "/public/assets/who.jpeg")
    }
})

app.get("*", (req, res) => {
    res.send("<h1>Algo salió mal, inténtalo nuevamente</h1>")
})