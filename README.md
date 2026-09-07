# BeautyConnect

Plataforma que conecta clientes a profissionais de beleza (maquiagem, manicure, sobrancelhas, cílios e cabeleireiros) na sua região.

## Estrutura do projeto

```
beautyconnect/
├── index.html          # Landing page: hero, busca, categorias e grid de profissionais
├── perfil.html         # Perfil público de um profissional
├── cadastro.html       # Cadastro de novos profissionais (formulário em 3 etapas)
├── css/
│   └── style.css       # Design system completo (cores, tipografia, componentes)
└── js/
    ├── data.js         # Dados de exemplo + camada de persistência (localStorage)
    ├── main.js         # Busca e filtros da landing page
    ├── perfil.js       # Renderização da página de perfil
    └── cadastro.js     # Lógica do formulário de cadastro (upload de fotos, etapas)
```

Sem frameworks: HTML, CSS e JavaScript puro, para ficar simples de evoluir depois (ex: trocar `data.js` por chamadas reais a uma API/backend).

## Como publicar no GitHub Pages

1. Copie todos os arquivos desta pasta para a raiz do seu repositório `pedrolino07.github.io` (ou para uma pasta `/docs`, ajustando as configurações do Pages).
2. Faça commit e push:
   ```
   git add .
   git commit -m "Novo design BeautyConnect"
   git push
   ```
3. Em alguns minutos o site estará no ar em `https://pedrolino07.github.io/`.

## Como os dados funcionam por enquanto

Como ainda não há backend, os profissionais cadastrados em `cadastro.html` são salvos no `localStorage` do navegador de quem preencheu o formulário, e somados a uma lista de profissionais de exemplo (em `js/data.js`) só para a plataforma não nascer vazia.

Isso significa que:
- Um cadastro feito em um navegador só aparece **nesse mesmo navegador** (não é compartilhado entre visitantes).
- Para virar um produto real, com profissionais visíveis para todo mundo, o próximo passo é trocar `data.js` por chamadas a um backend (ex: Supabase, Firebase, ou uma API própria) — a estrutura de dados já está pronta para isso.

## Próximos passos sugeridos

- Conectar um backend real (Supabase é o caminho mais rápido: autenticação + banco de dados + storage de imagens).
- Autenticação de profissionais (login/senha ou e-mail).
- Envio das fotos para um storage real, em vez de base64 no localStorage.
- Página de avaliação para clientes avaliarem depois do atendimento.
- Geolocalização real (hoje a busca por cidade é apenas por texto).
