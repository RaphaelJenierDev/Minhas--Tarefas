// 🛡️ PROTOCOLO DE SEGURANÇA: Chave vazia para injeção automática em tempo de execução
const apiKey = "";

// Selecionamos as variáveis globais do sistema
let button = null;
let input = null;
let listaCompleta = null;
let minhaListaDeItens = [];
let recognition = null;
let micRecognizing = false;

// Helper para atraso (delay) do Backoff Exponencial
const delay = ms => new Promise(res => setTimeout(res, ms));

// Helper resiliente para parsear JSON retornado pela IA
function safeParseJSON(text) {
    if (!text || typeof text !== 'string') return null;
    // 1) tentativa direta
    try { return JSON.parse(text); } catch (e) { /* continua */ }

    // 2) remove caracteres invisíveis comuns e tenta novamente
    try {
        const cleaned = text.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
        return JSON.parse(cleaned);
    } catch (e) { /* continua */ }

    // 3) extrai substring entre o primeiro '{' e o último '}' e tenta parsear
    try {
        const first = text.indexOf('{');
        const last = text.lastIndexOf('}');
        if (first !== -1 && last !== -1 && last > first) {
            const sub = text.substring(first, last + 1);
            return JSON.parse(sub);
        }
    } catch (e) { /* continua */ }

    // 4) falha: retorna null para que o chamador faça fallback controlado
    return null;
}

// Fetch com timeout usando AbortController para evitar bloqueios longos
async function fetchWithTimeout(resource, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const resp = await fetch(resource, { ...options, signal: controller.signal });
        clearTimeout(id);
        return resp;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

// Função robusta de requisição com Backoff Exponencial (Retenta até 5 vezes: 1s, 2s, 4s, 8s, 16s)
async function chamarGeminiComBackoff(payload) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    // Delays reduzidos para responsividade; cada tentativa usa timeout para não travar
    const temposDeEspera = [500, 1000, 2000, 4000, 8000];
    const perAttemptTimeout = 5000; // ms por tentativa

    for (let i = 0; i <= temposDeEspera.length; i++) {
        try {
            const response = await fetchWithTimeout(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }, perAttemptTimeout);

            if (response && response.ok) {
                return await response.json();
            }
        } catch (error) {
            // se for a última tentativa, propaga para o chamador tratar
            if (i === temposDeEspera.length) throw error;
            // senão, registra e continuará para nova tentativa
            console.warn(`Tentativa ${i + 1} falhou:`, error && error.name ? error.name : error);
        }

        if (i < temposDeEspera.length) {
            await delay(temposDeEspera[i]);
        }
    }
    throw new Error("Falha na comunicação com o servidor de IA após múltiplas tentativas.");
}

