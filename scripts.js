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

// --- 🧠 ENGINE MASTERIZADA: CONSULTOR DE CONTEXTO REAL COM REGEX ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let temTrabalho = false;
    let temEstudo = false;
    let temPrincipios = false;
    let temSaudeOuRotina = false;
    let totalAtivas = 0;

    // EXPRESSÕES REGULARES (REGEX): Inteligência tolerante a erros de digitação e variações
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar)/i;
    
    // Captura: estudar, estydar, estudando, ingles, inglês, codigo, código, cursor, dev, aula, etc.
    const regexEstudo = /(est[ud]\|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|estydar)/i;
    
    // Captura: igreja, celula, celuça, culto, oração, pastor, comunhão
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh)/i;
    
    // Captura: acucar, açúcar, comprar, mercado, delivery, ifood, comida, treino, academia, moto
    const regexSaudeRotina = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida)/i;

    // Escaneamento inteligente da lista
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

    // ARQUITETURA DE DECISÃO DO COACH (Ordem de Prioridade Estratégica)
    if (minhaListaDeItens.length === 0) {
        feedbackText.innerHTML = "🎯 <strong>Quadro limpo, Guerreiro!</strong> Sua esteira de foco está vazia. Adicione o seu próximo bloco de estudos ou prospecção para manter o sangue quente.";
        feedbackText.parentElement.style.borderColor = "#00d4ff33";
        feedbackText.style.color = "#00d4ff";
    } 
    else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        feedbackText.innerHTML = "🏆 <strong>Entrega Concluída com Sucesso!</strong> Todas as metas desse bloco foram batidas. Vá descansar, produzir uma faixa de Trap ou registrar esse marco no ClickUp.";
        feedbackText.parentElement.style.borderColor = "#06d6a055";
        feedbackText.style.color = "#06d6a0";
    } 
    else if (temTrabalho) {
        feedbackText.innerHTML = "💼 <strong>Foco no Faturamento:</strong> Metas comerciais ativas. Execute com precisão cirúrgica, garanta a entrega e use esse resultado para consolidar seu know-how no mercado.";
        feedbackText.parentElement.style.borderColor = "#00d4ffaa"; 
        feedbackText.style.color = "#00d4ff";
    } 
    else if (temEstudo) {
        feedbackText.innerHTML = "🚀 <strong>Upgrade de Know-How:</strong> Bloco de aprendizado ativo. Não acumule apenas teoria: termine o código, abra o CapCut Pro e gere seu vídeo de 1 minuto para blindar seu portfólio vivo.";
        feedbackText.parentElement.style.borderColor = "#06d6a077"; 
        feedbackText.style.color = "#06d6a0";
    } 
    else if (temPrincipios) {
        // NOVO PILAR: Valores, Ecossistema de Apoio e Alinhamento Espiritual
        feedbackText.innerHTML = "🛡️ <strong>Âncora de Propósito:</strong> Momento focado na sua base, nos valores e na comunhão. Proteja esse tempo na igreja/célula, pois é ele que renova a mentalidade para sustentar os negócios.";
        feedbackText.parentElement.style.borderColor = "#9d4edd77"; // Roxo/Púrpura Executivo de Princípios
        feedbackText.style.color = "#c8b6ff";
    } 
    else if (temSaudeOuRotina) {
        feedbackText.innerHTML = "🍏 <strong>Logística de Performance:</strong> Gerenciar as rotinas de entrega de forma segura é o que mantém o corpo pronto para o rojão. Proteja sua saúde nas ruas para render no laboratório.";
        feedbackText.parentElement.style.borderColor = "#ffb70377"; 
        feedbackText.style.color = "#ffb703";
    } 
    else {
        feedbackText.innerHTML = "🧭 <strong>Direcionamento Ativo:</strong> Tarefas pendentes no painel. Administre bem as horas para não vazar tempo e proteja o seu bloco de lazer e música hoje.";
        feedbackText.parentElement.style.borderColor = "#ffffff22";
        feedbackText.style.color = "#ffffff";
    }
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
