const express = require('express')
const app = express()
const PORT = 3000
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios</title>
            <style>
                a{
                    color: black;
                }
                a:hover{
                    color: darkred;
                    font-weight: bold;
                    cursor: pointer;
                }
                form{
                    width: max-content;
                    border: 2px solid black;
                    border-radius: 15px;
                    padding: 20px;
                }
                input{
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Lista de usuarios</h1>
            <ul>
                ${usuarios.map(user => `<li><a href="/${user.id}">Nombre: ${user.nombre} | Edad: ${user.edad} | Procedencia: ${user.lugarProcedencia}</a></li>`).join('')}
            </ul>
            <form action="/usuarios" method="post">
            <label for="name">Nombre: </label>
            <input type="text" id="name" name="name" required></input>
            <br>
            <label for="age">Edad: </label>
            <input type="text" id="age" name="age" required></input>
            <br>
            <label for="origin">Lugar de procedencia: </label>
            <input type="text" id="origin" name="origin" required></input>
            <br>
            <button type="submit">Crear usuario</button>
            </form>
        </body>
        </html>
        
    `)
})

app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios[usuarios.length].id + 1,
        nombre: req.body.name,
        edad: req.body.age,
        lugarProcedencia: req.body.origin
    }
    usuarios.push(newUser)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log('Server active on http://localhost:'+PORT)
})