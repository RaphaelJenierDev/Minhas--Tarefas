const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

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

// --- 🧭 ENGINE DE ALTA PRECISÃO SEMÂNTICA ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let totalAtivas = 0;
    
    // Inicializamos as variáveis de detecção
    let detectouFamilia = false;
    let detectouSuperao = false;
    let detectouTrabalho = false;
    let detectouEstudo = false;
    let detectouPrincipios = false;
    let detectouSaude = false;

    // REGEX ULTRA SENSÍVEIS (Capturam variações e palavras-chave isoladas)
    const regexFamilia = /(m[aã]e|mamy|abra[çc]|afeto|sentimento|fam[íi]li|carinh|visita|mãe)/i;
    const regexSuperao = /(supera|dif[íi]cil|venc|firme|for[çc]|desist|corag|aguent|crise|press[ão]|pressao|cansad)/i;
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar|contrat|sprint|backlog|scrum|meeting|reuni[ão]|clickup|faturam|revis[ão]|deploy)/i;
    const regexEstudo = /(est[ud]|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|labs|research|refator|poc|documenta|bootcamp)/i;
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh|deus|jesus|fé)/i;
    const regexSaude = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida)/i;

    // Escaneamento prioritário
    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa;
            
            // Ativamos as flags baseadas no texto digitado
            if (regexFamilia.test(texto)) detectouFamilia = true;
            if (regexSuperao.test(texto)) detectouSuperao = true;
            if (regexTrabalho.test(texto)) detectouTrabalho = true;
            if (regexEstudo.test(texto)) detectouEstudo = true;
            if (regexPrincipios.test(texto)) detectouPrincipios = true;
            if (regexSaude.test(texto)) detectouSaude = true;
        }
    });

    // MATRIZ DE DIRECIONAMENTO E CONSELHOS CORPORATIVOS
    const MatrizSabedoria = {
        quadroLimpo: {
            titulo: "🎯 SPRINT LOG: Backlog Zerado",
            conselho: "Seu quadro está limpo. No framework Scrum, isso significa que a meta da Sprint foi atingida com sucesso. Use este vácuo operacional para planejar o seu próximo ciclo de faturamento macro na Jenier.",
            versiculo: "<strong>Provérbios 16:3</strong> - 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.'",
            borda: "#00d4ff33", textoCor: "#00d4ff"
        },
        sucessoTotal: {
            titulo: "🏆 RETROSPECTIVE: Sprint Concluída",
            conselho: "Todas as metas da esteira foram entregues. Celebrar a conclusão dos itens do backlog reforça o comportamento de alta performance e gera tração real. Desligue o ecossistema de desenvolvimento e descanse a mente.",
            versiculo: "<strong>Eclesiastes 3:13</strong> - 'Descobri também que a melhor coisa que o homem pode fazer é comer, beber e desfrutar do resultado do seu trabalho duro. Isso é um presente de Deus.'",
            borda: "#06d6a055", textoCor: "#06d6a0"
        },
        familia: {
            titulo: "❤️ BLOCKER REMOVED: Conexão Vital e Honra",
            conselho: "<strong>Direcionamento Executivo:</strong> Nenhum resultado profissional justifica o sacrifício da base. Estar com sua mãe e nutrir as relações de afeto verdadeiro protege a sua inteligência emocional a longo prazo. Deixe as ferramentas de gerenciamento de lado e viva o momento presente com foco total nesse abraço.",
            versiculo: "<strong>Provérbios 23:22b</strong> - '...e não despreze a sua mãe quando ela envelhecer.'",
            borda: "#ff4d6d77", textoCor: "#ff758f"
        },
        superao: {
            titulo: "⚡ CRISIS MANAGEMENT: Resiliência Ativa",
            conselho: "<strong>Direcionamento Executivo:</strong> Gargalos e impedimentos complexos aparecem em qualquer projeto de tecnologia ou transição. A postura de um consultor sênior é isolar as variáveis emocionais e focar exclusivamente na solução do problema mais imediato. Você tem capacidade técnica e resiliência para vencer.",
            versiculo: "<strong>Josué 1:9</strong> - 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.'",
            borda: "#ffeed155", textoCor: "#ffd166"
        },
        trabalho: {
            titulo: "💼 SPRINT ACTIVE: Foco no Faturamento",
            conselho: "<strong>Direcionamento Executivo:</strong> Você possui itens de alta prioridade na sua esteira de produção corporativa (Sprint Ativa). Como um estrategista de negócios, execute cada entrega focando no valor final entregue ao cliente, minimizando o desperdício de tempo e organizando o fluxo no ClickUp.",
            versiculo: "<strong>Provérbios 22:29</strong> - 'Você já viu um homem talentoso no seu trabalho? Ele servirá diante de reis; não servirá diante de homens obscuros.'",
            borda: "#00d4ffaa", textoCor: "#00d4ff"
        },
        estudo: {
            titulo: "🚀 R&D LABS: Engenharia e Conhecimento",
            conselho: "<strong>Direcionamento Executivo:</strong> Bloco focado em Pesquisa e Desenvolvimento (R&D). A engenharia de software exige profundidade analítica. Não caia no erro de pular etapas; execute o código no Cursor, valide na arquitetura e monte uma POC (Prova de Conceito) real para o seu portfólio.",
            versiculo: "<strong>Provérbios 10:14</strong> - 'Os sábios acumulam conhecimento, mas a boca do insensato é um convite à ruína.'",
            borda: "#06d6a077", textoCor: "#06d6a0"
        },
        principios: {
            titulo: "🛡️ COMPASS REALIGNMENT: Alinhamento de Bússola",
            conselho: "<strong>Direcionamento Executivo:</strong> Momento de desconectar do fluxo ágil de produção para recalibrar a sua governança espiritual. O ambiente de comunhão na igreja/célula e a oração atuam como um regulador mental essencial, limpando os excessos e blindando o seu propósito de vida.",
            versiculo: "<strong>Isaías 40:31</strong> - 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.'",
            borda: "#9d4edd77", textoCor: "#c8b6ff"
        },
        saudeRotina: {
            titulo: "🍏 LOGISTICS & HARDWARE: Proteção do Ativo",
            conselho: "<strong>Direcionamento Executivo:</strong> As tarefas operacionais de logística exigem gerenciamento rigoroso de riscos. O seu corpo é a infraestrutura física onde os seus softwares rodam. Mantenha-se hidratado, faça pausas adequadas e não comprometa a sua segurança por pressa.",
            versiculo: "<strong>Provérbios 4:23</strong> - 'Acima de tudo que se deve guardar, guarde o seu coração, pois dele procedem as fontes da vida.'",
            borda: "#ffb70377", textoCor: "#ffb703"
        },
        geral: {
            titulo: "🧭 BACKLOG OVERVIEW: Ordenação de Fluxo",
            conselho: "<strong>Direcionamento Executivo:</strong> Múltiplas demandas na fila. Mantenha a disciplina de focar em uma tarefa por vez para evitar perda de desempenho por alternância de contexto (Context Switching). Siga a ordem do seu planejamento.",
            versiculo: "<strong>Salmos 37:5</strong> - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'",
            borda: "#ffffff22", textoCor: "#ffffff"
        }
    };

    // HIERARQUIA DE DECISÃO ABSOLUTA (Garante o casamento exato de conselho + versículo)
    let selecionado = MatrizSabedoria.geral;
    
    if (minhaListaDeItens.length === 0) {
        selecionado = MatrizSabedoria.quadroLimpo;
    } else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        selecionado = MatrizSabedoria.sucessoTotal;
    } else {
        // Hierarquia rígida: Afeto familiar e Superação quebram qualquer regra geral ou técnica
        if (detectouFamilia) selecionado = MatrizSabedoria.familia;
        else if (detectouSuperao) selecionado = MatrizSabedoria.superao;
        else if (detectouTrabalho) selecionado = MatrizSabedoria.trabalho;
        else if (detectouEstudo) selecionado = MatrizSabedoria.estudo;
        else if (detectouPrincipios) selecionado = MatrizSabedoria.principios;
        else if (detectouSaude) selecionado = MatrizSabedoria.saudeRotina;
    }

    // Renderização com tags estruturadas
    feedbackText.innerHTML = `
        <span style="font-weight: 700; color: ${selecionado.textoCor}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${selecionado.titulo}</span>
        <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5; font-style: normal;">${selecionado.conselho}</span>
        <hr style="border: 0; border-top: 1px dashed ${selecionado.borda}; margin: 10px 0;">
        <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${selecionado.textoCor}; font-weight: 500;">
            🙏 ${selecionado.versiculo}
        </span>
    `;
    feedbackText.parentElement.style.borderColor = selecionado.borda;
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
