$(document).ready(function () {
  $("body").addClass("bg-light");
  $(".container").addClass("card shadow-sm p-4");

  $(".btn-secondary")
    .removeClass("btn-secondary")
    .addClass("btn btn-outline-primary mt-3");

  let movimientos = JSON.parse(localStorage.getItem("transactions")) || [];

  movimientos = movimientos.filter(
    (m) =>
      m &&
      typeof m.tipo === "string" &&
      typeof m.monto === "number" &&
      !isNaN(m.monto)
  );

  if (movimientos.length === 0) {
    movimientos = [
      {
        tipo: "deposito",
        detalle: "Depósito inicial",
        monto: 100000,
        fecha: "2026-01-01",
      },
      {
        tipo: "envio",
        detalle: "Transferencia a Juan",
        monto: 25000,
        fecha: "2026-01-02",
      },
      {
        tipo: "recepcion",
        detalle: "Transferencia recibida",
        monto: 50000,
        fecha: "2026-01-03",
      },
    ];
  }

  localStorage.setItem("transactions", JSON.stringify(movimientos));

  mostrarUltimosMovimientos("todos");

  $("#filtroTipo").on("change", function () {
    mostrarUltimosMovimientos($(this).val());
  });
});

function mostrarUltimosMovimientos(filtro) {
  const lista = $("#listaMovimientos");
  lista.empty();

  const movimientos = JSON.parse(localStorage.getItem("transactions")) || [];

  const filtrados =
    filtro === "todos"
      ? movimientos
      : movimientos.filter((m) => m.tipo === filtro);

  if (filtrados.length === 0) {
    lista.append(`
      <li class="list-group-item text-center text-muted">
        No hay movimientos para mostrar
      </li>
    `);
    return;
  }

  filtrados.forEach((mov) => {
    const montoClase =
      mov.tipo === "deposito" || mov.tipo === "recepcion"
        ? "text-success"
        : "text-danger";

    lista.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${getTipoTransaccion(mov.tipo)}</strong><br>
          ${mov.detalle || ""}<br>
          <small class="text-muted">${mov.fecha || ""}</small>
        </div>
        <span class="${montoClase} fw-bold">
          $${mov.monto.toLocaleString()}
        </span>
      </li>
    `);
  });
}

function getTipoTransaccion(tipo) {
  switch (tipo) {
    case "deposito":
      return "Depósito";
    case "envio":
      return "Transferencia enviada";
    case "recepcion":
      return "Transferencia recibida";
    default:
      return "Movimiento";
  }
}

