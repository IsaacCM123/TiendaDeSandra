const socket = io()

let articulosDeEnergeticos = [
    { nombre:'Energizante',detalle:'350ml',precio:1,img:'./../../img/Productos/Energeticos/1.jpg'},
    { nombre:'Energizante',detalle:'473ml',precio:1,img:'./../../img/Productos/Energeticos/2.jpg'},
    { nombre:'Energizante',detalle:'350ml',precio:1,img:'./../../img/Productos/Energeticos/3.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

function render(data) {
  articulosEnglobados.innerHTML = ""

  articulosDeEnergeticos.forEach((art, i) => {
    const estadoDelArticulo = data.estadoDelProdEnergetico[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>
          

          <!--1. Precio editable. Solo Administrador (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p contenteditable="true" onblur="editarPrecioEnergetico(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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
      fetch('/disponibleAgotadoEnergetico').then(res=>res.json()),//Apunta al archivo .JSON (estado Disponible Agotado)
      fetch('/precioDeLosEnergeticos').then(res=>res.json())//Apunta al archivo .JSON (precioDeLosArticulos.JSON)
    ]).then(([estadoDisponibleAgotado1, actualizarPrecio2])=>{//Son simplemente parametros locales
      articulosDeEnergeticos = articulosDeEnergeticos.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
        ...art,
        precio: actualizarPrecio2[i]//El precio viene del Array de Objetos de los articulos de este archivo
      }))
      render(estadoDisponibleAgotado1)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoEnergetico', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoEnergetico', (data) => {
  render(data)
})//Cambiar de cargarEstado() a cargarTodo() y encima de cargar todo el precio editable...

socket.on('PrecioActualEnergetico', (actualizarPrecioParam)=>{//PrecioActualEnergetico viene del server.js io.emit
  articulosDeEnergeticos = articulosDeEnergeticos.map((art, i)=>({//Es el array de objetos de los articulos de este archivo
    ...art,
    precio:actualizarPrecioParam[i]//El precio viene del Array de Objetos articulos de este archivo
  }))
  fetch('/disponibleAgotadoEnergetico')//Viene desde el archivo .json
    .then(res => res.json())
    .then(data => render(data))
})

cargarTodo()

function editarPrecioEnergetico(index, texto) {//Esta funcion enviamos al <p contenteditable onblur=() >
  const arrayJsonPrecEnergetico = parseFloat(texto.replace(/[^0-9.]/g, ''))// El contenido del archivo precio.JSON
  if (isNaN(arrayJsonPrecEnergetico)) return
  fetch('/precioDeLosEnergeticos', {// es el nombre del archivo precio.JSON
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecEnergetico })
  })
}