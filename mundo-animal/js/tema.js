
const PREFIXO = "mundo-animal-tema:";

function lerTema() {
  const parametro = new URLSearchParams(location.search).get("tema");
  if (parametro == "escuro" || parametro == "claro") {
    return parametro;
  }

  try {
    const salvo = localStorage.getItem("tema");
    if (salvo == "escuro" || salvo == "claro") {
      return salvo;
    }
  } catch (erro) {}

  if (window.name.indexOf(PREFIXO) == 0) {
    return window.name.slice(PREFIXO.length);
  }

  return "claro";
}

function guardarTema(tema) {
  try {
    localStorage.setItem("tema", tema);
  } catch (erro) {}
  window.name = PREFIXO + tema;
}

function atualizarLinks(tema) {
  document.querySelectorAll("a[href]").forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) {
      return;
    }
    if (!/\.html?($|\?|#)/i.test(href)) {
      return;
    }
    const url = new URL(href, location.href);
    url.searchParams.set("tema", tema);
    link.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
  });
}

function aplicarTema(tema) {
  const escuro = tema == "escuro";
  const raiz = document.documentElement;
  raiz.classList.toggle("escuro", escuro);
  raiz.setAttribute("data-bs-theme", escuro ? "dark" : "light");

  const botao = document.getElementById("btnTema");
  if (botao) {
    botao.textContent = escuro ? "☀️ Claro" : "🌙 Escuro";
    botao.setAttribute("aria-pressed", escuro);
  }
  if (document.body) {
    atualizarLinks(tema);
  }
}

let temaAtual = lerTema();
guardarTema(temaAtual);
aplicarTema(temaAtual);

document.addEventListener("DOMContentLoaded", function () {
  aplicarTema(temaAtual);

  const botao = document.getElementById("btnTema");
  if (botao) {
    botao.addEventListener("click", function () {
      temaAtual = temaAtual == "escuro" ? "claro" : "escuro";
      guardarTema(temaAtual);
      aplicarTema(temaAtual);

      const url = new URL(location.href);
      url.searchParams.set("tema", temaAtual);
      try {
        history.replaceState(null, "", url.search + url.hash);
      } catch (erro) {}
    });
  }
});

window.addEventListener("storage", function (evento) {
  if (evento.key == "tema" && (evento.newValue == "escuro" || evento.newValue == "claro")) {
    temaAtual = evento.newValue;
    window.name = PREFIXO + temaAtual;
    aplicarTema(temaAtual);
  }
});

window.addEventListener("pageshow", function () {
  temaAtual = lerTema();
  aplicarTema(temaAtual);
});
