# 🏗️ Mecânica Poli - Simulador de Estruturas (PEF-3208)

Este é um projeto web interativo desenvolvido para auxiliar estudantes da **Escola Politécnica da USP** na disciplina de **PEF-3208 (Fundamentos de Mecânica das Estruturas)**. A ferramenta combina teoria e prática, oferecendo um glossário visual de conceitos e um simulador robusto para análise de vigas isostáticas.

---

## 🚀 Funcionalidades

### 📚 Glossário Interativo
* **Busca em Tempo Real:** Filtre conceitos instantaneamente enquanto digita.
* **Filtros por Categoria:** Navegue entre as categorias de Tensões, Esforços, Geometria e Estabilidade.
* **Detalhamento em Modais:** Clique nos cards para visualizar definições técnicas, explicações simplificadas e fórmulas renderizadas.

### 🧮 Simulador Estrutural Pro
* **Tipos de Viga:** Alternância entre viga **Biapoiada** (Apoios Fixo e Móvel) e viga em **Balanço** (Engaste).
* **Múltiplas Cargas:** Adicione quantas forças pontuais desejar ao longo da viga.
* **Direcionalidade (X e Y):** Suporte para cargas verticais (flexão e cisalhamento) e horizontais (reação axial).
* **Gráficos Dinâmicos:** Geração em tempo real dos diagramas de:
  * **Esforço Cortante (V)**
  * **Momento Fletor (M)** (Eixo invertido seguindo a norma de engenharia civil).
* **Resumo de Reações:** Cálculo imediato das reações de apoio ($R_{ay}$, $R_{by}$, $R_{ax}$) e momentos de engaste.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza tecnologias modernas de front-end para garantir performance e um design responsivo:

* **HTML5 & CSS3:** Estruturação e animações personalizadas.
* **Tailwind CSS:** Framework utilitário para design ágil e profissional.
* **JavaScript (ES6+):** Motor de cálculo estrutural e manipulação do DOM.
* **[Chart.js](https://www.chartjs.org/):** Biblioteca para renderização dos diagramas de esforços.
* **[MathJax](https://www.mathjax.org/):** Motor para exibição de fórmulas matemáticas em LaTeX.

---

## 📂 Estrutura de Arquivos

```text
projeto-mecanica/
├── index.html      # Estrutura principal e interface do usuário
├── style.css       # Estilizações, animações e filtros
├── script.js       # Banco de dados e lógica de cálculo
└── img/            # Pasta com as ilustrações técnicas (.png/.jpg)
```

---

## 📐 Notas de Engenharia

O projeto utiliza tecnologias modernas de front-end para garantir performance e um design responsivo:

* **Convenção de Sinais:** O diagrama de Momento Fletor é desenhado com as fibras tracionadas para baixo (eixo positivo para baixo), padrão adotado na Engenharia Civil brasileira.
* **Isostaticidade:** O simulador resolve estruturas isostáticas utilizando as equações fundamentais da estática 2D ($\sum F_x = 0, \sum F_y = 0, \sum M = 0$).
* **Apoios:** Na viga biapoiada, assume-se o Apoio A como fixo (2º gênero) e o Apoio B como móvel (1º gênero).

---

## 💻 Como Executar

1.Certifique-se de que todos os arquivos (index.html, style.css, script.js) estão na mesma pasta.

2.Garanta que suas imagens técnicas estão dentro de uma pasta chamada img/.

3.Abra o arquivo index.html em qualquer navegador moderno (Chrome, Edge ou Firefox).

Dica: Para desenvolvimento, recomenda-se o uso da extensão Live Server no VS Code para atualização automática.

---