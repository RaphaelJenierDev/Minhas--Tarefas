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
    
    // CORREÇÃO SÊNIOR: Template literal com o uso de backticks (``)
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
    
    // Injeção do Consultor: Atualiza o feedback toda vez que a lista muda visualmente
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

// --- 🧠 LÓGICA DO CONSULTOR DE ORGANIZAÇÃO & DIÁRIO SAUDÁVEL ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let contemAcucar = false;
    let contemEstudo = false;
    let totalAtivas = 0;

    // Sonda o estado real das tarefas na memória
    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa.toLowerCase();
            
            // Regra de Saúde e Nutrição
            if (texto.includes('açúcar') || texto.includes('acucar')) {
                contemAcucar = true;
            }
            
            // Regra de Autodidatismo e Portfólio Vivo (TI, Inglês, Cursor)
            if (texto.includes('estudar') || texto.includes('inglês') || texto.includes('ingles') || 
                texto.includes('código') || texto.includes('codigo') || texto.includes('cursor') || 
                texto.includes('vibe coding') || texto.includes('dev')) {
                contemEstudo = true;
            }
        }
    });

    // Algoritmo de Tomada de Decisão (Coaching de Orientação)
    if (minhaListaDeItens.length === 0) {
        feedbackText.innerHTML = "🎯 <strong>Quadro limpo, Guerreiro!</strong> Sua esteira de foco está vazia. Adicione o seu próximo bloco de estudos ou prospecção para manter o sangue quente.";
        feedbackText.parentElement.style.borderColor = "#00d4ff33";
        feedbackText.style.color = "#00d4ff";
    } else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        feedbackText.innerHTML = "🏆 <strong>Entrega Concluída com Sucesso!</strong> Todas as metas desse bloco foram batidas. Vá descansar, produzir uma faixa de Trap ou registrar esse marco no ClickUp.";
        feedbackText.parentElement.style.borderColor = "#06d6a055";
        feedbackText.style.color = "#06d6a0";
    } else if (contemAcucar) {
        feedbackText.innerHTML = "⚠️ <strong>Alerta de Logística Saudável:</strong> Identifiquei açúcar pendente na sua lista. Monitore o consumo para manter a energia constante e a mente afiada nos códigos.";
        feedbackText.parentElement.style.borderColor = "#ffb70355";
        feedbackText.style.color = "#ffb703";
    } else if (contemEstudo) {
        feedbackText.innerHTML = "🚀 <strong>Padrão Ouro Ativo:</strong> Você está construindo o seu Know-How. Assim que terminar este bloco de código ou inglês, grave um vídeo de 1 minuto no CapCut para sua vitrine comercial.";
        feedbackText.parentElement.style.borderColor = "#00d4ff77";
        feedbackText.style.color = "#00d4ff";
    } else {
        feedbackText.innerHTML = "💼 <strong>Visão Executiva:</strong> Tarefas operacionais em andamento. Administre bem as horas para não vazar tempo e garanta seu bloco de lazer e música hoje.";
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
