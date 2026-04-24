const socket = io()

let articulos = [
    { nombre:'Fideo',detalle:'Sachets 400g',precio:5.6,img:'../../img/Productos/Abarrotes/1.JPG'},
    { nombre:'Macarron',detalle:'Sachets 400g',precio:7.85,img:'../../img/Productos/Abarrotes/2.JPG'},
    { nombre:'Macarron',detalle:'Sachets 400g',precio:30,img:'../../img/Productos/Abarrotes/3.JPG'}
]

const producto = document.getElementById('productoID')

function render(data) {
  producto.innerHTML = "";

  articulos.forEach((art, i) => {
    const estadoPro = data.estadoProducto[i];

    const card = document.createElement('div');
    card.className = 'card';

   card.innerHTML = `
      <img src="${art.img}" />
      <div class="contenido">
          <h2>${art.nombre}</h2>
          <p>${art.detalle}</p>

          <!--1. Precio editable. Solo Administrados (Sandra)-->
          ${localStorage.getItem("admin") === "true"
            ? `<p contenteditable="true" onblur="actualizarPrecio(${i}, this.innerText)">Precio: $${art.precio}</p>`
            : `<p>Precio: $${art.precio}</p>`
          }

          <!-- 2. Estado clickeable solo admin -->
          <p id="Estado" 
             class="${estadoPro ? 'disponible' : 'agotado'}" 
             ${localStorage.getItem("admin") === "true"
               ? `onclick="cambiarEstado(${i}, ${estadoPro ? 0 : 1})"`
               : ``}>
            ${estadoPro ? 'Disponible' : 'Agotado'}
          </p>
      </div>
    `;

    producto.appendChild(card);
  })
}

function cargarTodo() {
  Promise.all([
    fetch('/estadoPro').then(res => res.json()),
    fetch('/precios').then(res => res.json())
]).then(([estadoData, preciosData]) => {
    articulos = articulos.map((art, i) => ({
      ...art,
      precio: preciosData[i]
    }))
    render(estadoData);
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
  const precio = parseFloat(texto.replace(/[^0-9.]/g, ''));

  if (isNaN(precio)) return;

  fetch('/precios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, precio })
  });
}