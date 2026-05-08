const socket = io()

//1. Añadimos un ID en cada Producto....
let articulosDeGaseosa = [
    {id:47,nombre:'Jugo',detalle:'330ml',precio:1,img:'./../../img/Productos/Gaseosas/1.jpg'},
    {id:48,nombre:'Bebidas',detalle:'360ml.',precio:1,img:'./../../img/Productos/Gaseosas/2.jpg'},
    {id:49,nombre:'Pepsi',detalle:'Personal 1L',precio:1,img:'./../../img/Productos/Gaseosas/3.jpg'},
    {id:50,nombre:'Pepsi',detalle:'Mini 250ml',precio:1,img:'./../../img/Productos/Gaseosas/4.jpg'},
    {id:51,nombre:'Gaseosas',detalle:'Mini De 300ml.',precio:1,img:'./../../img/Productos/Gaseosas/5.jpg'},
    {id:52,nombre:'Coca Cola',detalle:'Personal De 500ml',precio:1,img:'./../../img/Productos/Gaseosas/6.jpg'},
    {id:53,nombre:'Popular',detalle:'Personal De 600ml',precio:1,img:'./../../img/Productos/Gaseosas/7.jpg'},
    {id:54,nombre:'Coca Cola',detalle:'Mini De 190ml',precio:1,img:'./../../img/Productos/Gaseosas/8.jpg'},
    {id:55,nombre:'Agua',detalle:'Vital De 3L',precio:1,img:'./../../img/Productos/Gaseosas/9.jpg'},
    {id:56,nombre:'Coca Cola',detalle:'Dietetica De 1.5L',precio:1,img:'./../../img/Productos/Gaseosas/10.jpg'},
    {id:57,nombre:'Mega Frut',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/11.jpg'},
    {id:58,nombre:'Jugo',detalle:'Del Tropico 3L',precio:1,img:'./../../img/Productos/Gaseosas/12.jpg'},
    {id:59,nombre:'Pura Vida',detalle:'2L',precio:1,img:'./../../img/Productos/Gaseosas/13.jpg'},
    {id:60,nombre:'Coca Cola',detalle:'Retornable 2.5L',precio:1,img:'./../../img/Productos/Gaseosas/14.jpg'},
    {id:61,nombre:'Gaseosa',detalle:'Oro De 3L',precio:1,img:'./../../img/Productos/Gaseosas/15.jpg'},
    {id:62,nombre:'Simba',detalle:'2L',precio:1,img:'./../../img/Productos/Gaseosas/16.jpg'},
    {id:63,nombre:'Jugo CIN',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/17.jpg'},
    {id:64,nombre:'Oriental',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/18.jpg'},
    {id:65,nombre:'Pepsi',detalle:'Gaseosa De 3L',precio:1,img:'./../../img/Productos/Gaseosas/19.jpg'},
    {id:66,nombre:'Cascada',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/20.jpg'},
    {id:67,nombre:'Coca Cola',detalle:'Gorda De 3L',precio:1,img:'./../../img/Productos/Gaseosas/21.jpg'},
    {id:68,nombre:'Jugo',detalle:'Pura Vida 300ml',precio:1,img:'./../../img/Productos/Gaseosas/22.jpg'}
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

  articulosDeGaseosa.forEach((art, i) => {
    const estadoDelArticulo = data.estadoDelProdGaseosa[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>
          

          <!--1. Precio editable. Solo Administrador (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p class="precioClas" contenteditable="true" onblur="editarPrecioGaseosa(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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
      fetch('/disponibleAgotadoGaseosa').then(res=>res.json()),//Apunta al archivo .JSON (estado Disponible Agotado)
      fetch('/precioDeLusGaseosas').then(res=>res.json())//Apunta al archivo .JSON (precioDeLosArticulos.JSON)
    ]).then(([estadoDisponibleAgotado1, actualizarPrecio2])=>{//Son simplemente parametros locales
      articulosDeGaseosa = articulosDeGaseosa.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
        ...art,
        precio: actualizarPrecio2[i]//El precio viene del Array de Objetos de los articulos de este archivo
      }))
      render(estadoDisponibleAgotado1)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoGaseosa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoGaseosa', (data) => {
  render(data)
})//Cambiar de cargarEstado() a cargarTodo() y encima de cargarTodo() el precio editable...

socket.on('PrecioActualGaseosa', (actualizarPrecioParam)=>{//PrecioActual viene del server.js io.emit
  articulosDeGaseosa = articulosDeGaseosa.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
    ...art,
    precio:actualizarPrecioParam[i]//El precio viene del Array de Objetos articulos de este archivo
  }))
  fetch('/disponibleAgotadoGaseosa')//Viene desde el archivo .json
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function editarPrecioGaseosa(index, texto) {//Esta funcion enviamos al <p contenteditable onblur=() >
  const arrayJsonPrecGaseosa = parseFloat(texto.replace(/[^0-9.]/g, ''))// El contenido del archivo precio.JSON
  if (isNaN(arrayJsonPrecGaseosa)) return
  fetch('/precioDeLusGaseosas', {// es el nombre del archivo precio.JSON
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecGaseosa })
  })
}