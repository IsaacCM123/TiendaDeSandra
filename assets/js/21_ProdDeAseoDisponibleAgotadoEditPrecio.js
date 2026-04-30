const socket = io()

let articulosDeAseo = [
    { nombre:'Detergente',detalle:'En polvo 650g',precio:1,img:'./../../img/Productos/Aseo/1.jpg'},
    { nombre:'Jabon Mundial',detalle:'En barra',precio:1,img:'./../../img/Productos/Aseo/2.jpg'},
    { nombre:'Detergente',detalle:'En polvo',precio:1,img:'./../../img/Productos/Aseo/3.jpg'},
    { nombre:'Lava Vajillas',detalle:'Sapolio 750ml',precio:1,img:'./../../img/Productos/Aseo/4.jpg'},
    { nombre:'Hisopos',detalle:'De 100 Unidades',precio:1,img:'./../../img/Productos/Aseo/5.jpg'},
    { nombre:'Cepillo',detalle:'Para ropa',precio:1,img:'./../../img/Productos/Aseo/6.jpg'},
    { nombre:'Papel higienico',detalle:'Paquete 1 docena',precio:1,img:'./../../img/Productos/Aseo/7.jpg'}
]

const articulosEnglobado = document.getElementById('productoID')

function render(data) {
  articulosEnglobado.innerHTML = ""

  articulosDeAseo.forEach((art, i) => {
    const estadoDelArticulo = data.estadoArticuloAseo[i]

    const targeta = document.createElement('div')
    targeta.className = 'targeta'

   targeta.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>

          <!--1. Precio editable. Solo Administrados (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p contenteditable="true" onblur="actualizarPrecioAseo(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
            : `<p><b>Bs.</b> ${art.precio}</p>`
          }

          <!--2. Estado clickeable solo admin-->
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
    articulosEnglobado.appendChild(targeta)
  })
}

function cargarTodo(){
    Promise.all([
      fetch('/disponibleAgotadoAseo').then(res=>res.json()),
      fetch('/precioAseo').then(res=>res.json())
    ]).then(([estadoDispAgot, actualizarPrecio])=>{
      articulosDeAseo = articulosDeAseo.map((art, i)=>({
        ...art,
        precio: actualizarPrecio[i]
      }))
      render(estadoDispAgot)
    })
}

function cambiarEstado(index, value) {
  fetch('/disponibleAgotadoAseo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, value })
  })
}

socket.on('estadoActualizadoAseo', (data) => {
  render(data)
})

socket.on('PrecioActualAseo', (actualizarPrecio)=>{
  articulosDeAseo = articulosDeAseo.map((art, i)=>({
    ...art,
    precio:actualizarPrecio[i]
  }))
  fetch('/disponibleAgotadoAseo')
    .then(res => res.json())
    .then(data => render(data))
})


cargarTodo()

function actualizarPrecioAseo(index, texto) {
  const arrayJsonPrecAseo = parseFloat(texto.replace(/[^0-9.]/g, ''))
  if (isNaN(arrayJsonPrecAseo)) return
  fetch('/precioAseo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, arrayJsonPrecAseo })
  })
}