const socket = io()

let articulosDeCondimentos = [
    { nombre:'Vinagre',detalle:'Tinto de 320ml',precio:1,img:'./../../img/Productos/Condimentos/1.jpg'},
    { nombre:'Limonero',detalle:'330ml',precio:1,img:'./../../img/Productos/Condimentos/2.jpg'},
    { nombre:'Salsa Soya',detalle:'250ml',precio:1,img:'./../../img/Productos/Condimentos/3.jpg'},
    { nombre:'Salsa Soya',detalle:'460ml',precio:1,img:'./../../img/Productos/Condimentos/4.jpg'},
    { nombre:'Sazonador',detalle:'Para pollo 120g',precio:1,img:'./../../img/Productos/Condimentos/5.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

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
            ? `<p contenteditable="true" onblur="editarPrecioCondimento(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
            : `<p><b>Bs.</b> ${art.precio}</p>`}


          <!-- 2. Estado clickeable solo admin -->
          <p id="Estado" 
             class="${estadoDelArticulo ? 'disponible' : 'agotado'}" 
             ${localStorage.getItem("admin") === "true"
               ? `onclick="cambiarEstado(${i}, ${estadoDelArticulo ? 0 : 1})"`
               : ``}>
            ${estadoDelArticulo ? 'Disponible' : 'Agotado'}
          </p>
          <button class="carrito"><ion-icon name="cart-outline"></ion-icon>Agregar +</button>
      </div>
    `
    articulosEnglobados.appendChild(targeta)
  })
}

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