const socket = io()

//1. Añadimos un ID en cada Producto....
let articulos = [
    {id:1,nombre:'Fideos',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/1.jpg'},
    {id:2,nombre:'Macarron',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/2.jpg'},
    {id:3,nombre:'Macarron',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/3.jpg'},
    {id:4,nombre:'Fideos',detalle:'Nidito Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/4.jpg'},
    {id:5,nombre:'Aceite',detalle:'900ml',precio:1,img:'./../../img/Productos/Abarrotes/5.jpg'},
    {id:6,nombre:'Harina',detalle:'De Trigo 1k',precio:1,img:'./../../img/Productos/Abarrotes/6.jpg'}
]

//2. Añadir nuevas variables del carrito...
const producto = document.getElementById('productoID')

const totalDeArticulos=document.getElementById('notificacionTotalArticulosID')
const articulosDeMiCarrito=document.getElementById('articulosDeMiCarritoID')
const precioTotalDeMisArticulos=document.getElementById('precioTotalDeMisArticulosID')
const panelDelCarritoPrincipal=document.getElementById('panelDelCarritoPrincipalID')

//3. Asignamos un array de valores a localStorage...
let carrito=JSON.parse(localStorage.getItem('carrito')) || []

function render(data) {
  producto.innerHTML = ""

  articulos.forEach((art, i) => {
    const estadoPro = data.estadoProducto[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>

          <!--1. Precio editable. Solo Administrados (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p class="precioClas" contenteditable="true" onblur="actualizarPrecio(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
            : `<p class="precioClas"><b>Bs.</b> ${art.precio}</p>`
          }

          <!--2. Estado clickeable solo admin-->
          <p id="Estado" 
             class="${estadoPro ? 'disponible' : 'agotado'}" 
             ${localStorage.getItem("admin") === "true"
               ? `onclick="cambiarEstado(${i}, ${estadoPro ? 0 : 1})"`
               : ``}>
            ${estadoPro ? 'Disponible' : 'Agotado'}
          </p>

          <!--Agregar Al Carrito los Articulos Seleccionados-->
          <button class="agregarAlCarritoBTN"><ion-icon name="cart-outline"></ion-icon>Agregar +</button>
      </div>

      <!--Click derecho y seleccionar cuantos articulos quieres-->
      <div class="miniMenuCantidad">
          <ion-icon class="cerrarMenu" name="close"></ion-icon>
          <h4>Cuantas Unidades??</h4>
          <div class="contador">
            <button class="menos">-</button>
            <span class="cantidad">1</span>
            <button class="mas">+</button>
          </div>
          <button class="confirmarBTN">
            Colocar a carrito
          </button>
      </div>
    `
    //4. Asignamos una clase a precio... Asi: <p class="precioClas"><b>Bs.</b> ${art.precio}</p>`
    //   Cambiar el nombre de carrito a class="agregarAlCarritoBTN"
    //   Agregar el Mini Menu Cantidad. Cuantos articulos quieres?...

    //5. Del Mini Menu Cantidad. Cuantos articulos quieres??..... DESDE AQUI COPIAMOS INICIO!!..
    const agregarAlCarrito=targeta.querySelector('.agregarAlCarritoBTN')
    const miniMenuCantidad=targeta.querySelector('.miniMenuCantidad')
    const signoMas=targeta.querySelector('.mas')
    const signoMenos=targeta.querySelector('.menos')
    const total=targeta.querySelector('.cantidad')
    const confirmar=targeta.querySelector('.confirmarBTN')
    const cerrarMenu = targeta.querySelector('.cerrarMenu')

    let totalArticulos=1

    //Hacemos click en el boton amarillo de [agregar +] y se abre la ventanita del Mini-Menu 
    agregarAlCarrito.addEventListener('click',()=>{
      miniMenuCantidad.classList.toggle('active')//Es la ventanita de Cuantas cantidades quieres???
    })

    //Cerrar el Menu de Cuantas cantidades quieres??
    cerrarMenu.addEventListener('click', () => {
      miniMenuCantidad.classList.remove('active')
    })

    signoMas.addEventListener('click',()=>{
      totalArticulos++
      total.textContent=totalArticulos
    })

    signoMenos.addEventListener('click',()=>{
      if(totalArticulos>1){
        totalArticulos--
        total.textContent=totalArticulos}
    })

    //Agregar al carrito...
    confirmar.addEventListener('click',()=>{
      const existe=carrito.find(item=>item.id===art.id) //El carrito de localStorage...
      if(existe){
        existe.unidades+=totalArticulos}

      else{
        carrito.push({
          ...art,
          unidades:totalArticulos
        })
      }

      guardarCarrito()
      actualizarCarrito()

      miniMenuCantidad.classList.remove('active')

      totalArticulos=1

      total.textContent=1

      alert('Producto agregado al Carrito!')
    })//5. Del Mini Menu Cantidad. Cuantos articulos quieres??.....COPIAMOS FINAL!!..


    producto.appendChild(targeta)
  })
}


//6 Guardar al localStorage
function guardarCarrito(){
  localStorage.setItem('carrito',JSON.stringify(carrito))
}

//7 Actualizar Carrito...
function actualizarCarrito(){
  articulosDeMiCarrito.innerHTML=""

  let total=0
  let cantidadTotal=0

  carrito.forEach(art=>{
    const subtotal=art.precio*art.unidades
    total+=subtotal
    cantidadTotal+=art.unidades

    const item=document.createElement('div')
    item.classList.add('articulosEnElCarrito')
    item.innerHTML=`
      <h4>${art.nombre}</h4>
      <p>${art.detalle}</p>
      <b>Precio: Bs.${art.precio}</b>
      <p>Unidades: ${art.unidades}</p>
      <h4>Subtotal: Bs.${Math.round(subtotal*100)/100}</h4>

      <button class="delete-btn" data-id="${art.id}">
        ❌ Quitar artículo
      </button>
    `

    // BOTÓN ELIMINAR.................
    const deleteBtn = item.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", () => {
    carrito = carrito.filter(item => item.id !== art.id)

      guardarCarrito();
      actualizarCarrito();
    })
    //........... Hasta aqui..............


    articulosDeMiCarrito.appendChild(item)
  })
  totalDeArticulos.textContent=cantidadTotal
  precioTotalDeMisArticulos.textContent=`Bs. ${Math.round(total*100)/100}`
}


// =========================
// ABRIR CARRITO
// =========================
const verContenidoCarrito=document.getElementById('verContenidoCarritoID')
const cerrarPanelDeMiCarrito=document.getElementById('cerrarPanelDeMiCarritoID')

verContenidoCarrito.addEventListener('click',()=>{
    panelDelCarritoPrincipal.classList.add('active')
})

cerrarPanelDeMiCarrito.addEventListener('click',()=>{
    panelDelCarritoPrincipal.classList.remove('active')
})


//WhatsApp....
const enviarWhatsApp=document.getElementById('enviarPedidoPorWhatsappAlDuenoID')
enviarWhatsApp.addEventListener('click',()=>{
  if(carrito.length===0){
    alert('El carrito esta vacio!')
    return}
  let mensaje='Hola Dña. Sandra! %0A *Este es mi pedido:* %0A%0A'
  let totalWSP=0

  carrito.forEach(producto=>{
    const subtotal=producto.precio*producto.unidades
    totalWSP+=subtotal

    mensaje +=`*Producto:* ${producto.nombre}%0A`
    mensaje +=`*Detalle:* ${producto.detalle}%0A`
    mensaje +=`*Precio: Bs.* ${producto.precio}%0A`
    mensaje +=`*Unidades:* ${producto.unidades}%0A`
    mensaje +=`*Subtotal: Bs.* ${Math.round(subtotal*100)/100}%0A%0A`
  })

  mensaje+=`================%0A`
  mensaje+=`*TOTAL A PAGAR: bs.* ${Math.round(totalWSP*100)/100}%0A`
  mensaje+='*Le llamo para que me envie de su QR, gracias!*'

  //Numero del dueño...
  const celular='59171708331'
  const url=`https://wa.me/${celular}?text=${mensaje}`;

  window.open(url,'_blank')
})

actualizarCarrito()







function cargarTodo(){
  Promise.all([
    fetch('/estadoPro').then(res => res.json()),
    fetch('/precios').then(res => res.json())
]).then(([estadoData, preciosData]) => {
    articulos = articulos.map((art, i) => ({
      ...art,
      precio: preciosData[i]
    }))
    render(estadoData)
  })
}

function cambiarEstado(index, value) {
  fetch('/estadoPro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizado', (data) => {
  render(data)
})

socket.on('precioActualizado', (preciosData)=>{
  articulos = articulos.map((art, i)=>({
    ...art,
    precio:preciosData[i]
  }))
  fetch('/estadoPro')
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function actualizarPrecio(index, texto) {
  const precio = parseFloat(texto.replace(/[^0-9.]/g, ''))
  if (isNaN(precio)) return
  fetch('/precios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, precio })
  })
}