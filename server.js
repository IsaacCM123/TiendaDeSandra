const express = require('express')//1-Localhost:3000
const path = require('path')//1-Localhost:3000
const fs = require('fs')//2-Estado:Abierto,Cerrado.

                const { Server } = require('socket.io')//Estado del Producto: Disponible Agotado.
                const http = require('http')//Estado del Producto: Disponible Agotado.

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'DATA_DIR')

const app = express()//1-Localhost:3000

                const server = http.createServer(app)//Estado del Producto: Disponible Agotado.
                const io = new Server(server)//Estado del Producto: Disponible Agotado.

app.use(express.json())//2-Estado:Abierto,Cerrado.

                app.use(express.static(__dirname))//Estado del Producto: Disponible Agotado.

                // ============================== Estado del producto: Disponible Agotado ===========================
                const estadoPath = path.join(DATA_DIR, 'estadoPro.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/estadoPro', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPath)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/estadoPro', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPath))//Estado del Producto: Disponible Agotado.
                data.estadoProducto[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPath, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizado', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                // =====================================================================================================

                //===================================Productos Aseo: Disponible Agotado===================================
                const estadoPathAseo = path.join(DATA_DIR, 'disponibleAgotadoAseo.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoAseo', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathAseo)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoAseo', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathAseo))//Estado del Producto: Disponible Agotado.
                data.estadoArticuloAseo[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathAseo, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoAseo', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //========================================================================================================

                //===================================Productos Caramelos: Disponible Agotado===============================
                const estadoPathCaramelos = path.join(DATA_DIR, 'disponibleAgotadoCaramelos.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoCaramelos', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathCaramelos)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoCaramelos', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathCaramelos))//Estado del Producto: Disponible Agotado.
                data.estadoDelCaramelo[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathCaramelos, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoCaramelo', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //========================================================================================================

                //===================================Producto Condimentos: Disponible Agotado===============================
                const estadoPathCondimento = path.join(DATA_DIR, 'disponibleAgotadoCondimento.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoCondimento', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathCondimento)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoCondimento', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathCondimento))//Estado del Producto: Disponible Agotado.
                data.estadoDelCondimento[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathCondimento, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoCondimento', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //========================================================================================================

                //=====================================Producto Desayuno: Disponible Agotado=================================
                const estadoPathDesayuno = path.join(DATA_DIR, 'disponibleAgotadoDesayuno.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoDesayuno', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathDesayuno)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoDesayuno', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathDesayuno))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdDesayuno[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathDesayuno, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoDesayuno', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Energetico: Disponible Agotado=================================
                const estadoPathEnergetico = path.join(DATA_DIR, 'disponibleAgotadoEnergetico.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoEnergetico', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathEnergetico)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoEnergetico', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathEnergetico))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdEnergetico[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathEnergetico, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoEnergetico', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Frial: Disponible Agotado=================================
                const estadoPathFrial = path.join(DATA_DIR, 'disponibleAgotadoFrial.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoFrial', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathFrial)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoFrial', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathFrial))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdFrial[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathFrial, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoFrial', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Varios: Disponible Agotado=================================
                const estadoPathVarios = path.join(DATA_DIR, 'disponibleAgotadoVarios.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoVarios', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathVarios)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoVarios', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathVarios))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdVarios[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathVarios, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoVarios', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Gaseosa: Disponible Agotado=================================
                const estadoPathGaseosa = path.join(DATA_DIR, 'disponibleAgotadoGaseosa.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoGaseosa', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathGaseosa)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoGaseosa', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathGaseosa))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdGaseosa[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathGaseosa, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoGaseosa', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Masitas: Disponible Agotado=================================
                const estadoPathMasita = path.join(DATA_DIR, 'disponibleAgotadoMasitas.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoMasitas', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathMasita)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoMasitas', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathMasita))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdMasita[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathMasita, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoMasita', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Lacteo: Disponible Agotado=================================
                const estadoPathLacteo = path.join(DATA_DIR, 'disponibleAgotadoLacteo.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoLacteo', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathLacteo)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoLacteo', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathLacteo))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdLacteo[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathLacteo, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoLacteo', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                //=====================================Producto Modistas: Disponible Agotado=================================
                const estadoPathModista = path.join(DATA_DIR, 'disponibleAgotadoModista.json')//Estado del Producto: Disponible Agotado.
                // Obtener estado
                app.get('/disponibleAgotadoModista', (req, res) => {//Estado del Producto: Disponible Agotado.
                  const data = fs.readFileSync(estadoPathModista)//Estado del Producto: Disponible Agotado.
                  res.json(JSON.parse(data))//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //Cambiar estado (solo admin)
                app.post('/disponibleAgotadoModista', (req, res) => {//Estado del Producto: Disponible Agotado.
                const { index, value } = req.body//Estado del Producto: Disponible Agotado.
                const data = JSON.parse(fs.readFileSync(estadoPathModista))//Estado del Producto: Disponible Agotado.
                data.estadoDelProdModista[index] = value//Estado del Producto: Disponible Agotado.
                fs.writeFileSync(estadoPathModista, JSON.stringify(data, null, 2))//Estado del Producto: Disponible Agotado.
                io.emit('estadoActualizadoModista', data)//Estado del Producto: Disponible Agotado.
                res.json({ ok: true })//Estado del Producto: Disponible Agotado.
                })//Estado del Producto: Disponible Agotado.
                //===========================================================================================================

                                                          // ====================NUEVO: actualizar precios Abarrotes=================
                                                          const preciosPath = path.join(DATA_DIR, 'precios.json')
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
                                                          // =======================================================================

                                                          // =====================NUEVO: Actualizar precios Aseo=====================
                                                          const preAseo = path.join(DATA_DIR, 'precioAseo.json')
                                                          app.get('/precioAseo', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preAseo))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioAseo', (req, res) => {
                                                            const { index, arrayJsonPrecAseo } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preAseo))
                                                            data[index] = arrayJsonPrecAseo
                                                            fs.writeFileSync(preAseo, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualAseo', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ===================NUEVO: Actualizar precio Caramelos===================
                                                          const preCaramelo = path.join(DATA_DIR, 'precioDeLosCaramelos.json')
                                                          app.get('/precioDeLosCaramelos', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preCaramelo))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosCaramelos', (req, res) => {
                                                            const { index, arrayJsonPrecCaramelo } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preCaramelo))
                                                            data[index] = arrayJsonPrecCaramelo
                                                            fs.writeFileSync(preCaramelo, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualCaramelo', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Condimentos==================
                                                          const preCondimento = path.join(DATA_DIR, 'precioDeLosCondimentos.json')
                                                          app.get('/precioDeLosCondimentos', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preCondimento))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosCondimentos', (req, res) => {
                                                            const { index, arrayJsonPrecCondimento } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preCondimento))
                                                            data[index] = arrayJsonPrecCondimento
                                                            fs.writeFileSync(preCondimento, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualCondimento', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Desayunos==================
                                                          const preDesayuno = path.join(DATA_DIR, 'precioDeLosDesayunos.json')
                                                          app.get('/precioDeLosDesayunos', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preDesayuno))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosDesayunos', (req, res) => {
                                                            const { index, arrayJsonPrecDesayuno } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preDesayuno))
                                                            data[index] = arrayJsonPrecDesayuno
                                                            fs.writeFileSync(preDesayuno, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualDesayuno', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                           // ==================NUEVO: Actualizar precio Energeticos==================
                                                          const preEnergeticos = path.join(DATA_DIR, 'precioDeLosEnergeticos.json')
                                                          app.get('/precioDeLosEnergeticos', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preEnergeticos))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosEnergeticos', (req, res) => {
                                                            const { index, arrayJsonPrecEnergetico } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preEnergeticos))
                                                            data[index] = arrayJsonPrecEnergetico
                                                            fs.writeFileSync(preEnergeticos, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualEnergetico', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Frial========================
                                                          const preFrial = path.join(DATA_DIR, 'precioDeLosFriales.json')
                                                          app.get('/precioDeLosFriales', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preFrial))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosFriales', (req, res) => {
                                                            const { index, arrayJsonPrecFrial } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preFrial))
                                                            data[index] = arrayJsonPrecFrial
                                                            fs.writeFileSync(preFrial, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualFrial', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Varios========================
                                                          const preVarios = path.join(DATA_DIR, 'precioDeLosVarios.json')
                                                          app.get('/precioDeLosVarios', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preVarios))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosVarios', (req, res) => {
                                                            const { index, arrayJsonPrecVarios } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preVarios))
                                                            data[index] = arrayJsonPrecVarios
                                                            fs.writeFileSync(preVarios, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualVarios', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Gaseosas======================
                                                          const preGaseosas = path.join(DATA_DIR, 'precioDeLusGaseosas.json')
                                                          app.get('/precioDeLusGaseosas', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preGaseosas))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLusGaseosas', (req, res) => {
                                                            const { index, arrayJsonPrecGaseosa } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preGaseosas))
                                                            data[index] = arrayJsonPrecGaseosa
                                                            fs.writeFileSync(preGaseosas, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualGaseosa', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                          // ==================NUEVO: Actualizar precio Masitas======================
                                                          const preMasitas = path.join(DATA_DIR, 'precioDeLasMasitas.json')
                                                          app.get('/precioDeLasMasitas', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preMasitas))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLasMasitas', (req, res) => {
                                                            const { index, arrayJsonPrecMasita } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preMasitas))
                                                            data[index] = arrayJsonPrecMasita
                                                            fs.writeFileSync(preMasitas, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualMasita', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                           // ==================NUEVO: Actualizar precio Lacteos======================
                                                          const preLacteos = path.join(DATA_DIR, 'precioDeLosLacteos.json')
                                                          app.get('/precioDeLosLacteos', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preLacteos))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLosLacteos', (req, res) => {
                                                            const { index, arrayJsonPrecLacteo } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preLacteos))
                                                            data[index] = arrayJsonPrecLacteo
                                                            fs.writeFileSync(preLacteos, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualLacteo', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================

                                                           // ==================NUEVO: Actualizar precio Modistas======================
                                                          const preModista = path.join(DATA_DIR, 'precioDeLasModistas.json')
                                                          app.get('/precioDeLasModistas', (req, res) => {
                                                            const data = JSON.parse(fs.readFileSync(preModista))
                                                            res.json(data)
                                                          })
                                                          app.post('/precioDeLasModistas', (req, res) => {
                                                            const { index, arrayJsonPrecModista } = req.body
                                                            const data = JSON.parse(fs.readFileSync(preModista))
                                                            data[index] = arrayJsonPrecModista
                                                            fs.writeFileSync(preModista, JSON.stringify(data, null, 2))
                                                            io.emit('PrecioActualModista', data)
                                                            res.json({ ok: true })
                                                          })
                                                          // ========================================================================




//=================================================Buzon De Sugerencias Inicio=================================================
const fs1 = require('fs')//2-Estado:Abierto,Cerrado.
const ArchivoBuzonDeSugerencias = path.join(DATA_DIR, "BuzonDeSugerencias.json")
// Leer archivo (JSON por línea)
function leerComentarios() {
    if (!fs1.existsSync(ArchivoBuzonDeSugerencias)) return [];
    const data = fs1.readFileSync(ArchivoBuzonDeSugerencias, "utf-8")
    return data
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => JSON.parse(line))
        .reverse()}//últimos son primero

