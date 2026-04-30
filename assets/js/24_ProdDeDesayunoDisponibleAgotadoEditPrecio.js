const socket = io()

let articulosDeDesayuno = [
    { nombre:'Pan',detalle:'De Batalla',precio:1,img:'./../../img/Productos/Desayunos/1.jpg'},
    { nombre:'Mantequilla',detalle:'Con sal 100g',precio:1,img:'./../../img/Productos/Desayunos/2.jpg'},
    { nombre:'Huevos',detalle:'Maple de 20u.',precio:1,img:'./../../img/Productos/Desayunos/3.jpg'},
    { nombre:'Cafe',detalle:'Copacabana 50g',precio:1,img:'./../../img/Productos/Desayunos/4.jpg'},
    { nombre:'ChocoLike',detalle:'50g',precio:1,img:'./../../img/Productos/Desayunos/5.jpg'},
    { nombre:'Maizena',detalle:'De almidon 200g',precio:1,img:'./../../img/Productos/Desayunos/6.jpg'},
    { nombre:'Te Paris',detalle:'20u. con canela',precio:1,img:'./../../img/Productos/Desayunos/7.jpg'},
    { nombre:'Avena',detalle:'400g',precio:1,img:'./../../img/Productos/Desayunos/8.jpg'},
    { nombre:'Avena Instant',detalle:'300g',precio:1,img:'./../../img/Productos/Desayunos/9.jpg'},
    { nombre:'Api',detalle:'38g',precio:1,img:'./../../img/Productos/Desayunos/10.jpg'},
    { nombre:'Mermelada',detalle:'320g',precio:1,img:'./../../img/Productos/Desayunos/11.jpg'},
    { nombre:'Polvo',detalle:'Para hornear de 57g',precio:1,img:'./../../img/Productos/Desayunos/12.jpg'},
    { nombre:'Levadura',detalle:'Seca de 20g',precio:1,img:'./../../img/Productos/Desayunos/13.jpg'}
]

const articulosEnglobados = document.getElementById('productoID')

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
            ? `<p contenteditable="true" onblur="editarPrecioDesayuno(${i}, this.innerText)"><b>Bs.</b> ${art.precio}</p>`
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