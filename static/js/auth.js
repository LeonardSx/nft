const userWalletAddress = window.localStorage.getItem("userWalletAddress");

// Obtener el formulario de correo y la sección del dashboard
const emailForm = document.getElementById("emailForm");
const dashboardSection = document.getElementById("dashboard");

// Si el usuario no tiene una dirección de cartera en su almacenamiento local y no se encuentra en la página de índice
if (!userWalletAddress && !window.location.href.includes("index.html")) {
  // Redirigir a la página de índice
  window.location.href = "index.html";
} else if (userWalletAddress && window.location.href.includes("index.html")) {
  // Redirigir a la página de dashboard
  window.location.href = "dashboard.html";
} else if (userWalletAddress && window.location.href.includes("dashboard.html") && !localStorage.getItem("emailSubmitted")) {
  // Si el usuario tiene una dirección de cartera y está en la página de dashboard, pero aún no ha enviado su correo electrónico
  // Mostrar el formulario de correo y ocultar la sección del dashboard
  emailForm.classList.remove("hidden");
  dashboardSection.classList.add("hidden");

  // Agregar un escucha de eventos para el envío del formulario
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Detener el comportamiento predeterminado de enviar el formulario
    const email = document.getElementById("email").value; // Obtener el valor del correo electrónico ingresado

    // Guardar el correo electrónico en el almacenamiento local
    localStorage.setItem("email", email);
    localStorage.setItem("emailSubmitted", true);

    // Ocultar el formulario de correo y mostrar la sección del dashboard
    emailForm.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
  });
} else if (userWalletAddress && window.location.href.includes("dashboard.html") && localStorage.getItem("emailSubmitted")) {
  // Si el usuario ya ha enviado su correo electrónico y está en la página de dashboard
  // Ocultar el formulario de correo y mostrar la sección del dashboard
  emailForm.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
}
