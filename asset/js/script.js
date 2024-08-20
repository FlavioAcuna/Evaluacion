document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const btnIniciar = document.getElementById("IniciarCuenta");
  const btnCancelar = document.getElementById("cancelarCuenta");

  let intervalId; // Variable global para almacenar el ID del intervalo

  function formatTime(time) {
    return time.toString().padStart(2, "0");
  }

  function iniciarCuenta(segundos, callback) {
    display.className = "display";
    let initSec = segundos;
    display.textContent = formatTime(initSec);
    intervalId = setInterval(() => {
      initSec--;
      display.textContent = formatTime(initSec);
      if (initSec <= 0) {
        clearInterval(intervalId);
        callback();
      }
    }, 1000);
  }

  function cuentaTerminada() {
    display.textContent = "00";
    display.className = "display display-end";
  }

  btnIniciar.addEventListener("click", (e) => {
    e.preventDefault();
    const segundos = parseInt(
      document.getElementById("secondsInput").value,
      10
    );

    if (!isNaN(segundos) && segundos > 0) {
      setTimeout(() => {
        iniciarCuenta(segundos, cuentaTerminada);
      }, 1000);
      document.getElementById("secondsInput").value = "";
    } else {
      alert("Por favor, ingresa un número válido.");
    }
  });

  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    clearInterval(intervalId); // Detiene el temporizador activo
    cuentaTerminada();
    document.getElementById("secondsInput").value = "";
  });
});
