const socket = io()

let articulos = [
    {nombre:'Fideos',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/1.jpg'},
    {nombre:'Macarron',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/2.jpg'},
    {nombre:'Macarron',detalle:'Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/3.jpg'},
    {nombre:'Fideos',detalle:'Nidito Sachets 400g',precio:1,img:'./../../img/Productos/Abarrotes/4.jpg'},
    {nombre:'Aceite',detalle:'900ml',precio:1,img:'./../../img/Productos/Abarrotes/5.jpg'},
    {nombre:'Harina',detalle:'De Trigo 1k',precio:1,img:'./../../img/Productos/Abarrotes/6.jpg'}
]

const producto = document.getElementById('productoID')

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
            ? `<p contenteditable="true" onblur="actualizarPrecio(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
            : `<p><b>Bs.</b> ${art.precio}</p>`
          }

          <!--2. Estado clickeable solo admin-->
          <p id="Estado" 
             class="${estadoPro ? 'disponible' : 'agotado'}" 
             ${localStorage.getItem("admin") === "true"
               ? `onclick="cambiarEstado(${i}, ${estadoPro ? 0 : 1})"`
               : ``}>
            ${estadoPro ? 'Disponible' : 'Agotado'}
          </p>
          <button class="carrito"><ion-icon name="cart-outline"></ion-icon>Agregar +</button>
      </div>
    `
    producto.appendChild(targeta)
  })
}

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