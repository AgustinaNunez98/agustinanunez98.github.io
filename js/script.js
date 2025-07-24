document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fecha").innerText = new Date().toLocaleDateString();
});

// Esperamos que cargue todo el DOM
document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("volverArriba");
  const footer = document.querySelector("footer");

  // Función para verificar si el footer está visible
  function isFooterVisible() {
    const rect = footer.getBoundingClientRect();
    return (
      rect.top < window.innerHeight && rect.bottom >= 0
    );
  }

  // Escuchamos el scroll
  window.addEventListener("scroll", function () {
    if (isFooterVisible()) {
      boton.style.display = "block";
    } else {
      boton.style.display = "none";
    }
  });

  // Acción del botón: volver arriba
  boton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.getElementById("contacto").addEventListener("submit", function(e) {
  e.preventDefault(); // evita el envío

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensajeError = document.getElementById("mensaje-error");

  if (nombre === "" || email === "") { //Muestra un mensaje si están vacíos
    mensajeError.textContent = "Por favor, completá todos los campos.";
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Verifica si el email tiene un formato válido
  if (!emailValido.test(email)) {
    mensajeError.textContent = "Ingresá un correo válido.";
    return;
  }

  // Si pasa las validaciones:
  mensajeError.textContent = "";
  alert("Formulario enviado correctamente"); // Podés reemplazar esto por un envío real
  // e.target.submit(); ← descomentá si usás Formspree
});


fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('api-posts');
    data.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>“${post.title.charAt(0).toUpperCase() + post.title.slice(1)}”</h3>
        <p>${post.body}</p>
        <p><em>🌎 Viajero anónimo</em></p>
        <hr/>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error al cargar reseñas:', error);
  });



// Array con productos disponibles
const productos = [
  { id: 1, nombre: "Cataratas del Iguazú", precio: 15000 },
  { id: 2, nombre: "Perito Moreno", precio: 20000 },
  { id: 3, nombre: "Salinas Grandes", precio: 12000 }
];

// Referencias a los contenedores del DOM
const contenedorProductos = document.getElementById('productos');
const contenedorCarrito = document.getElementById('lista-carrito');
const totalTexto = document.getElementById('total');
const btnVaciar = document.getElementById('vaciar-carrito');

// Inicializamos el carrito desde localStorage o vacío si no existe
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para mostrar productos en la página
function mostrarProductos() {
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  guardarYActualizar();
  alert(`${producto.nombre} agregado al carrito`);
}

// Función para eliminar un producto del carrito por índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarYActualizar();
}

// Vaciar carrito al hacer click en el botón
btnVaciar.addEventListener('click', () => {
  carrito = [];
  guardarYActualizar();
});

// Guardar carrito en localStorage y actualizar la vista
function guardarYActualizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
}

// Renderizar productos del carrito y calcular total
function renderizarCarrito() {
  contenedorCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalTexto.textContent = "Total: $0";
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>Precio: $${producto.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedorCarrito.appendChild(div);
    total += producto.precio;
  });

  totalTexto.textContent = `Total: $${total}`;
}

// Al cargar la página, mostramos productos y carrito
mostrarProductos();
renderizarCarrito();