// --- ⏱️ LÓGICA DO RELÓGIO LED INTELIGENTE E DATA ---
function gerenciarPainelSuperior() {
    const agora = new Date();
    const hora = agora.getHours();
    
    const relogioElemento = document.getElementById('relogio');
    const saudacaoElemento = document.getElementById('saudacao');
    const dataElemento = document.getElementById('data-display');

    if (relogioElemento) {
        try {
            relogioElemento.textContent = agora.toLocaleTimeString('pt-BR');
        } catch (err) {
            let h = String(agora.getHours()).padStart(2, '0');
            let m = String(agora.getMinutes()).padStart(2, '0');
            let s = String(agora.getSeconds()).padStart(2, '0');
            relogioElemento.textContent = `${h}:${m}:${s}`;
        }
    }
    
    if (dataElemento) {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        dataElemento.textContent = `${diasSemana[agora.getDay()]}, ${String(agora.getDate()).padStart(2, '0')} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;
    }

    if (saudacaoElemento) {
        if (hora >= 5 && hora < 12) {
            saudacaoElemento.textContent = "☀️ Bom dia, Executivo!";
        } else if (hora >= 12 && hora < 18) {
            saudacaoElemento.textContent = "💡 Boa tarde, foco total!";
        } else {
            saudacaoElemento.textContent = "🌙 Boa noite, planejamento ativo!";
        }
    }
}

// --- 📝 GESTÃO DE TAREFAS VIVAS ---
function adicionarNovaTarefa() {
    if (!input || input.value.trim() === '') return; 
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    
    input.value = '';
    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';
    
    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" alt="concluir" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="eliminar" onclick="deletarItem(${posicao})">
            </li>
        `;
    });
    
    if (listaCompleta) {
        listaCompleta.innerHTML = novaLi;
    }
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));

    // Render fallback local imediato para garantir resposta rápida à UI
    try {
        const tarefasAtivas = minhaListaDeItens.filter(item => !item.concluida).map(item => item.tarefa);
        if (tarefasAtivas.length > 0) {
            renderizarPainelCompleto(gerarSugestaoLocal(tarefasAtivas));
        } else {
            renderizarPainelLocal(
                "🎯 SPRINT CONCLUÍDA",
                "Seu quadro estratégico está totalmente limpo. Use este momento de paz para planejar os próximos passos.",
                "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos. — Provérbios 16:3",
                "#00d4ff",
                "#00d4ff33"
            );
        }
    } catch (e) {
        console.warn('Erro ao renderizar fallback local:', e);
    }

    // Dispara a atualização do consultor em segundo plano (não bloqueante)
    atualizarConsultor().catch(err => console.log("IA aguardando processamento de rede."));
}

window.concluirTarefa = function(posicao) {
    if (minhaListaDeItens[posicao]) {
        minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
        mostrarTarefas();
    }
}

window.deletarItem = function(posicao) {
    if (minhaListaDeItens[posicao] !== undefined) {
        minhaListaDeItens.splice(posicao, 1);
        mostrarTarefas();
    }
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');
    if (tarefasDoLocalStorage) {
        try {
            minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
        } catch (e) {
            console.error("Erro ao carregar dados locais do utilizador:", e);
        }
    }
    mostrarTarefas();
}

