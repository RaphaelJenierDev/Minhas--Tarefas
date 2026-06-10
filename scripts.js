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
    
    // CORREÇÃO SÊNIOR: Template literal corrigido com o uso de backticks (``) para evitar quebra do script
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

// --- LÓGICA DO RELÓGIO LED INTELIGENTE E DATA ---
function gerenciarPainelSuperior() {
    const agora = new Date()
    const hora = agora.getHours()
    const relogioElemento = document.getElementById('relogio')
    const saudacaoElemento = document.getElementById('saudacao')
    const dataElemento = document.getElementById('data-display')

    // Atualiza o relógio no formato local (HH:MM:SS) de forma contínua e viva
    if (relogioElemento) {
        relogioElemento.textContent = agora.toLocaleTimeString('pt-BR')
    }

    // Processamento da Data por Extenso
    if (dataElemento) {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        
        const diaSemana = diasSemana[agora.getDay()]
        const dia = String(agora.getDate()).padStart(2, '0')
        const mes = meses[agora.getMonth()]
        const ano = agora.getFullYear()
        
        dataElemento.textContent = `${diaSemana}, ${dia} ${mes} ${ano}`
    }

    // Saudação executiva baseada no horário
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
gerenciarPainelSuperior() // Execução imediata ao carregar a página
setInterval(gerenciarPainelSuperior, 1000) // Mantém o relógio atualizando a cada 1 segundo

button.addEventListener('click', adicionarNovaTarefa)
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarNovaTarefa()
    }
})
