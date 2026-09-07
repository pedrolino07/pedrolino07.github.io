(function () {
  const gridEl = document.getElementById("grid-pros");
  const countEl = document.getElementById("results-count");
  const pillFilters = document.getElementById("pill-filters");
  const catRow = document.getElementById("cat-row");
  const searchForm = document.getElementById("search-form");

  let estado = { cidade: "", categoria: "" };

  function estrelas(nota) {
    const cheias = Math.round(nota);
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6l-5.9 3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>
      <strong>${nota.toFixed(1)}</strong>`;
  }

  function cardProfissional(p) {
    const precoMin = Math.min(...p.servicos.map((s) => s.preco));
    return `
      <a class="pro-card" href="perfil.html?id=${p.id}">
        <div class="pro-photo">
          <img src="${p.foto}" alt="Foto de ${p.nome}" loading="lazy" />
          <span class="pro-tag">${categoriaLabel(p.categoria)}</span>
        </div>
        <div class="pro-body">
          <div class="pro-top">
            <div>
              <h3>${p.nome}</h3>
              <div class="pro-city">${p.cidade}</div>
            </div>
            <div class="pro-rating">${estrelas(p.nota)}<span>(${p.avaliacoes})</span></div>
          </div>
          <p class="pro-bio">${p.bio}</p>
          <div class="pro-foot">
            <div class="pro-price">a partir de <strong>R$ ${precoMin}</strong></div>
            <span class="btn btn-outline" style="padding:8px 16px;font-size:0.85rem;">Ver perfil</span>
          </div>
        </div>
      </a>
    `;
  }

  function renderizar() {
    const todos = carregarProfissionais();
    const filtrados = todos.filter((p) => {
      const bateCidade = !estado.cidade || p.cidade.toLowerCase().includes(estado.cidade.toLowerCase());
      const bateCategoria = !estado.categoria || p.categoria === estado.categoria;
      return bateCidade && bateCategoria;
    });

    countEl.textContent = filtrados.length;

    if (filtrados.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <h3>Nenhum profissional encontrado</h3>
          <p>Tente buscar por outra cidade ou remova o filtro de categoria.</p>
        </div>`;
      return;
    }
    gridEl.innerHTML = filtrados.map(cardProfissional).join("");
  }

  // Barra de busca principal
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    estado.cidade = document.getElementById("input-cidade").value.trim();
    estado.categoria = document.getElementById("input-categoria").value;

    // sincroniza os pills de categoria com a busca
    [...pillFilters.children].forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.cat === estado.categoria);
    });

    renderizar();
    document.getElementById("resultados").scrollIntoView({ behavior: "smooth" });
  });

  // Pills de categoria abaixo do grid
  pillFilters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    estado.categoria = btn.dataset.cat;
    document.getElementById("input-categoria").value = estado.categoria;
    [...pillFilters.children].forEach((b) => b.classList.toggle("is-active", b === btn));
    renderizar();
  });

  // Cards de categoria no topo
  catRow.addEventListener("click", (e) => {
    const card = e.target.closest(".cat-card");
    if (!card) return;
    estado.categoria = card.dataset.cat;
    document.getElementById("input-categoria").value = estado.categoria;
    [...catRow.children].forEach((c) => c.classList.toggle("is-active", c === card));
    [...pillFilters.children].forEach((b) => b.classList.toggle("is-active", b.dataset.cat === estado.categoria));
    renderizar();
    document.getElementById("resultados").scrollIntoView({ behavior: "smooth" });
  });

  // Tabs "Sou cliente / Sou profissional"
  document.querySelectorAll(".tabs button").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("is-active"));
      tabBtn.classList.add("is-active");
      const alvo = tabBtn.dataset.tab;
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === alvo);
      });
    });
  });

  renderizar();
})();
