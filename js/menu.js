$(document).ready(function () {
  const alkeUser = localStorage.getItem("alkeUser");

  if (!alkeUser) {
    window.location.href = "login.html";
    return;
  }

  let userData;

  try {
    userData = JSON.parse(alkeUser);

    if (!userData.loggedIn) {
      window.location.href = "login.html";
      return;
    }

    console.log("Usuario autenticado:", userData.email);
  } catch (error) {
    console.error("Error leyendo datos del usuario:", error);
    window.location.href = "login.html";
    return;
  }

  $("#userName").text(userData.nombre || userData.email);

  let saldoMostrar;
  const saldoLocal = localStorage.getItem("saldo");

  if (saldoLocal !== null) {
    saldoMostrar = Number(saldoLocal);
    userData.saldoInicial = saldoMostrar;
    localStorage.setItem("alkeUser", JSON.stringify(userData));
  } else {
    saldoMostrar = userData.saldoInicial || 6666666;
  }

  $("#saldo").text("$" + saldoMostrar.toLocaleString());

  $("#btnContactos").on("click", function () {
    window.location.href = "sendmoney.html";
  });

  const avatarContainer = $("#menuAvatar");
  avatarContainer.empty();

  if (userData.avatar && userData.avatar.trim() !== "") {
    avatarContainer.html(`
      <img
        src="${userData.avatar}"
        alt="Avatar del usuario"
        style="width:100%; height:100%; border-radius:50%; object-fit:cover;"
      >
    `);
    avatarContainer.css("background", "none");
  }

  $("#btnDepositar").on("click", function () {
    window.location.href = "deposit.html";
  });

  $("#btnEnviar").on("click", function () {
    window.location.href = "sendmoney.html";
  });

  $("#btnMovimientos").on("click", function () {
    window.location.href = "transactions.html";
  });

  $("#btnInversiones").on("click", function () {
    window.location.href = "../HTML/investments.html";
  });

  const contenedor = $("#recentTransactions");
  contenedor.empty();

  const movimientos = JSON.parse(localStorage.getItem("transactions")) || [];

  if (movimientos.length === 0) {
    contenedor.html(`
      <div class="text-center py-4 text-muted">
        No hay movimientos registrados
      </div>
    `);
    return;
  }

  movimientos
    .slice(-5)
    .reverse()
    .forEach((mov) => {
      contenedor.append(`
      <div class="d-flex justify-content-between border-bottom py-2">
        <span>${mov.tipo}</span>
        <span>$${Number(mov.monto).toLocaleString()}</span>
      </div>
    `);
    });
});
