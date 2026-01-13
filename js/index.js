$(document).ready(function () {

  console.log("Index.js cargado correctamente");

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
