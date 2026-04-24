const express = require('express')//1-Localhost:3000
const path = require('path')//1-Localhost:3000
const fs = require('fs')//2-Estado:Abierto,Cerrado.

                const { Server } = require('socket.io') //Estado del Producto: Disponible Agotado.
                const http = require('http') //Estado del Producto: Disponible Agotado.

const app = express()//1-Localhost:3000

                const server = http.createServer(app) //Estado del Producto: Disponible Agotado.
                const io = new Server(server) //Estado del Producto: Disponible Agotado.

app.use(express.json())//2-Estado:Abierto,Cerrado.

                app.use(express.static(__dirname)) //Estado del Producto: Disponible Agotado.
                const estadoPath = path.join(__dirname, 'estadoPro.json') //Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/estadoPro', (req, res) => { //Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPath); //Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data)); //Estado del Producto: Disponible Agotado.
                }); //Estado del Producto: Disponible Agotado.
                // Cambiar estado (solo admin)
                app.post('/estadoPro', (req, res) => { //Estado del Producto: Disponible Agotado.
                  try{
                          const { index, value } = req.body; //Estado del Producto: Disponible Agotado.
                          const data = JSON.parse(fs.readFileSync(estadoPath)); //Estado del Producto: Disponible Agotado.
                          data.estadoProducto[index] = value; //Estado del Producto: Disponible Agotado.
                          fs.writeFileSync(estadoPath, JSON.stringify(data, null, 2)); //Estado del Producto: Disponible Agotado.
                          io.emit('estadoActualizado', data); //Estado del Producto: Disponible Agotado.
                          res.json({ ok: true }); //Estado del Producto: Disponible Agotado.
                      } catch (error) {
                        console.error(error)
                        res.status(500).json({ error: 'Error interno' })
                      }
                }) //Estado del Producto: Disponible Agotado.

                                                      // ======================= NUEVO: actualizar precios =======================
                                                      const preciosPath = path.join(__dirname, 'precios.json')

                                                      app.get('/precios', (req, res) => {
                                                        const data = JSON.parse(fs.readFileSync(preciosPath))
                                                        res.json(data)
                                                      })

                                                      app.post('/precios', (req, res) => {
                                                        const { index, precio } = req.body

                                                        const data = JSON.parse(fs.readFileSync(preciosPath))
                                                        data[index] = precio

                                                        fs.writeFileSync(preciosPath, JSON.stringify(data, null, 2))

                                                        io.emit('precioActualizado', data)

                                                        res.json({ ok: true })
                                                      })
                                                      // ==========================================================================

// Servir archivos estáticos desde la raíz
app.use(express.static(__dirname))//1-Localhost:3000

const FILE = "estado.json"//2-Estado:Abierto,Cerrado.

// Ruta principal (index en la raíz)
app.get('/', (req, res) => {//1-Localhost:3000
    res.sendFile(path.join(__dirname, 'index.html'))//1-Localhost:3000
})//1-Localhost:3000

// Obtener estado
app.get("/estado", (req, res) => {//2-Estado:Abierto,Cerrado.
    const data = JSON.parse(fs.readFileSync(FILE))
    res.json(data)//2-Estado:Abierto,Cerrado.
})//2-Estado:Abierto,Cerrado.

// Cambiar estado
app.post("/estado", (req, res) => {//2-Estado:Abierto,Cerrado.
    const { estado } = req.body//2-Estado:Abierto,Cerrado.
    fs.writeFileSync(FILE, JSON.stringify({ estado }))
    res.json({ success: true })//2-Estado:Abierto,Cerrado.
})//2-Estado:Abierto,Cerrado.

                  io.on('connection', (socket) => { //Estado del Producto: Disponible Agotado.
                    console.log('Usuario conectado'); //Estado del Producto: Disponible Agotado.
                  }); //Estado del Producto: Disponible Agotado.

                  server.listen(3000, () => { //Estado del Producto: Disponible Agotado.
                    console.log('Servidor en http://localhost:3000'); //Estado del Producto: Disponible Agotado.
                  }); //Estado del Producto: Disponible Agotado.