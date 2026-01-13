$(document).ready(function () {
  const userData = localStorage.getItem("alkeUser");

  if (!userData) {
    window.location.href = "login.html";
    return;
  }

  let alkeUser = JSON.parse(userData);

  $("#depositForm").submit(function (e) {
    e.preventDefault();

    const monto = parseFloat($("#monto").val());
    const metodo = $("#metodo").val();

    $("#depositMessage").empty();

    if (isNaN(monto) || monto <= 0) {
      showMessage("Por favor ingresa un monto válido", "danger");
      return;
    }

    if (!alkeUser.saldoInicial) {
      alkeUser.saldoInicial = 0;
    }

    alkeUser.saldoInicial += monto;

    localStorage.setItem("saldo", alkeUser.saldoInicial);

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push({
      tipo: "deposito",
      detalle: "Depósito vía " + metodo,
      monto: monto,
      fecha: new Date().toLocaleDateString(),
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    if (!alkeUser.movimientos) {
      alkeUser.movimientos = [];
    }

    alkeUser.movimientos.push({
      tipo: "Depósito",
      monto: monto,
      metodo: metodo,
      fecha: new Date().toLocaleString(),
    });

    localStorage.setItem("alkeUser", JSON.stringify(alkeUser));

    showMessage(
      `Depósito de $${monto.toLocaleString()} realizado con éxito.<br>
            Nuevo saldo: <strong>$${alkeUser.saldoInicial.toLocaleString()}</strong>`,
      "success"
    );

    $("#depositForm")[0].reset();

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2000);
  });

  function showMessage(text, type) {
    const alertClass = type === "success" ? "alert-success" : "alert-danger";
    const icon = type === "success" ? "check-circle" : "exclamation-triangle";

    $("#depositMessage").html(`
            <div class="alert ${alertClass} alert-dismissible fade show">
                <i class="fas fa-${icon} me-2"></i>
                ${text}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
  }
});
