const express = require('express')
const methodOverride = require('method-override')
const html = require('./html.js')
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
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send(`
        ${html}
            <h1>Lista de usuarios</h1>
            <ul>
                ${usuarios.map(user => `<li><a href="/usuarios/${user.nombre}">Nombre: ${user.nombre} | Edad: ${user.edad} | Procedencia: ${user.lugarProcedencia}</a></li>`).join('')}
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
            <a href="/usuarios">Consultar usuarios</a>
        </body>
        </html>
    `)
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios[usuarios.length-1].id + 1,
        nombre: req.body.name,
        edad: req.body.age,
        lugarProcedencia: req.body.origin
    }
    usuarios.push(newUser)
    res.redirect('/')
})

app.route('/usuarios/:nombre')
    .get((req, res) => {
    let user = usuarios.filter((user) => {
        return user.nombre == req.params.nombre
    })[0]
    res.send(`
        ${html}
            <form action="/usuarios/${user.nombre}?_method=PUT" method="post">
                <label for="id">ID: </label>
                <input type="text" id="id" name="id" value="${user.id}" readonly></input>
                <br>
                <label for="name">Nombre: </label>
                <input type="text" id="name" name="name" value="${user.nombre}"></input>
                <br>
                <label for="age">Edad: </label>
                <input type="text" id="age" name="age" value="${user.edad}"></input>
                <br>
                <label for="origin">Lugar de procedencia: </label>
                <input type="text" id="origin" name="origin" value="${user.lugarProcedencia}"></input>
                <br>
                <button type="submit">Actualizar usuario</button>
                <button type="submit" formaction="/usuarios/${user.nombre}?_method=DELETE">Eliminar usuario</button>
            </form>
            <a href="/">Volver</a>
        </body>
        </html>
        `)
    })
    .put((req, res) => {
        usuarios.forEach((usuario) => {
            if(usuario.id == req.body.id){
                usuario.nombre = req.body.name
                usuario.edad = req.body.age
                usuario.lugarProcedencia = req.body.origin
            }
        })
        res.redirect('/')
    })
    .delete((req, res) => {
        usuarios = usuarios.filter(usuario => usuario.id != req.body.id)
        res.redirect('/')
    })

app.listen(PORT, () => {
    console.log('Server active on http://localhost:'+PORT)
})