// --- 🧠 MOTOR DO CONSULTOR ESTRATÉGICO ---
async function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    const tarefasAtivas = minhaListaDeItens
        .filter(item => !item.concluida)
        .map(item => item.tarefa);

    if (tarefasAtivas.length === 0) {
        renderizarPainelLocal(
            "🎯 SPRINT CONCLUÍDA", 
            "Seu quadro estratégico está totalmente limpo. Use este momento de paz para planejar os próximos passos de faturamento da Jenier Services.", 
            "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos. — Provérbios 16:3", 
            "#00d4ff", 
            "#00d4ff33"
        );
        return;
    }

    try {
        feedbackText.innerText = "Consultor vivo analisando a jornada de hoje...";

        // Prompt ultra-direcionado: foca no item atual (focoAtual) e força associação literal
        const focoAtual = Array.isArray(tarefasAtivas) && tarefasAtivas.length ? tarefasAtivas[tarefasAtivas.length - 1] : (tarefasAtivas || '');
        const promptSistema = `Você é um Consultor Estrategista de TI de alta performance e um Mentor Espiritual de Elite. Sua missão é analisar a atividade exata enviada pelo usuário: "${focoAtual}". Você DEVE mapear a palavra-chave principal dessa atividade (ex: se for comer/comida, foque em nutrição, comunhão ou energia; se for estudar/estudo, foque em sabedoria ou conhecimento; se for trabalhar/trabalho, foque em dedicação e frutos). O versículo bíblico retornado e a análise profissional DEVEM estar diretamente conectados e amarrados a esse contexto literal. É estritamente proibido trazer versículos genéricos de fé ou paciência se o assunto for específico. Responda SOMENTE com uma string JSON válida contendo as chaves: titulo, analise, versiculo. Nada mais.`;

        const payload = {
            contents: [{ parts: [{ text: `Analise a tarefa: ${focoAtual} e responda somente com um JSON contendo: titulo, analise, versiculo` }] }],
            systemInstruction: { parts: [{ text: promptSistema }] },
            generationConfig: { 
                responseMimeType: "application/json",
                temperature: 0.0,
                topP: 0.1,
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        titulo: { type: "STRING" },
                        analise: { type: "STRING" },
                        versiculo: { type: "STRING" }
                    },
                    required: ["titulo", "analise", "versiculo"]
                }
            }
        };

        try {
            const resultado = await chamarGeminiComBackoff(payload);
            const respostaTexto = resultado.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!respostaTexto) throw new Error("Resposta vazia do servidor de IA.");

            // Tenta fazer parse de forma resiliente com múltiplas estratégias
            const insightIA = safeParseJSON(respostaTexto);
            if (!insightIA) {
                console.warn('Falha ao parsear JSON da IA; utilizando fallback local. Texto bruto:', respostaTexto);
                const sugestao = gerarSugestaoLocal(tarefasAtivas);
                renderizarPainelCompleto(sugestao);
                return;
            }

            // Renderiza apenas os campos essenciais retornados pelo novo schema (titulo, analise, versiculo)
            feedbackText.innerHTML = `
                <span style="font-weight: 700; color: ${insightIA.textoCor || '#00d4ff'}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${insightIA.titulo}</span>
                <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5;"><strong>Direcionamento Executivo:</strong> ${insightIA.analise}</span>
                <hr style="border: 0; border-top: 1px dashed ${insightIA.borda || '#00d4ff33'}; margin: 10px 0;">
                <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${insightIA.textoCor || '#00d4ff'}; font-weight: 500;">
                    🙏 ${insightIA.versiculo || 'Provérbios 3:5-6'}
                </span>
            `;
            feedbackText.parentElement.style.borderColor = insightIA.borda || '#00d4ff33';
        } catch (error) {
            console.error("Erro operacional no motor de IA:", error);
            // Fallback local mais rico quando a IA falha
            const sugestao = gerarSugestaoLocal(tarefasAtivas);
            renderizarPainelCompleto(sugestao);
        }

    } catch (error) {
        console.error("Erro operacional no motor de IA:", error);
        // Fallback local seguro (Modo Offline) para o painel não quebrar se a rede oscilar
        renderizarPainelLocal(
            "🧭 MODO DE SEGURANÇA ATIVADO", 
            "Múltiplas demandas na fila. Mantenha a disciplina executiva e realize as suas metas operacionais com foco e paciência.", 
            "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos. — Provérbios 16:9", 
            "#ff3333", 
            "#ff333333"
        );
    }
}

// Função auxiliar para renderizar blocos estáticos locais
function renderizarPainelLocal(titulo, conselho, versiculo, textoCor, borda) {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;
    feedbackText.innerHTML = `
        <span style="font-weight: 700; color: ${textoCor}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${titulo}</span>
        <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5; font-style: normal;">${conselho}</span>
        <hr style="border: 0; border-top: 1px dashed ${borda}; margin: 10px 0;">
        <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${textoCor}; font-weight: 500;">
            🙏 ${versiculo}
        </span>
    `;
    feedbackText.parentElement.style.borderColor = borda;
}

