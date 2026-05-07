const socket = io()

let articulosDeDesayuno = [
    {id:27,nombre:'Pan',detalle:'De Batalla',precio:1,img:'./../../img/Productos/Desayunos/1.jpg'},
    {id:28,nombre:'Mantequilla',detalle:'Con sal 100g',precio:1,img:'./../../img/Productos/Desayunos/2.jpg'},
    {id:29,nombre:'Huevos',detalle:'Maple de 20u.',precio:1,img:'./../../img/Productos/Desayunos/3.jpg'},
    {id:30,nombre:'Cafe',detalle:'Copacabana 50g',precio:1,img:'./../../img/Productos/Desayunos/4.jpg'},
    {id:31,nombre:'ChocoLike',detalle:'50g',precio:1,img:'./../../img/Productos/Desayunos/5.jpg'},
    {id:32,nombre:'Maizena',detalle:'De almidon 200g',precio:1,img:'./../../img/Productos/Desayunos/6.jpg'},
    {id:33,nombre:'Te Paris',detalle:'20u. con canela',precio:1,img:'./../../img/Productos/Desayunos/7.jpg'},
    {id:34,nombre:'Avena',detalle:'400g',precio:1,img:'./../../img/Productos/Desayunos/8.jpg'},
    {id:35,nombre:'Avena Instant',detalle:'300g',precio:1,img:'./../../img/Productos/Desayunos/9.jpg'},
    {id:36,nombre:'Api',detalle:'38g',precio:1,img:'./../../img/Productos/Desayunos/10.jpg'},
    {id:37,nombre:'Mermelada',detalle:'320g',precio:1,img:'./../../img/Productos/Desayunos/11.jpg'},
    {id:38,nombre:'Polvo',detalle:'Para hornear de 57g',precio:1,img:'./../../img/Productos/Desayunos/12.jpg'},
    {id:39,nombre:'Levadura',detalle:'Seca de 20g',precio:1,img:'./../../img/Productos/Desayunos/13.jpg'}
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

  articulosDeDesayuno.forEach((art, i) => {
    const estadoDelArticulo = data.estadoDelProdDesayuno[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>
          

          <!--1. Precio editable. Solo Administrador (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p class="precioClas" contenteditable="true" onblur="editarPrecioDesayuno(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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
  mensaje+='*Le llamo para que me envie de su QR, gracias!*'

  //Numero del dueño...
  const celular='59171708331'
  const url=`https://wa.me/${celular}?text=${mensaje}`;

  window.open(url,'_blank')
})

actualizarCarrito()
//Copiar este Codigo..............FINAL..............

function cargarTodo(){
    Promise.all([
      fetch('/disponibleAgotadoDesayuno').then(res=>res.json()),//Apunta al archivo .JSON (estado Disponible Agotado)
      fetch('/precioDeLosDesayunos').then(res=>res.json())//Apunta al archivo .JSON (precioDeLosArticulos.JSON)
    ]).then(([estadoDisponibleAgotado1, actualizarPrecio2])=>{//Son simplemente parametros locales
      articulosDeDesayuno = articulosDeDesayuno.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
        ...art,
        precio: actualizarPrecio2[i]//El precio viene del Array de Objetos de los articulos de este archivo
      }))
      render(estadoDisponibleAgotado1)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoDesayuno', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoDesayuno', (data) => {
  render(data)
})//Cambiar de cargarEstado() a cambiarTodo() y encima de cargar todo el precio editable...

socket.on('PrecioActualDesayuno', (actualizarPrecioParam)=>{//PrecioActual viene del server.js io.emit
  articulosDeDesayuno = articulosDeDesayuno.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
    ...art,
    precio:actualizarPrecioParam[i]//El precio viene del Array de Objetos articulos de este archivo
  }))
  fetch('/disponibleAgotadoDesayuno')//Viene desde el archivo .json
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function editarPrecioDesayuno(index, texto) {//Esta funcion enviamos al <p contenteditable onblur=() >
  const arrayJsonPrecDesayuno = parseFloat(texto.replace(/[^0-9.]/g, ''))// El contenido del archivo precio.JSON
  if (isNaN(arrayJsonPrecDesayuno)) return
  fetch('/precioDeLosDesayunos', {// es el nombre del archivo precio.JSON
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecDesayuno })
  })
}