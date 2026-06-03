/* ==========================================================================
   1. BANCO DE DADOS DO GLOSSÁRIO
   ========================================================================== */
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

/* ==========================================================================
   2. ESTADOS GLOBAIS E NAVEGAÇÃO
   ========================================================================== */
let currentCategory = 'Todos';
let loads = [];
let currentLoadType = 'point';
let chartV = null;
let chartM = null;

function showSection(id) {
    document.getElementById('glossario').classList.toggle('hidden', id !== 'glossario');
    document.getElementById('simulador').classList.toggle('hidden', id !== 'simulador');
    if (id === 'simulador') calculateAll();
}

/* ==========================================================================
   3. LÓGICA DO GLOSSÁRIO
   ========================================================================== */
function renderGrid(items) {
    const grid = document.getElementById('grid-glossario');
    grid.innerHTML = items.map(item => `
        <div onclick="openModal(${GLOSSARIO.indexOf(item)})" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl cursor-pointer flex flex-col items-center text-center group transition-all duration-300">
            <img src="${item.image}" class="h-44 w-full object-contain mb-4 group-hover:scale-105 transition-transform" alt="${item.term}">
            <span class="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">${item.category}</span>
            <h3 class="text-xl font-bold text-gray-800 mb-2">${item.term}</h3>
            <p class="text-gray-500 text-sm line-clamp-2">${item.definition}</p>
            <span class="mt-4 text-blue-600 font-bold text-xs uppercase tracking-wider">Clique para ver detalhes →</span>
        </div>
    `).join('');
}

function filterContent() {
    const search = document.getElementById('search-input').value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const filtered = GLOSSARIO.filter(item => {
        const matchesCat = (currentCategory === 'Todos' || item.category === currentCategory);
        const text = (item.term + item.definition).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return matchesCat && text.includes(search);
    });
    renderGrid(filtered);
}

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active-filter', btn.innerText === cat));
    filterContent();
}

/* ==========================================================================
   4. LÓGICA DO MODAL (Pop-up de Detalhes)
   ========================================================================== */