// Renderização completa a partir de objeto (usado pelo fallback local)
function renderizarPainelCompleto(obj) {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;
    const acoesHtml = obj.acoes && Array.isArray(obj.acoes) ? `<ul style="margin:8px 0 0 20px;">${obj.acoes.map(a=>`<li>${a}</li>`).join('')}</ul>` : '';
    const prioridadeHtml = obj.prioridade ? `<div style="margin-top:6px;"><strong>Prioridade:</strong> ${obj.prioridade}</div>` : '';
    const tempoHtml = obj.tempoEstimado ? `<div><strong>Tempo estimado:</strong> ${obj.tempoEstimado}</div>` : '';

    feedbackText.innerHTML = `
        <span style="font-weight: 700; color: ${obj.textoCor || '#00d4ff'}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${obj.titulo}</span>
        <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5;">${obj.conselho}</span>
        ${acoesHtml}
        ${prioridadeHtml} ${tempoHtml}
        <hr style="border: 0; border-top: 1px dashed ${obj.borda || '#00d4ff33'}; margin: 10px 0;">
        <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${obj.textoCor || '#00d4ff'}; font-weight: 500;">
            🙏 ${obj.versiculo}
        </span>
    `;
    feedbackText.parentElement.style.borderColor = obj.borda || '#00d4ff33';
}

// Gera sugestão local enriquecida quando a IA não está disponível
function gerarSugestaoLocal(tarefasAtivas) {
    const foco = Array.isArray(tarefasAtivas) ? tarefasAtivas[tarefasAtivas.length - 1] : String(tarefasAtivas);
    const texto = String(foco || 'Foco do dia');
    const palavras = texto.toLowerCase();
    const prioridade = /urgente|hoje|agora/.test(palavras) ? 'ALTA' : (palavras.length < 30 ? 'MÉDIA' : 'BAIXA');
    const tempoEstimado = texto.length < 30 ? '15-30min' : '30-90min';
    const acoes = [
        `Divida a tarefa em passos menores e priorize o primeiro passo`,
        `Reserve um bloco de tempo sem interrupções (${tempoEstimado})`,
        `Revise e ajuste após a primeira execução`
    ];
    // Versículos/reflexões padrão para cada tema (fallback local)
    const reflexaoProf = 'Divida o trabalho em passos e execute com excelência e propósito.';
    const versiculoProf = 'Colossenses 3:23 — Trabalhe de todo o coração, como para o Senhor.';

    const reflexaoFam = 'Valorize presença e diálogo; pequenas ações constroem relações duradouras.';
    const versiculoFam = 'Deuteronômio 6:6-7 — Ensine seus filhos e fale sobre isso.';

    const reflexaoAli = 'Alimente-se com equilíbrio; o corpo é templo e precisa de cuidado.';
    const versiculoAli = '1 Coríntios 10:31 — Tudo o que fizeres, fazei-o para a glória de Deus.';

    return {
        titulo: texto.toUpperCase().slice(0, 60),
        conselho: 'Comece pelo menor passo com maior impacto e mantenha foco ininterrupto. Use limites de tempo para gerar ritmo.',
        versiculo: 'Seja diligente e fiel no trabalho — Colossenses 3:23',
        textoCor: '#00d4ff',
        borda: '#00d4ff33',
        acoes,
        prioridade,
        tempoEstimado,
        // campos temáticos para reflexão e versículo
        reflexao_profissional: reflexaoProf,
        versiculo_profissional: versiculoProf,
        reflexao_familia: reflexaoFam,
        versiculo_familia: versiculoFam,
        reflexao_alimentacao: reflexaoAli,
        versiculo_alimentacao: versiculoAli
    };
}

// --- 🎤 LÓGICA DE RECONHECIMENTO DE VOZ (MICROFONE) ---
function inicializarMicrofone() {
    const btnMic = document.getElementById('btn-mic');
    if (!btnMic) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = false;
        recognition.interimResults = false;

        btnMic.addEventListener('click', () => {
            if (micRecognizing) {
                try { recognition.stop(); } catch (e) { /* ignore */ }
            } else {
                try {
                    recognition.start();
                } catch (err) {
                    console.error("Erro ao iniciar reconhecimento:", err);
                }
            }
        });

        recognition.onstart = () => {
            micRecognizing = true;
            btnMic.style.backgroundColor = '#ff3b30'; 
            btnMic.textContent = "🛑";
        };

        recognition.onresult = (event) => {
            const transcricao = event.results[0][0].transcript;
            if (input) {
                input.value = transcricao.replace(/\.$/g, ''); 
            }
        };

        recognition.onend = () => {
            micRecognizing = false;
            btnMic.style.backgroundColor = '#003329'; 
            btnMic.textContent = "🎤";
        };

        recognition.onerror = (event) => {
            micRecognizing = false;
            btnMic.style.backgroundColor = '#003329';
            btnMic.textContent = "🎤";
            console.error("Erro no reconhecimento de fala:", event.error || event);
        };
    } else {
        btnMic.style.display = 'none';
    }
}

