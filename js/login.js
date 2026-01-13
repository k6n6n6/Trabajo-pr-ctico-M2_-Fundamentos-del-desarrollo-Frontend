$(document).ready(function () {
  console.log("Login.js cargado correctamente");

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    $("#alerta").empty();

    if (!email || !password) {
      showAlert("Por favor completa todos los campos", "danger");
      return;
    }

    let usuarioInfo = null;
    let nombreUsuario = "";

    if (email === "knn@knn.com" && password === "666") {
      nombreUsuario = "¡¡¡Patron!!!";
      usuarioInfo = {
        email: email,
        nombre: nombreUsuario,
        avatar: "../img/knn.png",
        saldoInicial: 6666666,
        loggedIn: true,
        timestamp: new Date().toISOString(),
      };
    } else if (email === "profe@knn.com" && password === "profe123") {
      nombreUsuario = "profe♥";
      usuarioInfo = {
        email: email,
        nombre: nombreUsuario,
        avatar: "../img/profe♥.png",
        saldoInicial: 500,
        loggedIn: true,
        timestamp: new Date().toISOString(),
      };
    } else if (email === "test3@knn.com" && password === "test123") {
      nombreUsuario = "test user n°3, auto bautizado: Ozymandias";
      usuarioInfo = {
        email: email,
        nombre: nombreUsuario,
        avatar: "../img/ozymandias.png",
        saldoInicial: 100000,
        loggedIn: true,
        timestamp: new Date().toISOString(),
      };
    }

    if (usuarioInfo) {
      usuarioInfo.loggedIn = true;

      localStorage.setItem("alkeUser", JSON.stringify(usuarioInfo));
      sessionStorage.setItem("usuarioLogueado", "true");

      console.log("Usuario guardado:", usuarioInfo);
      console.log("localStorage alkeUser:", localStorage.getItem("alkeUser"));

      showAlert(`¡Bienvenido ${nombreUsuario}! Redirigiendo...`, "success");

      $("#btnLogin")
        .prop("disabled", true)
        .html('<i class="fas fa-spinner fa-spin me-2"></i>Redirigiendo...');

      $(".card").animate({ backgroundColor: "rgba(248, 187, 208, 0.5)" }, 500);

      setTimeout(function () {
        window.location.href = "menu.html";
      }, 1500);
    } else {
      showAlert("Credenciales incorrectas. FAVOR LEER README.md", "danger");

      $(".card").effect("shake", { distance: 5, times: 2 }, 300);

      $("#password").val("").focus();
    }
  });

  function showAlert(message, type) {
    const alertClass = type === "success" ? "alert-success" : "alert-danger";
    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";

    const alertHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <i class="fas ${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;

    $("#alerta").html(alertHTML);

    if (type === "danger") {
      setTimeout(function () {
        $(".alert").alert("close");
      }, 5000);
    }
  }

  $(".btn-primary").hover(
    function () {
      $(this).css({
        transform: "translateY(-2px)",
        boxShadow: "0 6px 15px rgba(214, 51, 132, 0.3)",
      });
    },
    function () {
      $(this).css({
        transform: "translateY(0)",
        boxShadow: "none",
      });
    }
  );

  $("#email").focus();

  $("#email, #password").on("input", function () {
    $(this).removeClass("is-invalid");
    $(".alert").alert("close");
  });

  $(".logo").click(function (e) {
    e.preventDefault();
    $("#email").val("knn@knn.com");
    $("#password").val("666");
    showAlert(
      "Credenciales demo cargadas. Haz click en Login para continuar.",
      "success"
    );
  });

  $(".logo").hover(
    function () {
      $(this).css("cursor", "pointer");
    },
    function () {
      $(this).css("cursor", "default");
    }
  );
});
