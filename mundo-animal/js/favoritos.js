
const form = document.getElementById("formFav");
const animal = document.getElementById("animal");
const email = document.getElementById("email");
const motivo = document.getElementById("motivo");
const nota = document.getElementById("nota");
const resumo = document.getElementById("resumo");
const tabela = document.getElementById("tabFav");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function salvar() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrar();
}

function mostrar() {
  tabela.innerHTML = "";

  if (favoritos.length == 0) {
    resumo.textContent = "Nenhum animal favorito cadastrado.";
    tabela.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Nada por aqui ainda.</td></tr>`;
    return;
  }

  let soma = 0;
  favoritos.forEach(function (item, i) {
    soma += item.nota;
    const linha = tabela.insertRow();
    linha.insertCell().textContent = item.nome;
    const celulaEmail = linha.insertCell();
    if (item.email) {
      const link = document.createElement("a");
      link.href = "mailto:" + item.email;
      link.textContent = item.email;
      celulaEmail.appendChild(link);
    }
    linha.insertCell().textContent = item.motivo || "";
    linha.insertCell().textContent = item.nota + " ★";
    const acoes = linha.insertCell();
    acoes.className = "text-end text-nowrap";
    acoes.innerHTML = `<button type="button" class="btn btn-sm btn-warning" data-acao="editar" data-indice="${i}">Editar</button> <button type="button" class="btn btn-sm btn-outline-danger" data-acao="excluir" data-indice="${i}">Excluir</button>`;
  });

  resumo.textContent = `${favoritos.length} favorito(s) - média ${(soma / favoritos.length).toFixed(1)}`;
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  favoritos.push({
    nome: animal.value.trim(),
    email: email.value.trim(),
    motivo: motivo.value.trim(),
    nota: Number(nota.value),
  });
  form.reset();
  salvar();
});

tabela.addEventListener("click", function (evento) {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) {
    return;
  }

  const i = Number(botao.dataset.indice);

  if (botao.dataset.acao == "editar") {
    const novo = prompt("Novo nome:", favoritos[i].nome);
    if (novo && novo.trim() != "") {
      favoritos[i].nome = novo.trim();
      salvar();
    }
  } else {
    favoritos.splice(i, 1);
    salvar();
  }
});

mostrar();