// --- INICIALIZAÇÃO SEGURA E IMEDIATA (Sem falhas de ciclo de vida) ---
function inicializarSistema() {
    button = document.querySelector('.button-add-task');
    input = document.querySelector('.input-task');
    listaCompleta = document.querySelector('.list-tasks');

    if (button) {
        button.addEventListener('click', adicionarNovaTarefa);
    }
    if (input) {
        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // impede comportamento padrão do navegador

                // Se o microfone estiver gravando, pare-o e aguarde breve finalização para capturar a transcrição final
                if (micRecognizing && recognition && typeof recognition.stop === 'function') {
                    try {
                        recognition.stop();
                    } catch (err) {
                        console.error('Erro parando microfone:', err);
                    }
                    // aguarda um curto intervalo para o evento onresult/onend processar a transcrição
                    await delay(250);
                }

                adicionarNovaTarefa();
            }
        });
    }

    // Inicializa o relógio dinâmico imediatamente e ativa o loop contínuo de 1 segundo
    gerenciarPainelSuperior();
    setInterval(gerenciarPainelSuperior, 1000);

    // Inicializa o microfone de forma segura
    inicializarMicrofone();

    // Carrega a base de dados local de tarefas
    recarregarTarefas();
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', inicializarSistema);
} else {
    inicializarSistema();
}

// --- 🧪 FUNÇÃO DE TESTE: Simula backoff e parsing sem usar a API real ---
// Uso: abra o console do navegador e execute `testarBackoffSimulado()`
window.testarBackoffSimulado = async function testarBackoffSimulado() {
    console.log('Iniciando simulação de backoff (mock fetch)...');
    const originalFetch = window.fetch;
    let attempts = 0;

    // Mock de fetch: falha nas duas primeiras tentativas, depois retorna sucesso
    window.fetch = async function mockFetch(url, opts) {
        attempts++;
        console.log(`mockFetch tentativa #${attempts}`, url);
        if (attempts < 3) {
            return Promise.reject(new Error('simulated network error'));
        }

        const fakePayload = {
            candidates: [
                {
                    content: {
                        parts: [
                            { text: JSON.stringify({
                                titulo: 'SIMULAÇÃO DE TESTE',
                                analise: 'Execute o primeiro passo imediatamente e mensure resultado.',
                                versiculo: 'Provérbios 16:3'
                            }) }
                        ]
                    }
                }
            ]
        };

        return {
            ok: true,
            json: async () => fakePayload
        };
    };

    try {
        const payload = { contents: [{ parts: [{ text: 'Simulação de backoff' }] }], systemInstruction: { parts: [{ text: 'sim' }] }, generationConfig: {} };
        const resultado = await chamarGeminiComBackoff(payload);
        console.log('Resposta simulada (raw):', resultado);
        const respostaTexto = resultado.candidates?.[0]?.content?.parts?.[0]?.text;
        if (respostaTexto) {
            try {
                const parsed = JSON.parse(respostaTexto);
                console.log('Parsed JSON:', parsed);
                renderizarPainelCompleto(parsed);
            } catch (e) {
                console.warn('Resposta não é JSON válido:', e);
            }
        } else {
            console.warn('Nenhum texto na resposta simulada.');
        }
    } catch (err) {
        console.error('Simulação falhou:', err);
    } finally {
        window.fetch = originalFetch;
        console.log('Mock fetch restaurado.');
    }
};
