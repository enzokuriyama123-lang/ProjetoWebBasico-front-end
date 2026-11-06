
const botoes = document.querySelectorAll(".filtro");
const itens = document.querySelectorAll(".item-galeria");

botoes.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const filtro = botao.dataset.filtro;

    itens.forEach(function (item) {
      item.hidden = filtro != "todos" && item.dataset.animal != filtro;
    });

    botoes.forEach(function (b) {
      b.classList.toggle("btn-success", b == botao);
      b.classList.toggle("btn-outline-success", b != botao);
    });
  });
});
