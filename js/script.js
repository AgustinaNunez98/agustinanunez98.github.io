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


fetch('https://jsonplaceholder.typicode.com/posts?_limit=3') // Trae 3 posteos
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('api-posts');
    data.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error al traer los posts:', error);
  });
