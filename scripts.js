const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

// --- SUA CHAVE DO GOOGLE AI STUDIO (COLOQUE AQUI) ---
const GEMINI_API_KEY = "AIzaSyCxP6upYJiFxeFrqM-zAsR5Hkqf6wkrwFU"; 

// --- LÓGICA DE GERENCIAMENTO DE TAREFAS ---
function adicionarNovaTarefa() {
    if (input.value.trim() === '') return; 
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
    })
    
    input.value = ''
    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''
    
    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            </li>
        `
    })
    
    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
    
    atualizarConsultor()
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

// --- 🧭 ENGINE CONSULTORA: INTEGRADA COM O GEMINI VIVO ---
async function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    // Filtra apenas as tarefas ativas
    const tarefasAtivas = minhaListaDeItens
        .filter(item => !item.concluida)
        .map(item => item.tarefa);

    // Se o backlog estiver zerado, renderiza o painel local rápido sem gastar requisição
    if (tarefasAtivas.length === 0) {
        renderizarPainelLocal(
            "🎯 SPRINT LOG: Backlog Zerado", 
            "Seu quadro está limpo. No framework Scrum, isso significa que a meta da Sprint foi atingida com sucesso. Use este vácuo operacional para planejar o seu próximo salto estratégico de faturamento macro na Jenier.", 
            "<strong>Provérbios 16:3</strong> - 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.'", 
            "#00d4ff", 
            "#00d4ff33"
        );
        return;
    }

    try {
        // Chamada direta para o endpoint do Gemini 1.5 Flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Analise as seguintes tarefas ativas da minha esteira: ${JSON.stringify(tarefasAtivas)}. Siga estritamente as instruções de sistema e preencha o JSON formatado.`
                    }]
                }],
                systemInstruction: {
                    parts: [{
                        text: "Você é um Consultor Estrategista de TI, Administração e Mentor Espiritual. Analise a lista de tarefas e retorne OBRIGATORIAMENTE um objeto JSON puro, sem aspas triplas de markdown (\`\`\`json) e sem texto explicativo fora do objeto, contendo exatamente as chaves: 'titulo' (caixa alta, estilo Scrum/Executivo), 'conselho' (direcionamento dinâmico unificando os assuntos mais críticos do dia), 'versiculo' (um versículo bíblico altamente contextualizado com o momento dele, contendo livro, capítulo e versículo), 'textoCor' (uma cor hexadecimal vibrante para a fonte de acordo com o tema predominante) e 'borda' (a mesma cor com opacidade para o container, ex: #ff4d6d33)."
                    }]
                },
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        const data = await response.json();
        
        // Trata a resposta e faz o parse do JSON gerado pela IA
        const insightIA = JSON.parse(data.candidates[0].content.parts[0].text);

        // Renderiza no seu HTML de forma dinâmica
        feedbackText.innerHTML = `
            <span style="font-weight: 700; color: ${insightIA.textoCor}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${insightIA.titulo}</span>
            <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5; font-style: normal;"><strong>Direcionamento Executivo:</strong> ${insightIA.conselho}</span>
            <hr style="border: 0; border-top: 1px dashed ${insightIA.borda}; margin: 10px 0;">
            <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${insightIA.textoCor}; font-weight: 500;">
                🙏 ${insightIA.versiculo}
            </span>
        `;
        feedbackText.parentElement.style.borderColor = insightIA.borda;

    } catch (error) {
        console.error("Erro na comunicação com a API Gemini:", error);
        // Fallback de segurança (Modo Offline) para o painel não quebrar se a internet oscilar
        renderizarPainelLocal("🧭 BACKLOG ACTIVE: Modo Offline", "Múltiplas demandas na fila. Mantenha a disciplina executiva e execute uma tarefa por vez.", "<strong>Salmos 37:5</strong> - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'", "#ffffff", "#ffffff22");
    }
}

// Função auxiliar para renderizar blocos estáticos locais
function renderizarPainelLocal(titulo, conselho, versiculo, textoCor, borda) {
    const feedbackText = document.getElementById('consultor-feedback');
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

// --- LÓGICA DO RELÓGIO LED INTELIGENTE E DATA ---
function gerenciarPainelSuperior() {
    const agora = new Date()
    const hora = agora.getHours()
    const relogioElemento = document.getElementById('relogio')
    const saudacaoElemento = document.getElementById('saudacao')
    const dataElemento = document.getElementById('data-display')

    if (relogioElemento) {
        relogioElemento.textContent = agora.toLocaleTimeString('pt-BR')
    }

    if (dataElemento) {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        
        const diaSemana = diasSemana[agora.getDay()]
        const dia = String(agora.getDate()).padStart(2, '0')
        const mes = meses[agora.getMonth()]
        const ano = agora.getFullYear()
        
        dataElemento.textContent = `${diaSemana}, ${dia} ${mes} ${ano}`
    }

    if (saudacaoElemento) {
        if (hora >= 5 && hora < 12) {
            saudacaoElemento.textContent = "☀️ Bom dia, Executivo!"
        } else if (hora >= 12 && hora < 18) {
            saudacaoElemento.textContent = "💡 Boa tarde, foco total!"
        } else {
            saudacaoElemento.textContent = "🌙 Boa noite, planejamento ativo!"
        }
    }
}

// --- LÓGICA DE RECONHECIMENTO DE VOZ (MICROFONE) ---
const btnMic = document.getElementById('btn-mic')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (SpeechRecognition) {
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.continuous = false
    recognition.interimResults = false

    btnMic.addEventListener('click', () => {
        recognition.start()
        btnMic.style.backgroundColor = '#ff3b30' 
        btnMic.textContent = "🛑"
    })

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript
        input.value = transcricao.replace(/\.$/g, '') 
    }

    recognition.onend = () => {
        btnMic.style.backgroundColor = '#003329' 
        btnMic.textContent = "🎤"
    }

    recognition.onerror = () => {
        btnMic.style.backgroundColor = '#003329'
        btnMic.textContent = "🎤"
    }
} else {
    btnMic.style.display = 'none'
}

// --- INICIALIZAÇÃO DO SISTEMA ---
recarregarTarefas()
gerenciarPainelSuperior() 
setInterval(gerenciarPainelSuperior, 1000) 

button.addEventListener('click', adicionarNovaTarefa)
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarNovaTarefa()
    }
})
