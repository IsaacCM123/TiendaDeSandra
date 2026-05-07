const socket = io()
const listaID = document.getElementById("listaID")

// Validar usuario
//Cuando entremos a la pagina 30_buzonDeSugerencias.html DevTools del navegador
//verificara si en el localStorage existe el usuario ("usuario") con su valor ("Jaimito")
//en tal caso desbloqueamos la pantalla para que brinde su sugerencia. Caso contrario
//Bloqueamos la pantalla...
window.onload=()=>{
    if(!localStorage.getItem("usuario")){//Si su valor de este campo de localStorage() es nulo o vacio o FALSE
        document.getElementById("ventanaModalID").style.display="flex"//Abrimos el Modal y le sugerimos que se registre con su nombre
        bloquearUI(true)}//Mientras tanto le bloqueamos la pagina si no esta registrado
    else{
        bloquearUI(false)
        if(localStorage.getItem("usuario")){document.getElementById('usuarioID').textContent='Bienvenido '+localStorage.getItem('usuario')+'!!.'}
        }//Si entra a la pagina y su valor de localStorage es true habilitamos los privilegios.
        cargarComentarios()}//traemos todos las sugerencias del archivo JSON. y lo descargamos en el frontend



// Funcion Bloquear con una capa transparente la pantalla de la pagina
function bloquearUI(estado) {
    document.getElementById("bloqueoID").style.display=estado?"block":"none"}



//Validando campo de texto Nombre, de la ventanaModal
document.getElementById("nombreID").addEventListener('input', function(){
    const valor=this.value
    /*Expresión regular: solo letras (mayúsculas y minúsculas)*/
    const soloLetras=/^[a-zA-Z]*$/
    if(!soloLetras.test(valor)){
      document.getElementById('error').textContent='❌ Solo se permiten letras'
      /*Elimina el ultimo caracter invalido*/
      this.value=valor.slice(0,-1)}
    else{
      document.getElementById('error').innerHTML='<ion-icon name="people-sharp"></ion-icon>'}
})



// Registrar usuario
function registrar(){
     if(document.getElementById("nombreID").value.length<4){
      document.getElementById('error').textContent='❌ Al menos 4 letras'
      document.getElementById("nombreID").focus()}
    else{
      const nombre=document.getElementById("nombreID").value
      localStorage.setItem('usuario',nombre)
      document.getElementById("ventanaModalID").style.display = "none"
      bloquearUI(false)
      location.reload()}}



// Cerrar modal (modo solo lectura)
function cerrarModal() {
    document.getElementById("ventanaModalID").style.display = "none"
    bloquearUI(true)
}


// Enviar comentario
function enviarComentario(){
    const usuario=localStorage.getItem("usuario")
    const texto=document.getElementById("textAreaID").value
    if(texto.length<=3){
        /*No hace nada*/
    }
    else{
        if (!usuario) return
        const data={
            id: Date.now(),//Implementando ID único...
            usuario,
            comentario: texto,
            fecha: new Date().toLocaleString()}
        socket.emit("nuevo-comentario", data)
        document.getElementById("textAreaID").value = ""}
}



// Mostrar comentario
function agregarComentario(data) {
    const li=document.createElement("li")
    li.id='comentario-'+data.id
    const admin=localStorage.getItem('admin')
    let botonEliminar=''
    if(admin==='true'){
        botonEliminar=`<button onclick="eliminarComentario(${data.id})">🗑️</button>`
    }

    li.innerHTML = `
        <strong>${data.usuario}</strong><br>
        ${data.comentario}<br>
        <small>${data.fecha}</small><br>
        ${botonEliminar}
    `
    listaID.prepend(li)}

//Escuchar Eliminacion en tiempo real nuevo....
function eliminarComentario(id) {
    socket.emit("eliminar-comentario", id)
}


// Cargar existentes
async function cargarComentarios() {
    const res = await fetch("/comentarios")
    const data = await res.json()
    data.reverse().forEach(agregarComentario)
}


socket.on("comentario-eliminado", (id) => {
    const elemento = document.getElementById("comentario-" + id)
    if (elemento) {
        elemento.remove()
    }
})


// Escuchar tiempo real
socket.on("actualizar-comentarios", (data) => {
    agregarComentario(data)
})