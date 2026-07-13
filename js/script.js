// Esperamos que cargue todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    mostrarFecha();
    configurarBotonVolverArriba();
    configurarFormulario();
    cargarResenas();
    configurarCarrito();
});

// Array con productos disponibles
const productos = [
  { id: 1, nombre: "Cataratas del Iguazú", precio: 15000 },
  { id: 2, nombre: "Perito Moreno", precio: 20000 },
  { id: 3, nombre: "Salinas Grandes", precio: 12000 }
];

// Referencias al DOM
const botonVolver = document.getElementById("volverArriba");

const formulario = document.querySelector("#contacto form");
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputMensaje = document.getElementById("mensaje");
const mensajeError = document.getElementById("mensaje-error");

const contenedorResenas = document.getElementById("api-posts");

const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("lista-carrito");
const totalTexto = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");

//Función mostrar la fecha actual en el footer
function mostrarFecha() {
  const fecha = document.getElementById("fecha");

  if (fecha) {
    fecha.textContent = new Date().toLocaleDateString("es-AR");
  }
}

// Inicializamos el carrito desde localStorage o vacío si no existe
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Función para configurar el carrito de compras
function configurarCarrito() {
  if (contenedorProductos){
  mostrarProductos();
  }

  if (contenedorCarrito && totalTexto) {
    renderizarCarrito();
  }

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      carrito = [];
      guardarYActualizar();
    });
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if(!producto) return;

  carrito.push(producto);
  guardarYActualizar();
  alert(`${producto.nombre} agregado al carrito`);
}

// Función para eliminar un producto del carrito por índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarYActualizar();
}

// Guardar carrito en localStorage y actualizar la vista
function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (contenedorCarrito && totalTexto) {
    renderizarCarrito();
  }
}

//Función configuración del botón "Volver Arriba"
function configurarBotonVolverArriba() {
  if (!botonVolver) return;

  function mostrarUOcultarBoton() {
    const distanciaScroll = 400;

    if (window.scrollY > distanciaScroll) {
      botonVolver.classList.add("visible");
    } else {
      botonVolver.classList.remove("visible");
    }
  }

  botonVolver.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", mostrarUOcultarBoton);

  mostrarUOcultarBoton();
}

//Función configuración del formulario de contacto
function configurarFormulario() {
if (!formulario) return;

formulario.addEventListener("submit", (e) => {
const nombre = inputNombre.value.trim();
const email = inputEmail.value.trim();
const mensaje = inputMensaje.value.trim();

if (mensajeError) {
mensajeError.textContent = "";
}
if (nombre === "" || email === "" || mensaje === "") {
e.preventDefault();
if (mensajeError) {
mensajeError.textContent = "Por favor, complete todos los campos.";
}
return;
}
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailValido.test(email)) {
e.preventDefault();
if (mensajeError) {
mensajeError.textContent = "Por favor, ingrese un correo electrónico válido.";
}
}
});
}


//Función para cargar reseñas desde una API
function cargarResenas() {
  if (!contenedorResenas) return;

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudieron cargar las reseñas.");
      }

      return response.json();
    })
    .then((resenas) => {
      contenedorResenas.innerHTML = "";

      resenas.forEach((resena) => {
        const articulo = document.createElement("article");

        articulo.innerHTML = `
          <h3>${capitalizarTexto(resena.title)}</h3>
          <p>${resena.body}</p>
          <p><em>Viajero anónimo</em></p>
        `;

        contenedorResenas.appendChild(articulo);
      });
    })
    .catch(() => {
      contenedorResenas.innerHTML = `
        <p>No pudimos cargar las reseñas en este momento.</p>
      `;
    });
}

function capitalizarTexto(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}