const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

// --- LÓGICA DE GERENCIAMENTO DE TAREFAS ORIGINAL ---

function adicionarNovaTarefa() {
  if (input.value.trim() === '') return; // Impede adicionar itens vazios

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
    novaLi =
      novaLi +
      `
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

// --- LÓGICA DO RELÓGIO LED INTELIGENTE ---

function gerenciarPainelSuperior() {
    const agora = new Date();
    const hora = agora.getHours();
    const relogioElemento = document.getElementById('relogio');
    const saudacaoElemento = document.getElementById('saudacao');

    // Atualiza o relógio no formato local (HH:MM:SS)
    if (relogioElemento) {
        relogioElemento.textContent = agora.toLocaleTimeString();
    }

    // Saudação personalizada baseada no horário
    if (saudacaoElemento) {
        if (hora >= 5 && hora < 12) {
            saudacaoElemento.textContent = "Bom dia, Executivo!";
        } else if (hora >= 12 && hora < 18) {
            saudacaoElemento.textContent = "Boa tarde, foco total!";
        } else {
            saudacaoElemento.textContent = "Boa noite, planejamento ativo!";
        }
    }
}

// --- LÓGICA DE RECONHECIMENTO DE VOZ (MICROFONE) ---

const btnMic = document.getElementById('btn-mic');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    btnMic.addEventListener('click', () => {
        recognition.start();
        btnMic.style.backgroundColor = '#ff3b30'; // Altera para vermelho indicando gravação
        btnMic.textContent = "🛑";
    });

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript;
        // Remove ponto final que a API costuma colocar automaticamente
        input.value = transcricao.replace(/\.$/g, ''); 
    };

    recognition.onend = () => {
        btnMic.style.backgroundColor = '#003329'; // Restaura a cor original
        btnMic.textContent = "🎤";
    };

    recognition.onerror = () => {
        btnMic.style.backgroundColor = '#003329';
        btnMic.textContent = "🎤";
    };
} else {
    // Se o navegador não suportar, oculta o botão elegantemente para não quebrar o layout
    btnMic.style.display = 'none';
}

// --- INICIALIZAÇÃO DO SISTEMA ---
recarregarTarefas();
setInterval(gerenciarPainelSuperior, 1000);
gerenciarPainelSuperior(); // Execução imediata inicial

button.addEventListener('click', adicionarNovaTarefa);

// Permite adicionar a tarefa também ao pressionar a tecla Enter no input
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarNovaTarefa();
    }
});
