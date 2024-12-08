const express = require("express")
const { saludarConNombre, sumar, } = require("./utils")

const connection = require("./db");
const router = express.Router();

router.get("/", function (request, response) {
    console.log(request)
    response.json("Hola mundo")
})

// router.get("/saludar", function(request, response) {
//     response.json("Hola desde la ruta saludar")
// });
router.get("/saludar", function (request, response) {
    const saludar = saludarConNombre("Juan");
    const suma = sumar(5, 3)
    response.send(saludar + " " + suma);
});


// obtener data
//app.post() //crear registros
//app.put() //actualizar registros
//app.patch() //actualizar registros
//app.delete() // eliminar registros

router.get("/usuario", function (request, response) {
    response.json({
        nombre: "Juan",
        apellido: "Perez",
        edad: 25
    })
});

router.get("/clientes", function (request, response) {
    connection.query("SELECT * FROM clientes", function (err, result) {
        if (error) {
            console.log("Error: clientes", error);
        } else {
            response.json(result);
        }
    })
})

module.exports = router


// npm i nodemon -D comando para inicializar nodemon y generar auto guardado
// npm run dev