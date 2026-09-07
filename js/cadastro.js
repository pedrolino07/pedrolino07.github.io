(function () {
  const form = document.getElementById("cadastro-form");
  const steps = [...form.querySelectorAll(".form-step")];
  const progressSpans = [...document.getElementById("form-progress").children];
  let etapaAtual = 1;

  let fotoPerfilData = "";
  let fotosPortfolioData = [];

  function irParaEtapa(n) {
    steps.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === n));
    progressSpans.forEach((s, i) => s.classList.toggle("done", i < n));
    etapaAtual = n;
  }

  function validarEtapaAtual() {
    const stepEl = steps.find((s) => Number(s.dataset.step) === etapaAtual);
    const campos = stepEl.querySelectorAll("input[required], textarea[required]");
    for (const campo of campos) {
      if (campo.type === "radio") {
        const grupo = stepEl.querySelectorAll(`input[name="${campo.name}"]`);
        if (![...grupo].some((r) => r.checked)) {
          alert("Selecione uma categoria para continuar.");
          return false;
        }
        continue;
      }
      if (!campo.value.trim()) {
        campo.focus();
        campo.style.borderColor = "var(--pink)";
        return false;
      }
    }
    return true;
  }

  form.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!validarEtapaAtual()) return;
      irParaEtapa(etapaAtual + 1);
    });
  });
  form.querySelectorAll("[data-prev]").forEach((btn) => {
    btn.addEventListener("click", () => irParaEtapa(etapaAtual - 1));
  });

  function lerArquivoComoDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  document.getElementById("foto-perfil").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fotoPerfilData = await lerArquivoComoDataURL(file);
    document.getElementById("preview-perfil").innerHTML = `<img src="${fotoPerfilData}" alt="Prévia da foto de perfil" />`;
  });

  document.getElementById("foto-portfolio").addEventListener("change", async (e) => {
    const arquivos = [...e.target.files].slice(0, 6);
    fotosPortfolioData = await Promise.all(arquivos.map(lerArquivoComoDataURL));
    document.getElementById("preview-portfolio").innerHTML = fotosPortfolioData
      .map((src) => `<img src="${src}" alt="Prévia do portfólio" />`)
      .join("");
  });

  // Serviços dinâmicos
  const listaServicos = document.getElementById("servicos-lista");
  document.getElementById("add-service").addEventListener("click", () => {
    const linha = document.createElement("div");
    linha.className = "service-input-row";
    linha.innerHTML = `
      <input type="text" placeholder="Nome do serviço" class="serv-nome" required />
      <input type="number" placeholder="R$" min="0" class="serv-preco" required />
      <button type="button" class="remove-service" aria-label="Remover">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>`;
    listaServicos.appendChild(linha);
  });
  listaServicos.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-service");
    if (!btn) return;
    if (listaServicos.children.length > 1) btn.closest(".service-input-row").remove();
  });

  const FOTO_PADRAO = "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarEtapaAtual()) return;

    const nomes = [...listaServicos.querySelectorAll(".serv-nome")].map((i) => i.value.trim());
    const precos = [...listaServicos.querySelectorAll(".serv-preco")].map((i) => Number(i.value) || 0);
    const servicos = nomes
      .map((nome, i) => ({ nome, preco: precos[i] }))
      .filter((s) => s.nome && s.preco > 0);

    if (servicos.length === 0) {
      alert("Adicione ao menos um serviço com nome e preço.");
      return;
    }

    const whatsappNumeros = form.whatsapp.value.replace(/\D/g, "");
    const id = "u" + Date.now();

    const novoProfissional = {
      id,
      nome: form.nome.value.trim(),
      categoria: form.categoria.value,
      cidade: form.cidade.value.trim(),
      foto: fotoPerfilData || FOTO_PADRAO,
      capa: fotosPortfolioData[0] || FOTO_PADRAO,
      nota: 5.0,
      avaliacoes: 0,
      whatsapp: "55" + whatsappNumeros,
      bio: document.getElementById("bio").value.trim(),
      servicos,
      portfolio: fotosPortfolioData.length ? fotosPortfolioData : [FOTO_PADRAO],
      depoimentos: [],
    };

    salvarProfissional(novoProfissional);
    irParaEtapa(4);
    document.getElementById("btn-ver-perfil").href = `perfil.html?id=${id}`;
  });
})();
