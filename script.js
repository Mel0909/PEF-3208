/*Dados do Glossário*/

const GLOSSARIO = [
    {
        "term": "Esforços Solicitantes",
        "definition": "Forças internas (normal, cortante e momento fletor) que atuam em uma seção transversal devido a ações externas.",
        "description": "Imagine os 'sentimentos' da viga: a forma como ela se aperta ou estica internamente para não quebrar sob peso.",
        "image": "img/esforco-solicitante.png",
        "category": "Esforços"
    },
    {
        "term": "Momento Fletor",
        "definition": "Esforço que expressa a tendência de uma peça se curvar sob cargas transversais.",
        "description": "Sabe quando você dobra uma régua? Esse esforço que faz a curva é o momento fletor.",
        "image": "img/momento-fletor.png",
        "formula": "M = F \\cdot d",
        "category": "Esforços"
    },
    {
        "term": "Reações de Apoio",
        "definition": "Forças exercidas pelos vínculos para garantir o equilíbrio estático da estrutura.",
        "description": "Se o telhado empurra a parede para baixo, a parede empurra o telhado para cima para nada cair.",
        "image": "img/reacao-apoio.png",
        "category": "Esforços"
    },
    {
        "term": "Tensão Normal (σ)",
        "definition": "Distribuição de força interna perpendicular à seção transversal.",
        "description": "Como a força de esmagar ou esticar se espalha pela área do material.",
        "image": "img/tensao-normal.png",
        "formula": "\\sigma = \\frac{F}{A}",
        "category": "Tensões"
    },
    {
        "term": "Tensão de Cisalhamento (τ)",
        "definition": "Tensão que atua paralelamente à face, tendendo a fazer as partes deslizarem.",
        "description": "O efeito 'tesoura': quando as fibras do material tentam escorregar uma sobre a outra.",
        "image": "img/tensao-cisalhamento.png",
        "formula": "\\tau = \\frac{V}{A}",
        "category": "Tensões"
    },
    {
        "term": "Lei de Hooke",
        "definition": "Relação linear entre tensão e deformação em regime elástico.",
        "description": "O material é como uma mola: ele estica e volta ao normal, desde que você não force demais.",
        "image": "img/lei-hooke.png",
        "formula": "\\sigma = E \\cdot \\epsilon",
        "category": "Tensões"
    },
    {
        "term": "Flambagem",
        "definition": "Instabilidade elástica em elementos esbeltos sob compressão axial.",
        "description": "Pense num espaguete em pé: se você apertar o topo, ele 'pula' para o lado antes de quebrar.",
        "image": "img/flambagem.png",
        "category": "Estabilidade"
    },
    {
        "term": "Seção Transversal",
        "definition": "Corte perpendicular ao eixo longitudinal que define as propriedades da peça.",
        "description": "Se você cortasse uma viga como uma fatia de pão, o formato dessa fatia é a seção transversal.",
        "image": "img/secao-transversal.png",
        "category": "Geometria"
    },
    {
        "term": "Treliça Isostática",
        "definition": "Estrutura de barras articuladas onde as equações de equilíbrio bastam para o cálculo.",
        "description": "Aquelas pontes de ferro feitas de triângulos. O triângulo é a forma mais estável da engenharia.",
        "image": "img/trelica-isostatica.png",
        "category": "Esforços"
    },
    {
        "term": "Tensão Admissível",
        "definition": "Limite máximo de tensão permitido para garantir a segurança.",
        "description": "É a margem de erro. Se o material aguenta 100, deixamos ele chegar em 60 por segurança.",
        "image": "img/tensao-admissivel.png",
        "formula": "\\sigma_{adm} = \\frac{\\sigma_{escoamento}}{FS}",
        "category": "Tensões"
    },
    {
        "term": "Momento de Inércia (I)",
        "definition": "Resistência de uma seção transversal à flexão em relação a um eixo.",
        "description": "É mais difícil dobrar uma régua 'em pé' do que 'deitada'. A geometria muda a rigidez.",
        "image": "img/momento-inercia.png",
        "formula": "I = \\int y^2 dA",
        "category": "Geometria"
    },
    {
        "term": "Deformação Axial (ε)",
        "definition": "Variação do comprimento por unidade de comprimento original.",
        "description": "A porcentagem que o material esticou ou encolheu em relação ao tamanho inicial.",
        "image": "img/deformacao-axial.png",
        "formula": "\\epsilon = \\frac{\\Delta L}{L_0}",
        "category": "Tensões"
    },
    {
        "term": "Distorção (γ)",
        "definition": "Deformação angular causada por tensões de cisalhamento.",
        "description": "Pense num bloco de gelatina que entorta para o lado quando você empurra o topo.",
        "image": "img/distorcao.png",
        "category": "Tensões"
    },
    {
        "term": "Flexão Normal Simples",
        "definition": "Estado onde atuam apenas momentos fletores, sem esforço normal.",
        "description": "Uma viga que está apenas dobrando, como uma prateleira de livros.",
        "image": "img/flexao-normal-simples.png",
        "category": "Tensões"
    },
    {
        "term": "Flexão Normal Composta",
        "definition": "Ocorrência simultânea de momento fletor e esforço normal.",
        "description": "Quando a estrutura está sendo dobrada e esmagada ao mesmo tempo.",
        "image": "img/flexao-normal-composta.png",
        "category": "Tensões"
    }
];

