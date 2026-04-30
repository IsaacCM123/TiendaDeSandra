const socket = io()

let articulosDeGaseosa = [
    { nombre:'Jugo',detalle:'330ml',precio:1,img:'./../../img/Productos/Gaseosas/1.jpg'},
    { nombre:'Bebidas',detalle:'360ml.',precio:1,img:'./../../img/Productos/Gaseosas/2.jpg'},
    { nombre:'Pepsi',detalle:'Personal 1L',precio:1,img:'./../../img/Productos/Gaseosas/3.jpg'},
    { nombre:'Pepsi',detalle:'Mini 250ml',precio:1,img:'./../../img/Productos/Gaseosas/4.jpg'},
    { nombre:'Gaseosas',detalle:'Mini De 300ml.',precio:1,img:'./../../img/Productos/Gaseosas/5.jpg'},
    { nombre:'Coca Cola',detalle:'Personal De 500ml',precio:1,img:'./../../img/Productos/Gaseosas/6.jpg'},
    { nombre:'Popular',detalle:'Personal De 600ml',precio:1,img:'./../../img/Productos/Gaseosas/7.jpg'},
    { nombre:'Coca Cola',detalle:'Mini De 190ml',precio:1,img:'./../../img/Productos/Gaseosas/8.jpg'},
    { nombre:'Agua',detalle:'Vital De 3L',precio:1,img:'./../../img/Productos/Gaseosas/9.jpg'},
    { nombre:'Coca Cola',detalle:'Dietetica De 1.5L',precio:1,img:'./../../img/Productos/Gaseosas/10.jpg'},
    { nombre:'Mega Frut',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/11.jpg'},
    { nombre:'Jugo',detalle:'Del Tropico 3L',precio:1,img:'./../../img/Productos/Gaseosas/12.jpg'},
    { nombre:'Pura Vida',detalle:'2L',precio:1,img:'./../../img/Productos/Gaseosas/13.jpg'},
    { nombre:'Coca Cola',detalle:'Retornable 2.5L',precio:1,img:'./../../img/Productos/Gaseosas/14.jpg'},
    { nombre:'Gaseosa',detalle:'Oro De 3L',precio:1,img:'./../../img/Productos/Gaseosas/15.jpg'},
    { nombre:'Simba',detalle:'2L',precio:1,img:'./../../img/Productos/Gaseosas/16.jpg'},
    { nombre:'Jugo CIN',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/17.jpg'},
    { nombre:'Oriental',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/18.jpg'},
    { nombre:'Pepsi',detalle:'Gaseosa De 3L',precio:1,img:'./../../img/Productos/Gaseosas/19.jpg'},
    { nombre:'Cascada',detalle:'3L',precio:1,img:'./../../img/Productos/Gaseosas/20.jpg'},
    { nombre:'Coca Cola',detalle:'Gorda De 3L',precio:1,img:'./../../img/Productos/Gaseosas/21.jpg'},
    { nombre:'Jugo',detalle:'Pura Vida 300ml',precio:1,img:'./../../img/Productos/Gaseosas/22.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

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
            ? `<p contenteditable="true" onblur="editarPrecioGaseosa(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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