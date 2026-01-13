$(document).ready(function () {

  console.log("Index.js cargado correctamente");

  /* =====================================================
     ANIMACIÓN DE ENTRADA
     ===================================================== */
  $(".card")
    .css({
      opacity: 0,
      transform: "translateY(20px)"
    })
    .animate(
      { opacity: 1 },
      {
        duration: 600,
        step: function () {
          $(this).css("transform", "translateY(0)");
        }
      }
    );

  /* =====================================================
     EFECTO HOVER BOTÓN (CONSISTENTE CON LOGIN)
     ===================================================== */
  $(".btn-primary").hover(
    function () {
      $(this).css({
        transform: "translateY(-2px)",
        boxShadow: "0 6px 15px rgba(214, 51, 132, 0.3)"
      });
    },
    function () {
      $(this).css({
        transform: "translateY(0)",
        boxShadow: "none"
      });
    }
  );

  /* =====================================================
     FEEDBACK AL HACER CLICK EN ACCEDER
     ===================================================== */
  $(".btn-primary").on("click", function (e) {

    e.preventDefault();

    const boton = $(this);

    boton
      .prop("disabled", true)
      .html('<i class="fas fa-spinner fa-spin me-2"></i>Accediendo...');

    $(".card").animate(
      { backgroundColor: "rgba(248, 187, 208, 0.4)" },
      400
    );

    setTimeout(function () {
      window.location.href = boton.attr("href");
    }, 700);

  });

});