let loads = [];
let chartV = null, chartM = null;
let currentCategory = 'Todos';

/* --- NAVEGAÇÃO --- */
function showSection(id) {
    document.getElementById('glossario').classList.toggle('hidden', id !== 'glossario');
    document.getElementById('simulador').classList.toggle('hidden', id !== 'simulador');
    if (id === 'simulador') calculateAll();
}

/* --- SIMULADOR: CARGAS E CÁLCULOS --- */
function addLoad() {
    const p = parseFloat(document.getElementById('load-p').value);
    const a = parseFloat(document.getElementById('load-a').value);
    const dir = document.getElementById('load-dir').value;
    const L = parseFloat(document.getElementById('beam-L').value);
    if (isNaN(p) || isNaN(a) || a < 0 || a > L) return;
    loads.push({ id: Date.now(), p, a, dir });
    loads.sort((a, b) => a.a - b.a); // Fundamental para equações por trechos
    updateLoadList();
    calculateAll();
}

function resetSim() { loads = []; updateLoadList(); calculateAll(); }
function removeLoad(id) { loads = loads.filter(l => l.id !== id); calculateAll(); updateLoadList(); }

function updateLoadList() {
    document.getElementById('load-list').innerHTML = loads.map(l => `
        <div class="flex justify-between items-center bg-white p-2 border-l-4 border-blue-500 rounded shadow-sm mb-2 text-xs">
            <span><b>${l.p}kN</b> em ${l.a}m (${l.dir.toUpperCase()})</span>
            <button onclick="removeLoad(${l.id})" class="text-red-500 font-bold px-2">✕</button>
        </div>`).join('');
}

function calculateAll() {
    const L = parseFloat(document.getElementById('beam-L').value);
    const type = document.getElementById('beam-type').value;
    
    let Ra_y = 0, Rb_y = 0, Ma = 0, Ra_x = 0;
    
    // 1. Reações
    loads.forEach(l => {
        if (l.dir === 'y') {
            if (type === 'biapoiada') {
                let rb = (l.p * l.a) / L;
                Rb_y += rb; Ra_y += (l.p - rb);
            } else { Ra_y += l.p; Ma += (l.p * l.a); }
        } else { Ra_x += l.p; }
    });

    // 2. Gráficos
    let labels = [], dataV = [], dataM = [];
    for (let i = 0; i <= 100; i++) {
        let x = (i * L) / 100;
        labels.push(x.toFixed(2));
        let Vx = Ra_y, Mx = (type === 'balanco') ? -Ma + (Ra_y * x) : Ra_y * x;
        loads.filter(l => l.dir === 'y').forEach(l => {
            if (x >= l.a) { Vx -= l.p; Mx -= l.p * (x - l.a); }
        });
        dataV.push(Vx.toFixed(2));
        dataM.push(Mx.toFixed(2));
    }

    renderCharts(labels, dataV, dataM);
    renderSummary(Ra_y, Rb_y, Ma, Ra_x, type);
    generatePiecewiseEquations(Ra_y, Ma, L, type);
}

