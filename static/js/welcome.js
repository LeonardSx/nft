document.addEventListener("DOMContentLoaded", function() {
    var options = { hour: "numeric", hour12: false };
    var hour = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
    var welcome = document.getElementById("welcome");
    var message;
  
    if (hour >= 5 && hour < 12) {
      message = "Good morning";
    } else if (hour >= 12 && hour < 20) {
      message = "Good afternoon";
    } else {
      message = "Good evening";
    }
  
    welcome.textContent = message;
  });