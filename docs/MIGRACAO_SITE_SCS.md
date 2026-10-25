# Migração visual e funcional — SCS Contabilidade

**Data:** 25 de outubro de 2026  
**Última atualização de dados institucionais:** 25 de outubro de 2026  
**Referência visual:** `NOVO SITE (1).html`  
**Arquitetura mantida:** site estático (HTML/CSS/JS), deploy FTP existente

---

## 1. Implementado

### Identidade visual
- Paleta institucional: fundo claro `#f8f6f3`, vinho `#651719`, amarelo `#DDA341`
- Tipografia Aileron (CDN Fonts)
- Botões pill, cards com raio 22px, hierarquia tipográfica do HTML de referência
- Cabeçalho sticky com blur, marca SVG (anéis + traço dourado)
- Rodapé alinhado ao novo layout
- Animações de reveal (IntersectionObserver) + preferência `prefers-reduced-motion`
- Modo escuro com persistência em `localStorage` (`scs-mood`)

### Páginas (rotas reais, não SPA demo)
| URL | Arquivo |
|-----|---------|
| Home | `index.html` |
| Abrir empresa | `abrir-empresa.html` |
| Trocar de contador | `trocar-de-contador.html` |
| Sobre | `sobre.html` |
| Política de privacidade | `politica-de-privacidade.html` |

### Configuração centralizada
Arquivo `js/config.js`:
- `showTeamSection: false`
- `showTestimonials: false`
- `showEnglish: false`
- `showAppSection: false`
- WhatsApp, telefone, login, endereço, mapa, horários, CNPJ/CRC
- Métricas institucionais aprovadas (ver §3)
- Estruturas preparadas para `team` e `testimonials`

### Responsividade
Breakpoints tratados em CSS (`css/site.css`): mobile-first com ajustes em ~360/430/768/900px; tipografia e espaçamentos com `clamp()`.  
Menu hamburger acessível ≤768px.

### Seções da home
Como a SCS trabalha · Quanto custa · Troca de contador (preview) · Indicadores · Serviços · FAQ · CTA de fechamento · Mapa no rodapé.

> A seção do aplicativo SCS permanece fora da home (`showAppSection: false`). Links e assets em `js/config.js` / `images/` para reativação futura.

---

## 2. Preservado / aprovado

| Recurso | Status |
|---------|--------|
| Login VIP Acessórias | Preservado |
| WhatsApp comercial (`5541995050269`) | **Aprovado** |
| Endereço e localização (Fanny / mapa) | **Aprovado** |
| Telefone (41) 3015-9480 | **Aprovado** |
| Horário Seg–Qui 07–18 / Sex 08–17 | **Aprovado** |
| Serviços e textos comerciais | **Aprovado** |
| CNPJ / CRC | Publicados (HTML de referência) |
| Deploy FTP (workflow) | Não alterado nesta tarefa |

Arquivos Nicepage antigos permanecem no repositório para rollback, sem referência nas páginas publicáveis.

---

## 3. Indicadores institucionais (aprovados)

Publicados via `js/config.js` → `metrics` (`approved: true`):

| Valor | Rótulo |
|-------|--------|
| Mais de 30 anos | De contabilidade, desde 1995 |
| +450 | Clientes ativos |
| 15 min | Tempo médio de resposta no horário comercial |

Placeholders (`[XXX]`, “número a confirmar”, textos de “aguardar validação”) **removidos**.

---

## 4. Oculto temporariamente (ainda não aprovado)

| Seção | Flag | Observação |
|-------|------|------------|
| Equipe (fotos, nomes, cargos) | `showTeamSection: false` | Sem conteúdo autorizado |
| Depoimentos reais de clientes | `showTestimonials: false` | Sem quotes/identificação autorizada |
| Identificação de clientes para divulgação | — | Aguarda aprovação |
| Avaliações do Google | — | Sem integração/conteúdo validado |
| Botão EN | `showEnglish: false` | Tradução das páginas internas incompleta |
| Seção do aplicativo | `showAppSection: false` | Removida da UI a pedido |

---

## 5. Adaptações futuras (não bloqueiam publicação dos dados aprovados)

1. Preencher `team` / `testimonials` e ativar flags quando houver autorização.
2. Avaliações Google — só publicar com conteúdo/integração validados.
3. Inglês — só ativar `showEnglish` com tradução completa.
4. Limpeza opcional dos arquivos Nicepage legados após período de rollback.
5. Push em `main` dispara deploy FTP — fazer conscientemente.

---

## 6. Validação

| Teste | Resultado |
|-------|-----------|
| Métricas: 30 anos, +450, 15 min | OK (`approved: true`) |
| Sem `[XXX]` / “número a confirmar” | OK |
| Equipe / depoimentos / EN / Google Reviews ocultos | OK |
| WhatsApp, horários, endereço, serviços | Dados aprovados em uso |
| Design da seção de métricas | Inalterado (mesma grade/CSS) |
| Build npm | N/A — site estático sem bundler |
| Deploy | Não realizado |

---

## 7. Pendências técnicas restantes

1. **Fotos, nomes e cargos** dos profissionais (seção equipe).
2. **Depoimentos reais** e identificação de clientes para divulgação.
3. **Avaliações do Google** (conteúdo ou integração).
4. Tradução EN completa (opcional).
5. Limpeza opcional do legado Nicepage.
6. Self-host da fonte Aileron (opcional / performance).

---

## Estrutura (resumo)

```
index.html
abrir-empresa.html
trocar-de-contador.html
sobre.html
politica-de-privacidade.html
css/site.css
js/config.js
js/site.js
docs/MIGRACAO_SITE_SCS.md
```

Pré-visualizar:

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```
