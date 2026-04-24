const p = document.getElementById("abiertoCerradoP-ID")

// Obtener estado del servidor
async function obtenerEstado() {
    const res = await fetch("/estado")
    const data = await res.json()
    actualizarUI(data.estado)
}
// Actualizar interfaz
function actualizarUI(estado) {
    if (estado === 0) {
        p.textContent = "Abierto"
        p.style.backgroundColor = "green"
    } else {
        p.textContent = "Cerrado"
        p.style.backgroundColor = "red"
    }
}
// Cambiar estado (solo admin)
p.addEventListener("click", async () => {
    if (localStorage.getItem("admin") !== "true") return
    const nuevoEstado = p.textContent === "Abierto" ? 1 : 0
    await fetch("/estado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ estado: nuevoEstado })
    })
    obtenerEstado()
})
// Actualizar cada 2 segundos (para otros usuarios)
setInterval(obtenerEstado, 2000)
// Inicial
obtenerEstado()