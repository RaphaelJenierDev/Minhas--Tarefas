// --- SELEÇÃO DE ELEMENTOS ---
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

// --- ARMAZÉM DE DADOS ---
let minhaListaDeItens = [];
let filtroAtual = 'todas'; // 'todas' ou 'pendentes'

// --- 1. CARREGAR AO ABRIR ---
const tarefasDoLocalStorage = localStorage.getItem('lista');
if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    mostrarTarefas();
}

// --- 2. FUNÇÃO DE SALVAR ---
function salvarTarefas() {
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// --- 3. ADICIONAR TAREFA ---
function adicionarNovaTarefa() {
    if (input.value.trim() === '') return;
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    
    input.value = '';
    salvarTarefas();
    mostrarTarefas();
}

// --- 4. FILTRAR TAREFAS ---
function filtrarTarefas(tipo) {
    filtroAtual = tipo;
    mostrarTarefas();
}

// --- 5. MOSTRAR TAREFAS (Com lógica de filtro) ---
function mostrarTarefas() {
    let novaLi = '';
    
    minhaListaDeItens.forEach((item, posicao) => {
        // Lógica: se o filtro for 'pendentes', só exibe se não estiver concluída
        if (filtroAtual === 'pendentes' && item.concluida) {
            return; // Pula este item
        }

        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" alt="check" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="lixo" onclick="deletarItem(${posicao})">
            </li>
        `;
    });
    
    listaCompleta.innerHTML = novaLi;
}

// --- 6. AÇÕES DE GESTÃO ---
function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    salvarTarefas();
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    salvarTarefas();
    mostrarTarefas();
}

// --- 7. EVENTOS ---
button.addEventListener("click", adicionarNovaTarefa);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") adicionarNovaTarefa();
});
