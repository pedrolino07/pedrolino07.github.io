(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = id ? buscarProfissionalPorId(id) : null;
  const root = document.getElementById("perfil-conteudo");

  if (!p) {
    root.innerHTML = `
      <div class="container" style="padding:100px 0;text-align:center;">
        <h1 style="margin-bottom:14px;">Profissional não encontrado</h1>
        <p style="color:var(--ink-70);margin-bottom:24px;">O perfil que você procura não existe ou foi removido.</p>
        <a href="index.html" class="btn btn-primary">Voltar para a busca</a>
      </div>`;
    return;
  }

  function estrelasGrandes(nota) {
    return `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.6l-5.9 3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`;
  }

  const precoMin = Math.min(...p.servicos.map((s) => s.preco));
  const linkWhats = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(
    `Olá, ${p.nome}! Vi seu perfil no BeautyConnect e gostaria de saber mais sobre seus serviços.`
  )}`;

  root.innerHTML = `
    <div class="pro-hero">
      <img src="${p.capa}" alt="Trabalho de ${p.nome}" />
    </div>

    <div class="pro-header">
      <div class="pro-avatar"><img src="${p.foto}" alt="${p.nome}" /></div>
      <div class="pro-header-info">
        <h1>${p.nome}</h1>
        <div class="pro-header-meta">
          <span>${p.cidade}</span>
          <span class="pro-rating">${estrelasGrandes(p.nota)} ${p.nota.toFixed(1)} <span>(${p.avaliacoes} avaliações)</span></span>
          <span class="pro-tag" style="position:static;background:var(--pink-tint);color:var(--pink-dark);">${categoriaLabel(p.categoria)}</span>
        </div>
      </div>
      <div class="pro-header-actions">
        <a href="${linkWhats}" target="_blank" rel="noopener" class="btn btn-whatsapp">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.3.1-.2 0-.4 0-.5s-.6-1.5-.8-2-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2a8 8 0 0 0 2.9.8c.5 0 1.5-.2 1.7-1a1.8 1.8 0 0 0 .1-1c-.1-.1-.3-.2-.5-.3Z"/></svg>
          Chamar no WhatsApp
        </a>
      </div>
    </div>

    <div class="pro-layout">
      <div>
        <div class="pro-section">
          <h2>Sobre</h2>
          <p class="bio-text">${p.bio}</p>
        </div>

        <div class="pro-section">
          <h2>Portfólio</h2>
          <div class="portfolio-grid">
            ${p.portfolio.map((img) => `<img src="${img}" alt="Trabalho realizado por ${p.nome}" loading="lazy" />`).join("")}
          </div>
        </div>

        <div class="pro-section">
          <h2>Avaliações</h2>
          ${
            p.depoimentos.length
              ? p.depoimentos
                  .map(
                    (d) => `
              <div class="review-card">
                <div class="review-head">
                  <strong>${d.autor}</strong>
                  <span class="pro-rating">${estrelasGrandes(d.nota)} ${d.nota.toFixed(1)}</span>
                </div>
                <p>${d.texto}</p>
              </div>`
                  )
                  .join("")
              : `<p style="color:var(--ink-45);">Ainda não há avaliações para este perfil.</p>`
          }
        </div>
      </div>

      <aside class="booking-card">
        <div class="booking-price">
          <strong>R$ ${precoMin}</strong>
          <span>a partir de</span>
        </div>
        <div class="pro-rating">${estrelasGrandes(p.nota)} ${p.nota.toFixed(1)} <span>(${p.avaliacoes} avaliações)</span></div>

        <div class="service-list">
          ${p.servicos
            .map(
              (s) => `
            <div class="service-row">
              <span>${s.nome}</span>
              <span class="service-price">R$ ${s.preco}</span>
            </div>`
            )
            .join("")}
        </div>

        <a href="${linkWhats}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">
          Solicitar orçamento
        </a>
        <p class="booking-note">Você fala direto com ${p.nome.split(" ")[0]}, sem taxas extras.</p>
      </aside>
    </div>
  `;

  document.title = `${p.nome} — ${categoriaLabel(p.categoria)} em ${p.cidade} | BeautyConnect`;
})();
