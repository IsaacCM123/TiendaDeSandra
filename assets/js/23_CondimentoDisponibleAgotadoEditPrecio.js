const socket = io()

//1. Añadimos un ID en cada Producto....
let articulosDeCondimentos = [
    {id:22,nombre:'Vinagre',detalle:'Tinto de 320ml',precio:1,img:'./../../img/Productos/Condimentos/1.jpg'},
    {id:23,nombre:'Limonero',detalle:'330ml',precio:1,img:'./../../img/Productos/Condimentos/2.jpg'},
    {id:24,nombre:'Salsa Soya',detalle:'250ml',precio:1,img:'./../../img/Productos/Condimentos/3.jpg'},
    {id:25,nombre:'Salsa Soya',detalle:'460ml',precio:1,img:'./../../img/Productos/Condimentos/4.jpg'},
    {id:26,nombre:'Sazonador',detalle:'Para pollo 120g',precio:1,img:'./../../img/Productos/Condimentos/5.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

//2. Añadir nuevas variables del carrito...
const totalDeArticulos=document.getElementById('notificacionTotalArticulosID')
const articulosDeMiCarrito=document.getElementById('articulosDeMiCarritoID')
const precioTotalDeMisArticulos=document.getElementById('precioTotalDeMisArticulosID')
const panelDelCarritoPrincipal=document.getElementById('panelDelCarritoPrincipalID')
//3. Asignamos un array de valores a localStorage...
let carrito=JSON.parse(localStorage.getItem('carrito')) || []

function render(data) {
  articulosEnglobados.innerHTML = ""

  articulosDeCondimentos.forEach((art, i) => {
    const estadoDelArticulo = data.estadoDelCondimento[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>
          

          <!--1. Precio editable. Solo Administrador (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p class="precioClas" contenteditable="true" onblur="editarPrecioCondimento(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
            : `<p class="precioClas"><b>Bs.</b> ${art.precio}</p>`}


          <!-- 2. Estado clickeable solo admin -->
          <p id="Estado" 
             class="${estadoDelArticulo ? 'disponible' : 'agotado'}" 
             ${localStorage.getItem("admin") === "true"
               ? `onclick="cambiarEstado(${i}, ${estadoDelArticulo ? 0 : 1})"`
               : ``}>
            ${estadoDelArticulo ? 'Disponible' : 'Agotado'}
          </p>
          
          <!--4. Agregar Al Carrito los Articulos Seleccionados-->
          <button class="agregarAlCarritoBTN"><ion-icon name="cart-outline"></ion-icon>Agregar +</button>
      </div>

      <!--5. Click derecho y seleccionar cuantos articulos quieres-->
      <div class="miniMenuCantidad">
          <ion-icon class="cerrarMenu" name="close"></ion-icon>
          <h4>Cuantas Unidades??</h4>
          <div class="contador">
            <button class="menos">-</button>
            <span class="cantidad">1</span>
            <button class="mas">+</button>
          </div>
          <button class="confirmarBTN">
            Colocar al carrito
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


    articulosEnglobados.appendChild(targeta)
  })
}


//Copiar este Codigo..............INICIO..............
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
  mensaje+='*Le llamo para que me envie su QR, gracias!*'

  //Numero del dueño...
  const celular='59171708331'
  const url=`https://wa.me/${celular}?text=${mensaje}`;

  window.open(url,'_blank')
})

actualizarCarrito()
//Copiar este Codigo..............FINAL..............


function cargarTodo(){
    Promise.all([
      fetch('/disponibleAgotadoCondimento').then(res=>res.json()),//Apunta al archivo .JSON (estado Disponible Agotado)
      fetch('/precioDeLosCondimentos').then(res=>res.json())//Apunta al archivo .JSON (precioDeLosCondimentos)
    ]).then(([estadoDisponiblepAgotado1, actualizarPrecio2])=>{//Son simplemente parametros locales
      articulosDeCondimentos = articulosDeCondimentos.map((art, i)=>({//Es el array de objetos de los articulosDeCondimentos
        ...art,
        precio: actualizarPrecio2[i]//El precio viene del Array de Objetos articulosDeCondimentos
      }))
      render(estadoDisponiblepAgotado1)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoCondimento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoCondimento', (data) => {
  render(data)
})//Cambiar de cargarEstado() a cambiarTodo() y Debajo de cargar todo el precio editable...

socket.on('PrecioActualCondimento', (actualizarPrecioParam)=>{//PrecioActualCondimento viene del server.js io.emit
  articulosDeCondimentos = articulosDeCondimentos.map((art, i)=>({
    ...art,
    precio:actualizarPrecioParam[i]//El precio viene del Array de Objetos articulosDeCondimento
  }))
  fetch('/disponibleAgotadoCondimento')//Viene desde el archivo .json
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function editarPrecioCondimento(index, texto) {//Esta funcion enviamos al <p contenteditable onblur=() >
  const arrayJsonPrecCondimento = parseFloat(texto.replace(/[^0-9.]/g, ''))// El contenido del archivo precioDeLosCondimentos.JSON
  if (isNaN(arrayJsonPrecCondimento)) return
  fetch('/precioDeLosCondimentos', {// es el nombre del archivo precio.JSON
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecCondimento })
  })
}