function openModal(idx) {
    const item = GLOSSARIO[idx];
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8 items-center">
            <img src="${item.image}" class="w-full h-96 object-contain bg-gray-50 rounded-2xl p-4 shadow-inner">
            <div>
                <span class="text-blue-600 font-bold uppercase text-xs tracking-widest">${item.category}</span>
                <h2 class="text-3xl font-black text-blue-900 mb-4">${item.term}</h2>
                <p class="text-gray-700 mb-4"><strong>Definição Técnica:</strong> ${item.definition}</p>
                <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 italic text-blue-900">💡 ${item.description}</div>
            </div>
        </div>
        ${item.formula ? `<div class="mt-8 p-6 bg-gray-900 text-white rounded-2xl text-center shadow-xl">
            <p class="text-[10px] opacity-50 mb-2 uppercase tracking-widest">Expressão Matemática</p>
            <div class="text-3xl font-serif">$$ ${item.formula} $$</div>
        </div>` : ''}
    `;
    document.getElementById('modal-container').classList.remove('hidden');
    setTimeout(() => document.getElementById('modal-box').classList.remove('scale-95'), 10);
    if (window.MathJax) MathJax.typesetPromise();
}

function closeModal() {
    document.getElementById('modal-box').classList.add('scale-95');
    setTimeout(() => document.getElementById('modal-container').classList.add('hidden'), 150);
}

/* ==========================================================================
   5. LÓGICA DO SIMULADOR (Gerenciamento de Cargas e Inputs)
   ========================================================================== */
function setLoadType(type) {
    currentLoadType = type;
    document.getElementById('form-point').classList.toggle('hidden', type !== 'point');
    document.getElementById('form-dist').classList.toggle('hidden', type !== 'dist');
    
    document.getElementById('btn-point').className = type === 'point' ? 'flex-1 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold' : 'flex-1 py-1 bg-gray-200 text-gray-600 rounded-lg text-xs font-bold';
    document.getElementById('btn-dist').className = type === 'dist' ? 'flex-1 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold' : 'flex-1 py-1 bg-gray-200 text-gray-600 rounded-lg text-xs font-bold';
}

function addLoad() {
    const L = parseFloat(document.getElementById('beam-L').value);
    
    if (currentLoadType === 'point') {
        const p = parseFloat(document.getElementById('load-p').value);
        const a = parseFloat(document.getElementById('load-a').value);
        const dir = document.getElementById('load-dir').value;
        
        if (isNaN(p) || isNaN(a) || a < 0 || a > L) {
            alert("Preencha os campos da carga pontual corretamente.");
            return;
        }
        loads.push({ type: 'point', p, a, dir, id: Date.now() });
    } else {
        const q1 = parseFloat(document.getElementById('q1').value);
        const q2 = parseFloat(document.getElementById('q2').value);
        const x1 = parseFloat(document.getElementById('x1').value);
        const x2 = parseFloat(document.getElementById('x2').value);
        
        if (isNaN(q1) || isNaN(q2) || isNaN(x1) || isNaN(x2) || x1 < 0 || x2 > L || x1 >= x2) {
            alert("Preencha todos os campos da carga distribuída corretamente (Início deve ser menor que Fim).");
            return;
        }
        loads.push({ type: 'dist', q1, q2, x1, x2, id: Date.now() });
    }
    
    loads.sort((a, b) => (a.a !== undefined ? a.a : a.x1) - (b.a !== undefined ? b.a : b.x1));
    updateLoadList();
    calculateAll();
}

function resetSim() {
    loads = [];
    document.getElementById('load-p').value = '';
    document.getElementById('load-a').value = '';
    updateLoadList();
    calculateAll();
}

function removeLoad(id) {
    loads = loads.filter(l => l.id !== id);
    updateLoadList();
    calculateAll();
}

function updateLoadList() {
    const list = document.getElementById('load-list');
    list.innerHTML = loads.map(l => `
        <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm mb-2 text-xs">
            <span>${l.type === 'point' ? `<b>${l.p} kN</b> em ${l.a}m (${l.dir.toUpperCase()})` : `<b>${l.q1}-${l.q2} kN/m</b> de ${l.x1} a ${l.x2}m`}</span>
            <button onclick="removeLoad(${l.id})" class="text-red-500 font-bold px-2 hover:text-red-700">✕</button>
        </div>
    `).join('');
}

/* ==========================================================================
   6. MOTOR DE CÁLCULO E FÍSICA ESTRUTURAL
   ========================================================================== */
function calculateAll() {
    const L = parseFloat(document.getElementById('beam-L').value);
    const type = document.getElementById('beam-type').value;
    let labels = [], dataV = [], dataM = [];
    let steps = 100;

    let Ra_y = 0, Rb_y = 0, Ma = 0, Ra_x = 0;
    
    loads.forEach(l => {
        if (l.type === 'point') {
            if (l.dir === 'x') {
                Ra_x -= l.p; 
            } else {
                if (type === 'biapoiada') {
                    let rb = -(l.p * l.a) / L;
                    Rb_y += rb;
                    Ra_y += (-l.p - rb);
                } else { 
                    Ra_y -= l.p; 
                    Ma -= (l.p * l.a); 
                }
            }
        } else {
            const len = l.x2 - l.x1;
            const totalQ = 0.5 * (l.q1 + l.q2) * len; 
            
            let centroidRel = Math.abs(l.q1 + l.q2) > 0.001 ? (len * (l.q1 + 2 * l.q2)) / (3 * (l.q1 + l.q2)) : len / 2;
            const globalCentroid = l.x1 + centroidRel;

            if (type === 'biapoiada') {
                let rb = -(totalQ * globalCentroid) / L;
                Rb_y += rb; Ra_y += (-totalQ - rb);
            } else { 
                Ra_y -= totalQ; 
                Ma -= (totalQ * globalCentroid); 
            }
        }
    });

    for (let i = 0; i <= steps; i++) {
        let x = (i * L) / steps;
        labels.push(x.toFixed(2));
        
        let Vx = Ra_y;
        let Mx = (type === 'balanco') ? -Ma + (Ra_y * x) : Ra_y * x;

        loads.forEach(l => {
            if (l.type === 'point' && l.dir === 'y' && x >= l.a) {
                Vx += l.p; 
                Mx += l.p * (x - l.a);
            } else if (l.type === 'dist' && x >= l.x1) {
                let lenTotal = l.x2 - l.x1;
                let m = (l.q2 - l.q1) / lenTotal;

                if (x <= l.x2) {
                    let dx = x - l.x1;
                    let q_x = l.q1 + m * dx;
                    let resultanteLocal = 0.5 * (l.q1 + q_x) * dx;
                    let centroideLocal = l.x1 + (dx * (l.q1 + 2 * q_x)) / (3 * (l.q1 + q_x));
                    if (isNaN(centroideLocal)) centroideLocal = l.x1 + dx/2;

                    Vx += resultanteLocal;
                    Mx += resultanteLocal * (x - centroideLocal);
                } else {
                    let totalQ = 0.5 * (l.q1 + l.q2) * lenTotal;
                    let centroidRel = (lenTotal * (l.q1 + 2 * l.q2)) / (3 * (l.q1 + l.q2));
                    if (isNaN(centroidRel)) centroidRel = lenTotal / 2;
                    let globalCentroid = l.x1 + centroidRel;

                    Vx += totalQ;
                    Mx += totalQ * (x - globalCentroid);
                }
            }
        });
        dataV.push(Vx.toFixed(2));
        dataM.push(Mx.toFixed(2));
    }

    renderCharts(labels, dataV, dataM);
    renderSummary(Ra_y, Rb_y, Ma, Ra_x, type);
    generatePiecewiseEquations(Ra_y, Ma, L, type);
}

/* ==========================================================================
   7. GERADOR DE EQUAÇÕES POR TRECHOS
   ========================================================================== */
function generatePiecewiseEquations(ra, ma, L, type) {
    const stops = [0, ...new Set(loads.flatMap(l => l.type === 'point' ? (l.dir === 'y' ? [l.a] : []) : [l.x1, l.x2])), L].sort((a,b) => a - b);
    let vPieces = [], mPieces = [];

    const formatPoly = (coeffs) => {
        let terms = [];
        for (let d = coeffs.length - 1; d >= 0; d--) {
            let val = coeffs[d];
            if (Math.abs(val) < 0.005) continue;
            let str = terms.length > 0 ? (val > 0 ? " + " : " - ") : (val < 0 ? "-" : "");
            let absVal = Math.abs(val).toFixed(2).replace(/\.00$/, '');
            if (d === 0) str += absVal;
            else if (d === 1) str += (absVal === "1" ? "" : absVal) + "x";
            else str += (absVal === "1" ? "" : absVal) + `x^${d}`;
            terms.push(str);
        }
        return terms.length === 0 ? "0" : terms.join("");
    };

    for (let i = 0; i < stops.length - 1; i++) {
        let x1 = stops[i], x2 = stops[i+1], mid = (x1 + x2) / 2;
        
        let vCoeffs = [ra, 0, 0];
        let mCoeffs = type === 'balanco' ? [-ma, ra, 0, 0] : [0, ra, 0, 0];

        loads.forEach(l => {
            if (l.type === 'point' && l.dir === 'y' && mid >= l.a) {
                vCoeffs[0] += l.p;
                mCoeffs[0] -= (l.p * l.a);
                mCoeffs[1] += l.p;
            } else if (l.type === 'dist' && mid >= l.x1) {
                let lenTotal = l.x2 - l.x1;
                let m = (l.q2 - l.q1) / lenTotal;

                if (mid >= l.x2) {
                    let totalQ = 0.5 * (l.q1 + l.q2) * lenTotal;
                    let centroidRel = (lenTotal * (l.q1 + 2 * l.q2)) / (3 * (l.q1 + l.q2));
                    if (isNaN(centroidRel)) centroidRel = lenTotal / 2;
                    let Cx = l.x1 + centroidRel;
                    
                    vCoeffs[0] += totalQ;
                    mCoeffs[0] -= (totalQ * Cx);
                    mCoeffs[1] += totalQ;
                } else {
                    vCoeffs[2] += (m / 2);
                    vCoeffs[1] += (l.q1 - m * l.x1);
                    vCoeffs[0] += (0.5 * m * l.x1 * l.x1 - l.q1 * l.x1);

                    mCoeffs[3] += (m / 6);
                    mCoeffs[2] += ((l.q1 - m * l.x1) / 2);
                    mCoeffs[1] += (0.5 * m * l.x1 * l.x1 - l.q1 * l.x1);
                    mCoeffs[0] -= (l.q1 * l.x1 * l.x1 / 2 - m * l.x1 * l.x1 * l.x1 / 6);
                }
            }
        });

        let range = `${x1.toFixed(1)} \\le x < ${x2.toFixed(1)}`;
        if (i === stops.length - 2) range = `${x1.toFixed(1)} \\le x \\le ${x2.toFixed(1)}`;
        
        vPieces.push(`${formatPoly(vCoeffs)}, & \\text{se } ${range}`);
        mPieces.push(`${formatPoly(mCoeffs)}, & \\text{se } ${range}`);
    }

    const divV = document.getElementById('eq-v') || document.getElementById('equation-v');
    const divM = document.getElementById('eq-m') || document.getElementById('equation-m');

    if (divV) divV.innerHTML = `$$ V(x) = \\begin{cases} ${vPieces.join('\\\\')} \\end{cases} $$`;
    if (divM) divM.innerHTML = `$$ M(x) = \\begin{cases} ${mPieces.join('\\\\')} \\end{cases} $$`;
    if (window.MathJax) MathJax.typesetPromise();
}

function renderCharts(labels, v, m) {
    if (chartV) chartV.destroy();
    if (chartM) chartM.destroy();

    const config = (ctx, label, data, color, reverse) => new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: color + '22', fill: true, tension: 0.1, pointRadius: 0 }] },
        options: { 
            responsive: true,
            scales: { y: { reverse: reverse, grid: { color: '#f3f4f6' } } },
            plugins: { legend: { display: false } }
        }
    });

    chartV = config(document.getElementById('chartV'), 'V', v, '#3b82f6', false);
    chartM = config(document.getElementById('chartM'), 'M', m, '#ef4444', true);
}

function renderSummary(ray, rby, ma, rax, type) {
    document.getElementById('result-summary').innerHTML = `
        <div><p class="text-[10px] opacity-50 uppercase">Ra (Y)</p><p class="text-xl font-bold">${ray.toFixed(2)} kN</p></div>
        <div><p class="text-[10px] opacity-50 uppercase">${type === 'balanco' ? 'M. Engaste' : 'Rb (Y)'}</p><p class="text-xl font-bold">${type === 'balanco' ? ma.toFixed(2) + ' kNm' : rby.toFixed(2) + ' kN'}</p></div>
        <div><p class="text-[10px] opacity-50 uppercase">Reação (X)</p><p class="text-xl font-bold">${rax.toFixed(2)} kN</p></div>
    `;
}

/* ==========================================================================
   8. INICIALIZAÇÃO DO SISTEMA
   ========================================================================== */
window.onload = () => {
    currentLoadType = 'point';
    
    const cats = ['Todos', ...new Set(GLOSSARIO.map(i => i.category))];
    document.getElementById('category-filters').innerHTML = cats.map(c => 
        `<button onclick="setCategory('${c}')" class="filter-btn ${c === 'Todos' ? 'active-filter' : ''}">${c}</button>`
    ).join('');
    
    renderGrid(GLOSSARIO);
};

window.onclick = (e) => { if (e.target.id === 'modal-container') closeModal(); };