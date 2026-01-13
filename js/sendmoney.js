$(document).ready(function () {
  const alkeUser = localStorage.getItem("alkeUser");

  if (!alkeUser) {
    window.location.href = "../HTML/login.html";
    return;
  }

  let userData;

  try {
    userData = JSON.parse(alkeUser);
  } catch {
    window.location.href = "../HTML/login.html";
    return;
  }

  if (!userData.loggedIn) {
    window.location.href = "../HTML/login.html";
    return;
  }

  $("#sendmoneyUserEmail").text(userData.nombre || userData.email || "Usuario");

  if (userData.avatar) {
    $("#sendmoneyAvatar").html(`
            <img src="${userData.avatar}"
                 style="width:100%;height:100%;border-radius:50%;object-fit:cover">
        `);
  }

  const saldo =
    Number(localStorage.getItem("saldo")) || userData.saldoInicial || 0;
  $("#currentBalance").text("$" + saldo.toLocaleString());
});

$(document).ready(function () {
  let contactoSeleccionado = null;

  $(document).on("click", ".contacto", function () {
    $(".contacto").removeClass("active");
    $(this).addClass("active");

    contactoSeleccionado = $(this);
    $("#btnEnviarDinero").fadeIn(200);
  });

  $("#searchContact").on("keyup", function () {
    const texto = $(this).val().toLowerCase();

    $(".contacto").each(function () {
      $(this).toggle($(this).text().toLowerCase().includes(texto));
    });
  });

  $("#guardarContacto").on("click", function () {
    const nombre = $("#nombre").val().trim();
    const alias = $("#alias").val().trim();
    const banco = $("#banco").val().trim();

    if (!nombre || !alias || !banco) {
      showMessage("Completa todos los campos", "danger");
      return;
    }

    $("#contactList").append(`
            <li class="list-group-item contacto">
                <div class="fw-medium">${nombre}</div>
                <small class="text-muted">Alias: ${alias} | Banco: ${banco}</small>
            </li>
        `);

    $("#modalContacto").modal("hide");
    $("#modalContacto input").val("");

    showMessage("Contacto guardado correctamente", "success");
  });

  $("#btnEnviarDinero").on("click", function () {
    const monto = Number($("#monto").val());
    let saldo = Number(localStorage.getItem("saldo")) || 0;

    if (!contactoSeleccionado) {
      showMessage("Selecciona un contacto", "warning");
      return;
    }

    if (!monto || monto <= 0) {
      showMessage("Ingresa un monto válido", "danger");
      return;
    }

    if (monto > saldo) {
      showMessage("Saldo insuficiente", "danger");
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    $("#currentBalance").text("$" + saldo.toLocaleString());

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push({
      tipo: "envio",
      detalle: "Transferencia enviada",
      monto: monto,
      fecha: new Date().toLocaleDateString(),
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    showMessage("Transferencia realizada con éxito", "success");

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2000);
  });
});

function showMessage(text, type) {
  const map = {
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
  };

  $("#mensaje").html(`
        <div class="alert ${map[type] || "alert-info"}">
            ${text}
        </div>
    `);
}

