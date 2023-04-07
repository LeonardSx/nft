const etiquetaLinks = document.querySelectorAll('.etiqueta-link');

etiquetaLinks.forEach(etiquetaLink => {
  etiquetaLink.addEventListener('click', (event) => {
    event.preventDefault();
    
    const etiquetaId = etiquetaLink.getAttribute('href').substring(1);
    const etiqueta = document.getElementById(etiquetaId);
    const userEmailAddress = localStorage.getItem("emailSubmitted");
    if (!userEmailAddress) {
      window.location.href = "dashboard.html";
      return;
    }
    const etiquetas = document.querySelectorAll('.etiqueta-contenido');
    etiquetas.forEach(etiqueta => {
      etiqueta.classList.add('hidden');
    });
    
    etiqueta.classList.remove('hidden');
  });
});