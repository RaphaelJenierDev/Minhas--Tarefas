const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = JSON.parse(localStorage.getItem('lista')) || [];
let filtroAtual = 'todas';

function adicionarNovaTarefa() {
    if (input.value.trim() === '') return;
    minhaListaDeItens.push({ tarefa: input.value, concluida: false });
    input.value = '';
    salvarEMostrar();
}

function mostrarTarefas() {
    let novaLi = '';
    minhaListaDeItens.forEach((item, posicao) => {
        if (filtroAtual === 'pendentes' && item.concluida) return;
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="img/checked.png" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="img/trash.png" onclick="deletarItem(${posicao})">
            </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    salvarEMostrar();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    salvarEMostrar();
}

function filtrarTarefas(tipo) {
    filtroAtual = tipo;
    mostrarTarefas();
}

function salvarEMostrar() {
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
    mostrarTarefas();
}

// Relógio Estilo Painel
setInterval(() => {
    const time = new Date().toLocaleTimeString('pt-BR');
    document.getElementById('relogio').textContent = time;
}, 1000);

button.addEventListener("click", adicionarNovaTarefa);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") adicionarNovaTarefa(); });

mostrarTarefas();