// Guardar comentario
function guardarComentario(comentario) {
    fs1.appendFileSync(ArchivoBuzonDeSugerencias, JSON.stringify(comentario) + "\n")}

// Funcion Eliminar Comentario........
function eliminarComentario(id){
  const comentarios=leerComentarios()
  const filtrados=comentarios.filter(c=>c.id!=id)
  const nuevoContenido=filtrados
    .reverse()
    .map(c=>JSON.stringify(c))
    .join('\n')
  fs1.writeFileSync(ArchivoBuzonDeSugerencias, nuevoContenido+'\n','utf-8')
}

// API para obtener comentarios
app.get("/comentarios", (req, res) => {
    res.json(leerComentarios())})

// Socket.io
io.on("connection", (socket) => {
    //Agragemos...
    socket.on('eliminar-comentario',(id)=>{
      eliminarComentario(id)
      io.emit('comentario-eliminado',id)
    })

    console.log("Usuario conectado")
    socket.on("nuevo-comentario", (data) => {
        guardarComentario(data)
        // Emitir a todos
        io.emit("actualizar-comentarios", data)})
    socket.on("disconnect", () => {
        console.log("Usuario desconectado")
    })
})
//=================================================Buzon De Sugerencias Final=================================================













// Servir archivos estáticos desde la raíz
app.use(express.static(__dirname))//1-Localhost:3000