/* --- GERAÇÃO DE EQUAÇÃO POR TRECHOS (O QUE VOCÊ PEDIU) --- */
function generatePiecewiseEquations(ra, ma, L, type) {
    // Pegamos as posições únicas onde há cargas Y para definir os trechos
    const stops = [0, ...new Set(loads.filter(l => l.dir === 'y').map(l => l.a)), L].sort((a,b) => a - b);
    
    let vPieces = [], mPieces = [];

    for (let i = 0; i < stops.length - 1; i++) {
        let xStart = stops[i];
        let xEnd = stops[i+1];
        let mid = (xStart + xEnd) / 2;

        // Calcular valor de V e M no meio do trecho para montar a string
        let currentV = ra;
        let currentM = (type === 'balanco') ? `- ${ma.toFixed(2)} + ${ra.toFixed(2)}x` : `${ra.toFixed(2)}x`;
        
        let mTerms = (type === 'balanco') ? [-ma, ra] : [0, ra]; // [constante, termo_em_x]

        loads.filter(l => l.dir === 'y').forEach(l => {
            if (mid >= l.a) {
                currentV -= l.p;
                mTerms[0] += (l.p * l.a);
                mTerms[1] -= l.p;
            }
        });

        // Formatação das strings LaTeX
        let interval = `${xStart.toFixed(1)} \\le x < ${xEnd.toFixed(1)}`;
        if (i === stops.length - 2) interval = `${xStart.toFixed(1)} \\le x \\le ${xEnd.toFixed(1)}`;

        vPieces.push(`${currentV.toFixed(2)}, & \\text{se } ${interval}`);
        
        let mStr = `${mTerms[0].toFixed(2)} ${mTerms[1] >= 0 ? '+' : ''} ${mTerms[1].toFixed(2)}x`;
        mPieces.push(`${mStr}, & \\text{se } ${interval}`);
    }

    document.getElementById('equation-v').innerHTML = `$$ V(x) = \\begin{cases} ${vPieces.join('\\\\')} \\end{cases} $$`;
    document.getElementById('equation-m').innerHTML = `$$ M(x) = \\begin{cases} ${mPieces.join('\\\\')} \\end{cases} $$`;
    
    if (window.MathJax) MathJax.typesetPromise();
}

/* --- RENDERIZAÇÃO --- */
function renderCharts(labels, v, m) {
    if (chartV) chartV.destroy(); if (chartM) chartM.destroy();
    const config = (ctx, label, data, color, rev) => new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: color + '22', fill: true, tension: 0, pointRadius: 0 }] },
        options: { scales: { y: { reverse: rev } }, plugins: { legend: { display: false } } }
    });
    chartV = config(document.getElementById('chartV'), 'V', v, '#3b82f6', false);
    chartM = config(document.getElementById('chartM'), 'M', m, '#ef4444', true);
}

function renderSummary(ray, rby, ma, rax, type) {
    document.getElementById('result-summary').innerHTML = `
        <div><p class="text-[10px] opacity-50 uppercase">Ra (Y)</p><p class="text-xl font-bold">${ray.toFixed(2)}kN</p></div>
        <div><p class="text-[10px] opacity-50 uppercase">${type==='balanco'?'M. Engaste':'Rb (Y)'}</p><p class="text-xl font-bold">${type==='balanco'?ma.toFixed(2)+'kNm':rby.toFixed(2)+'kN'}</p></div>
        <div><p class="text-[10px] opacity-50 uppercase">Reação (X)</p><p class="text-xl font-bold">${rax.toFixed(2)}kN</p></div>`;
}

// Inicializar Glossário
window.onload = () => {
    const cats = ['Todos', ...new Set(GLOSSARIO.map(i => i.category))];
    document.getElementById('category-filters').innerHTML = cats.map(c => `<button onclick="setCategory('${c}')" class="filter-btn ${c==='Todos'?'active-filter':''}">${c}</button>`).join('');
    renderGrid(GLOSSARIO);
};

function renderGrid(items) {
    document.getElementById('grid-glossario').innerHTML = items.map(item => `
        <div onclick="openModal(${GLOSSARIO.indexOf(item)})" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm cursor-pointer flex flex-col items-center">
            <img src="${item.image}" class="h-24 mb-4 object-contain">
            <h3 class="font-bold text-gray-800">${item.term}</h3>
        </div>`).join('');
}
function setCategory(cat) { currentCategory = cat; document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active-filter', btn.innerText === cat)); filterContent(); }
function openModal(idx) { 
    const item = GLOSSARIO[idx];
    document.getElementById('modal-content').innerHTML = `
        <h2 class="text-3xl font-black text-blue-900">${item.term}</h2>
        <p class="mt-4 text-gray-700">${item.definition}</p>
        <div class="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 italic text-blue-900">💡 ${item.description}</div>`;
    document.getElementById('modal-container').classList.remove('hidden');
}
function closeModal() { document.getElementById('modal-container').classList.add('hidden'); }