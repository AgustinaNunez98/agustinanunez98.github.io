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



const productos = [
  { id: 1, nombre: "Cataratas del Iguazú", precio: 15000 },
  { id: 2, nombre: "Perito Moreno", precio: 20000 },
  { id: 3, nombre: "Salinas Grandes", precio: 12000 }
];

const contenedor = document.getElementById('productos');

productos.forEach(producto => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
  `;
  contenedor.appendChild(div);
});
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito`);
}

// Productos disponibles
const productos = [
  { id: 1, nombre: "Cataratas del Iguazú", precio: 15000 },
  { id: 2, nombre: "Perito Moreno", precio: 20000 },
  { id: 3, nombre: "Salinas Grandes", precio: 12000 }
];

// Contenedor para mostrar productos
const contenedor = document.getElementById('productos');

// Mostrar productos
productos.forEach(producto => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
  `;
  contenedor.appendChild(div);
});

// Recuperar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito`);
  mostrarCarrito();
}

// Mostrar el contenido del carrito
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById('carrito');
  contenedorCarrito.innerHTML = '<h2>Carrito</h2>';

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML += '<p>Tu carrito está vacío.</p>';
    return;
  }

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <p>${item.nombre} - $${item.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedorCarrito.appendChild(itemDiv);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  contenedorCarrito.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Eliminar un producto del carrito por su índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar el carrito apenas carga la página
mostrarCarrito();
const productos = [
  { id: 1, nombre: "Cataratas del Iguazú", precio: 15000 },
  { id: 2, nombre: "Perito Moreno", precio: 20000 },
  { id: 3, nombre: "Salinas Grandes", precio: 12000 }
];

// Contenedores
const contenedorProductos = document.getElementById('productos');
const contenedorCarrito = document.getElementById('lista-carrito');
const totalTexto = document.getElementById('total');
const btnVaciar = document.getElementById('vaciar-carrito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar productos
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

// Agregar producto
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  guardarYActualizar();
  alert(`${producto.nombre} agregado al carrito`);
}

// Eliminar producto
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarYActualizar();
}

// Vaciar carrito
btnVaciar.addEventListener('click', () => {
  carrito = [];
  guardarYActualizar();
});

// Guardar y actualizar carrito
function guardarYActualizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
}

// Renderizar carrito
function renderizarCarrito() {
  contenedorCarrito.innerHTML = "";
  let total = 0;

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

// Iniciar
mostrarProductos();
renderizarCarrito();
