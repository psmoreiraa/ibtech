document.addEventListener("DOMContentLoaded", () => {

  // ===== TERMINAL =====
  const input  = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("keydown", function(e) {
    if (e.key !== "Enter") return;

    const command  = input.value.toLowerCase().trim();
    let response   = "";

    // FLAG 2.7: comando help + clear adicionados
    if (command === "help") {
      response = `Comandos disponíveis:
  whoami   — quem sou eu
  skills   — minhas habilidades
  contact  — meu e-mail
  clear    — limpar o terminal
  help     — esta lista`;

    } else if (command === "clear") {
      // mantém só a dica inicial
      output.innerHTML = "<p>Digite <strong>help</strong> e aperte Enter para ver os comandos disponíveis.</p>";
      input.value = "";
      return;

    } else if (command === "whoami") {
      response = "Pedro Moreira - Engenharia da Computação, Ibmec.";

    } else if (command === "skills") {
      response = "HTML, CSS, C/C++, Excel, Canva.";

    } else if (command === "contact") {
      response = "Email: pedrosmoreira34@gmail.com";

    } else {
      response = `Comando não reconhecido: "${command}". Digite help para ver os comandos disponíveis.`;
    }

    output.innerHTML += `<p>&gt; ${command}</p><p>${response}</p>`;
    input.value = "";
    output.scrollTop = output.scrollHeight;
  });


  // ===== BLOQUEADOR 1.5: TEMA CLARO/ESCURO com localStorage + prefers-color-scheme =====
  const toggle      = document.getElementById("theme-toggle");
  const STORAGE_KEY = "tema-pedro";

  function aplicarTema(tema) {
    if (tema === "dark") {
      document.body.classList.add("dark");
      toggle.textContent = "☀️";
      toggle.setAttribute("aria-label", "Mudar para tema claro");
    } else {
      document.body.classList.remove("dark");
      toggle.textContent = "🌙";
      toggle.setAttribute("aria-label", "Mudar para tema escuro");
    }
  }

  // 1. tenta o que está salvo
  const salvo = localStorage.getItem(STORAGE_KEY);

  // 2. se nada salvo, usa a preferência do sistema
  const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  aplicarTema(salvo ?? (prefereDark ? "dark" : "light"));

  // 3. toggle salva a escolha
  toggle.addEventListener("click", () => {
    const atual = document.body.classList.contains("dark") ? "dark" : "light";
    const novo  = atual === "dark" ? "light" : "dark";
    aplicarTema(novo);
    localStorage.setItem(STORAGE_KEY, novo);
  });


  // ===== COPIAR EMAIL =====
  const copyBtn = document.getElementById("copy-btn");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pedrosmoreira34@gmail.com");
    copyBtn.textContent = "Copiado!";
    setTimeout(() => {
      copyBtn.textContent = "Copiar email";
    }, 2000);
  });


  // ===== ANIMAÇÃO COM INTERSECTION OBSERVER =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });
  sections.forEach(section => observer.observe(section));


  // ===== FLAG 2.5: MENU HAMBÚRGUER MOBILE =====
  const menuBtn = document.getElementById("menu-toggle");
  const nav     = document.getElementById("main-nav");

  menuBtn.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", aberto);
    menuBtn.textContent = aberto ? "✕" : "☰";
    menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // fechar com Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("aberto")) {
      nav.classList.remove("aberto");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-label", "Abrir menu");
    }
  });

  // fechar clicando fora
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("aberto")) return;
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("aberto");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-label", "Abrir menu");
    }
  });

});