const FILE = path.join(DATA_DIR, "estado.json") //2-Estado:Abierto,Cerrado.

// Ruta principal (index en la raíz)
app.get('/', (req, res) => {//1-Localhost:3000
    res.sendFile(path.join(__dirname, 'index.html'))//1-Localhost:3000
})//1-Localhost:3000

// Obtener estado
app.get("/estado", (req, res) => {//2-Estado:Abierto,Cerrado.
    const data = JSON.parse(fs.readFileSync(FILE))//2-Estado:Abierto,Cerrado.
    res.json(data)//2-Estado:Abierto,Cerrado.
})//2-Estado:Abierto,Cerrado.

// Cambiar estado
app.post("/estado", (req, res) => {//2-Estado:Abierto,Cerrado.
    const { estado } = req.body//2-Estado:Abierto,Cerrado.
    fs.writeFileSync(FILE, JSON.stringify({ estado }))//2-Estado:Abierto,Cerrado.
    res.json({ success: true })//2-Estado:Abierto,Cerrado.
})//2-Estado:Abierto,Cerrado.

                  io.on('connection', (socket) => {//Estado del Producto: Disponible Agotado.
                    console.log('Usuario conectado')//Estado del Producto: Disponible Agotado.
                  })//Estado del Producto: Disponible Agotado.

                  server.listen(process.env.PORT || 3000, () => {//Estado del Producto: Disponible Agotado.
                    console.log('Servidor en http://localhost:3000')//Estado del Producto: Disponible Agotado.
                  })//Estado del Producto: Disponible Agotado.