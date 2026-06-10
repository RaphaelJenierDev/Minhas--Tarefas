const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  })

  input.value = ''

  mostrarTarefas()
}

function mostrarTarefas() {
  let novaLi = ''

  // ['comprar café', 'estudar programação']

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `

        <li class="task ${item.concluida && 'done'}">
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
// --- Lógica do Relógio ---
function atualizarRelogio() {
    const agora = new Date();
    document.getElementById('relogio').textContent = agora.toLocaleTimeString();
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// --- Lógica do Microfone (Web Speech API) ---
const btnMic = document.getElementById('btn-mic');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';

    btnMic.addEventListener('click', () => {
        recognition.start();
        btnMic.style.backgroundColor = 'red'; // Feedback visual de gravação
    });

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript;
        input.value = transcricao;
        btnMic.style.backgroundColor = '#003329';
    };

    recognition.onend = () => {
        btnMic.style.backgroundColor = '#003329';
    };
} else {
    btnMic.style.display = 'none'; // Esconde se o navegador não suportar
    alert("Seu navegador não suporta reconhecimento de voz.");
}
recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)
