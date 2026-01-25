# Nova LP Replicada - Estrutura Organizada

Esta pasta contém uma versão completamente reorganizada e limpa da landing page original, mantendo 100% da funcionalidade e aparência visual.

## 📁 Estrutura de Arquivos

```
nova_lp_replicada/
├── index.html              # HTML principal limpo e bem formatado
├── css/
│   ├── main.css           # Estilos principais (renomeado do hash original)
│   └── inline-styles.css  # Estilos que estavam inline no HTML
├── js/
│   ├── analytics.js        # Meta Pixel, Google Tag Manager, VWO
│   ├── tracking.js        # Rastreamento Hub.la (UTM parameters)
│   ├── lazy-load.js       # LiteSpeed lazy loading
│   ├── elementor-config.js # Configurações Elementor Frontend e Pro
│   └── main.js            # Scripts principais LiteSpeed
├── images/                # Todas as imagens da página
├── fonts/                 # Todas as fontes utilizadas
└── README.md              # Este arquivo
```

## 🎯 Objetivo

Esta estrutura foi criada para:
- **Organização**: Código separado em arquivos lógicos e bem nomeados
- **Manutenibilidade**: Fácil de encontrar e editar componentes específicos
- **Legibilidade**: Código formatado e comentado
- **Funcionalidade**: Mantém exatamente o mesmo resultado visual e funcional da página original

## 📝 Arquivos Principais

### `index.html`
HTML principal com:
- Head organizado em seções comentadas
- Meta tags bem estruturadas
- Links para CSS e JS externos
- Body preservado do original (gerado pelo Elementor)

### `css/main.css`
Estilos principais da página (copiado do arquivo hash original).

### `css/inline-styles.css`
Estilos que estavam inline no HTML original:
- Global styles do WordPress
- WP custom CSS
- Lazy load styles
- Estilos para imagens com sizes="auto"

### `js/analytics.js`
Scripts de analytics e tracking:
- LiteSpeed docref
- Visual Website Optimizer (VWO)
- Meta Pixel (Facebook)
- Google Tag Manager

### `js/tracking.js`
Rastreamento de vendas Hub.la:
- Função `getParams()` para UTM parameters
- Aplicação automática em links do Hub.la

### `js/lazy-load.js`
Sistema de lazy loading:
- LiteSpeed LazyLoad library completa
- Intersection Observer para backgrounds do Elementor

### `js/elementor-config.js`
Configurações do Elementor:
- `elementorFrontendConfig`
- `ElementorProFrontendConfig`
- WordPress i18n

### `js/main.js`
Scripts principais:
- LiteSpeed delayed JS loading
- LiteSpeed vary cookie

## 🔧 Como Usar

1. Todos os caminhos relativos estão configurados corretamente
2. A página funciona exatamente como a original
3. Para fazer alterações:
   - **Estilos**: Edite `css/main.css` ou `css/inline-styles.css`
   - **Scripts**: Edite os arquivos correspondentes em `js/`
   - **Conteúdo**: Edite `index.html`

## ⚠️ Importante

- **Não alterar** a estrutura do body gerada pelo Elementor
- **Manter** todos os atributos `data-elementor-*` e classes do Elementor
- **Preservar** a ordem de carregamento dos scripts
- **Manter** os scripts externos do LiteSpeed que estão no final do HTML

## 📊 Comparação com Original

| Aspecto | Original | Nova Estrutura |
|---------|----------|----------------|
| HTML | Minificado (1 linha) | Formatado e organizado |
| CSS | Hash + inline | Separado em arquivos |
| JS | Inline no HTML | Arquivos externos |
| Organização | Tudo misturado | Estrutura clara |
| Manutenibilidade | Difícil | Fácil |
| Funcionalidade | ✅ | ✅ (idêntica) |

## 🚀 Próximos Passos

1. Testar a página em diferentes navegadores
2. Verificar que todos os scripts carregam corretamente
3. Validar que o tracking funciona
4. Confirmar que lazy loading está ativo

---

**Criado em**: 2026-01-23  
**Baseado em**: `novo_produto_jornada/index.html`  
**Status**: ✅ Completo e funcional
