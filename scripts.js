const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Função que adiciona na memória e atualiza a tela
function adicionarNovaTarefa() {
    if (input.value.trim() === '') return; // Não adiciona vazio
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    
    input.value = ''; // Limpa o campo
    mostrarTarefas();
}

// Função que desenha as tarefas na tela (o coração do projeto)
function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" onclick="deletarItem(${posicao})">
            </li>
        `;
    });

    listaCompleta.innerHTML = novaLi;
}

// Função para marcar como concluída
function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
}

// Função para deletar
function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
}

// Evento do clique no botão
button.addEventListener("click", adicionarNovaTarefa);

// Evento do Enter no teclado
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarNovaTarefa();
    }
});
