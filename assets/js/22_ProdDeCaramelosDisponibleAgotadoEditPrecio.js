const socket = io()

let articulosDeCaramelos = [
    { nombre:'Yogurello',detalle:'95ml',precio:1,img:'./../../img/Productos/Caramelos/1.jpg'},
    { nombre:'Pilfrut',detalle:'175ml',precio:1,img:'./../../img/Productos/Caramelos/2.jpg'},
    { nombre:'Juguito PIL',detalle:'150ml',precio:1,img:'./../../img/Productos/Caramelos/3.jpg'},
    { nombre:'Galletas Jirafa',detalle:'Craker 250g',precio:1,img:'./../../img/Productos/Caramelos/4.jpg'},
    { nombre:'Galleta Moradita',detalle:'Saladita 90g',precio:1,img:'./../../img/Productos/Caramelos/5.jpg'},
    { nombre:'Galleta Maria',detalle:'Dulce de 90g',precio:1,img:'./../../img/Productos/Caramelos/6.jpg'},
    { nombre:'Galleta Mabel',detalle:'100g',precio:1,img:'./../../img/Productos/Caramelos/7.jpg'},
    { nombre:'Chicolac',detalle:'120ml',precio:1,img:'./../../img/Productos/Caramelos/8.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

function render(data) {
  articulosEnglobados.innerHTML = ""

  articulosDeCaramelos.forEach((art, i) => {
    const estadoDelArticulo = data.estadoDelCaramelo[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>
          

          <!--1. Precio editable. Solo Administrados (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p contenteditable="true" onblur="actualizarPrecioCaramelo(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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
      fetch('/disponibleAgotadoCaramelos').then(res=>res.json()),//Apunta al archivo .JSON (estado Disponible Agotado)
      fetch('/precioDeLosCaramelos').then(res=>res.json())//Apunta al archivo .JSON (Esditar precio)
    ]).then(([estadoDisponiblepAgotado1, actualizarPrecio2])=>{//Son simplemente parametros locales
      articulosDeCaramelos = articulosDeCaramelos.map((art, i)=>({//Es el array de objetos de los articulosDeCaramelos
        ...art,
        precio: actualizarPrecio2[i]//El precio viene del Array de Objetos articulosDeCaramelos
      }))
      render(estadoDisponiblepAgotado1)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoCaramelos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoCaramelo', (data) => {
  render(data)
})//Debajo de cargar todo el precio editable

socket.on('PrecioActualCaramelo', (actualizarPrecioParam)=>{//PrecioActualCaramelo viene del server.js io.emit
  articulosDeCaramelos = articulosDeCaramelos.map((art, i)=>({
    ...art,
    precio:actualizarPrecioParam[i]//El precio viene del Array de Objetos articulosDeCaramelos
  }))
  fetch('/disponibleAgotadoCaramelos')//Viene desde el archivo .json
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function actualizarPrecioCaramelo(index, texto) {
  const arrayJsonPrecCaramelo = parseFloat(texto.replace(/[^0-9.]/g, ''))
  if (isNaN(arrayJsonPrecCaramelo)) return
  fetch('/precioDeLosCaramelos', {// es el nombre del archivo precioDeLosCaramelos.JSON
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecCaramelo })
  })
}