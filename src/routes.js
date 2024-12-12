const express = require("express")

const yup = require("yup")

const { saludarConNombre, sumar } = require("./utils")

const connection = require("./db")
const router = express.Router()

const schema = yup.object().shape({
  documento: yup.string().required("el documento es obligatorio"),
  nombre: yup.string().required("el nombre es obligatorio"),
  apellidos: yup.string().required("los apellidos son obligatorios"),
  email: yup
    .string()
    .email("el email es invalido")
    .required("el email es obligatorio"),
})

router.get("/", function (request, response) {
  console.log(request)
  response.json("Hola mundo")
})

// router.get("/saludar", function(request, response) {
//     response.json("Hola desde la ruta saludar")
// });
router.get("/saludar", function (request, response) {
  const saludar = saludarConNombre("Juan")
  const suma = sumar(5, 3)
  response.send(saludar + " " + suma)
})

// obtener data
//app.post() //crear registros
//app.put() //actualizar registros
//app.patch() //actualizar registros
//app.delete() // eliminar registros

router.get("/usuario", function (request, response) {
  response.json({
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
  })
})

router.get("/clientes", function (request, response) {
  connection.query(
    "SELECT * FROM clientes ORDER BY id desc",
    function (error, result) {
      if (error) {
        console.log("Error: clientes", error)
      } else {
        response.json(result)
      }
    },
  )
})

router.post("/cliente", async function (request, response) {


  const datos = request.body

  try {
    const result = await schema.validate(datos)
    console.log(result)

    const query =
      "INSERT INTO clientes (documento, nombre, apellidos, email, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)"

    connection.execute(query, Object.values(datos), function (error, result) {
      if (error) {
        response.status(400).json({
          message: "Error al guardar el cliente",
          error: error,
        })
      } else {
        response.json({
          message: "Cliente insertado correctamente",
          data: result,
        })
      }
    })
  } catch (error) {
    response.status(400).json({
      message: "Error de validación",
    })
  }
})

router.get("/cliente/:id", function (req, res) {
  const { id } = req.params
  const query = "SELECT * FROM clientes WHERE id = ?"
  connection.query(query, [id],
    function (error, result) {
      if (error) {
        res.status(400).json({
          message: "Error al obtener cliente",
          error: error,
        })
      } else {
        if (result.length > 0) {
          res.json(result[0])
        } else {
          res.status(400).json({
            message: "Cliente no encontrado",
          })
        }
      }
    })
})

router.put("/cliente/:id", async function (req, res) {
  const data = req.body
  const { id } = req.params

  console.log(data)
  try {
    await schema.validate(data)
    const query = "UPDATE clientes SET documento = ?, nombre = ?, apellidos = ?, email = ?, fecha_nacimiento = ? WHERE id = ?"

    connection.execute(query, Object.values(data).concat(id), function (error, result) {
      if (error) {
        res.status(400).json({
          message: "Error al actualizar el cliente",
          error
        })
      } else {
        res.json({
          message: "Cliente actualizado",
          data: result
        })
      }
    })
  } catch (error) {
    res.status(400).json({
      message: "Error de validación",
      error
    })
  }
})

router.delete('/cliente/:id', function (req, res) {
  const { id } = req.params
  const query = "DELETE FROM clientes WHERE id =?"
  connection.execute(query, [id], function (error, result) {
    if (error) {
      res.status(400).json({
        message: "Error al eliminar el cliente",
        error
      })
    } else {
      res.json({
        message: "Cliente eliminado",
        data: result
      })
    }
  })
})

// desde 200 hasta 299 - okay
// desde 300 hasta 399 - redireccion validacion
// desde 400 hasta 499 - errores de cliente
// desde 500 hasta 599 - errores del servidor

module.exports = router

// npm i nodemon -D comando para inicializar nodemon y generar auto guardado
// npm run dev
