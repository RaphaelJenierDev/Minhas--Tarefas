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

// --- 🧠 ENGINE SUPREMA: CONSULTOR EXECUTIVO, PSICOLÓGICO E DE PRINCÍPIOS ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let temTrabalho = false;
    let temEstudo = false;
    let temPrincipios = false;
    let temSaudeOuRotina = false;
    let totalAtivas = 0;

    // REGEX: Detecção avançada de intenção
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar)/i;
    const regexEstudo = /(est[ud]|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|estydar)/i;
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh)/i;
    const regexSaudeRotina = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida)/i;

    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa;
            
            if (regexTrabalho.test(texto)) temTrabalho = true;
            else if (regexEstudo.test(texto)) temEstudo = true;
            else if (regexPrincipios.test(texto)) temPrincipios = true;
            else if (regexSaudeRotina.test(texto)) temSaudeOuRotina = true;
        }
    });

    // BANCO DE DADOS DE SABEDORIA (Psicologia Aplicada + Fundamento da Fé)
    const BaseSabedoria = {
        quadroLimpo: {
            titulo: "🎯 Esteira Pronta",
            texto: "Sua lista está limpa. Psicologicamente, a ausência de microtarefas reduz a ansiedade de curto prazo. Aproveite essa clareza mental para projetar estrategicamente seus próximos passos comerciais.",
            versiculo: "<strong>Provérbios 16:3</strong> - 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.'",
            borda: "#00d4ff33", textoCor: "#00d4ff"
        },
        sucessoTotal: {
            titulo: "🏆 Vitória de Execução",
            texto: "Todas as metas do bloco foram batidas. Concluir tarefas libera picos de dopamina saudáveis, gerando sensação de competência. É hora de desacelerar a mente, celebrar o progresso e proteger seu descanso.",
            versiculo: "<strong>Eclesiastes 3:13</strong> - 'Descobri também que a melhor coisa que o homem pode fazer é comer, beber e desfrutar do resultado do seu trabalho duro. Isso é um presente de Deus.'",
            borda: "#06d6a055", textoCor: "#06d6a0"
        },
        trabalho: {
            titulo: "💼 Operação & Faturamento",
            texto: "Metas de negócio ativas exigem alta energia analítica. A ansiedade por fechar contratos ou entregar projetos deve ser canalizada em foco operacional na execução. Evite focar no acúmulo de tarefas e controle o que está nas suas mãos.",
            versiculo: "<strong>Colossenses 3:23</strong> - 'Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens.'",
            borda: "#00d4ffaa", textoCor: "#00d4ff"
        },
        estudo: {
            titulo: "🚀 Construção de Know-How",
            texto: "Aprender algo novo gera a sensação temporária de desconforto porque o cérebro está criando novas conexões. Não caia na armadilha da pressa; a consistência diária vence a intensidade. Documente o progresso.",
            versiculo: "<strong>Provérbios 1:5</strong> - 'O sábio escute e aumente o seu saber, e o homem de entendimento adquira habilidade.'",
            borda: "#06d6a077", textoCor: "#06d6a0"
        },
        principios: {
            titulo: "🛡️ Alinhamento de Base",
            texto: "A rotina na comunidade e na igreja desacelera o ritmo acelerado do mercado. Psicologicamente, o pertencimento e o foco no coletivo renovam a inteligência emocional e blindam a mente contra pressões externas.",
            versiculo: "<strong>Salmos 133:1</strong> - 'Como é bom e agradável quando os irmãos convivem em união!'",
            borda: "#9d4edd77", textoCor: "#c8b6ff"
        },
        saudeRotina: {
            titulo: "🍏 Logística e Integridade",
            texto: "O cansaço físico das rotinas operacionais ou de trânsito afeta diretamente o poder de tomada de decisão. Trate o seu corpo como o principal ativo da sua empresa. Se o corpo falhar, a operação para.",
            versiculo: "<strong>1 Coríntios 6:19</strong> - 'Acaso não sabem que o corpo de vocês é santuário do Espírito Santo...?'",
            borda: "#ffb70377", textoCor: "#ffb703"
        },
        geral: {
            titulo: "🧭 Direcionamento Geral",
            texto: "Tarefas mistas exigem alternância de foco. Faça uma coisa por vez para evitar a sobrecarga mental de alternância de contexto (context-switching). Proteja suas horas de recarga.",
            versiculo: "<strong>Filipenses 4:6</strong> - 'Não andem ansiosos por coisa alguma, mas em tudo apresentem os seus pedidos a Deus.'",
            borda: "#ffffff22", textoCor: "#ffffff"
        }
    };

    // SELEÇÃO DE CONTEXTO
    let contexto = BaseSabedoria.geral;
    
    if (minhaListaDeItens.length === 0) contexto = BaseSabedoria.quadroLimpo;
    else if (totalAtivas === 0 && minhaListaDeItens.length > 0) contexto = BaseSabedoria.sucessoTotal;
    else if (temTrabalho) contexto = BaseSabedoria.trabalho;
    else if (temEstudo) contexto = BaseSabedoria.estudo;
    else if (temPrincipios) contexto = BaseSabedoria.principios;
    else if (temSaudeOuRotina) contexto = BaseSabedoria.saudeRotina;

    // RENDERIZAÇÃO DA INTELIGÊNCIA NA TELA
    feedbackText.innerHTML = `
        <span style="font-weight: 700; color: ${contexto.textoCor}; display: block; margin-bottom: 5px;">${contexto.titulo}</span>
        <span style="display: block; margin-bottom: 10px; color: #e0e0e0; font-style: normal;">${contexto.texto}</span>
        <hr style="border: 0; border-top: 1px dashed ${contexto.borda}; margin: 8px 0;">
        <span style="display: block; color: #b3f0ff; font-size: 12px; line-height: 1.4; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
            🙏 ${contexto.versiculo}
        </span>
    `;
    feedbackText.parentElement.style.borderColor = contexto.borda;
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
