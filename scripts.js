// --- SELEÇÃO DE ELEMENTOS ---
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

// --- ARMAZÉM DE DADOS ---
let minhaListaDeItens = [];

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
    
    // Agora salvamos como objeto para permitir expansão futura
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    
    input.value = '';
    salvarTarefas();
    mostrarTarefas();
}

// --- 4. MOSTRAR TAREFAS (Versão única e correta) ---
function mostrarTarefas() {
    let novaLi = '';
    
    minhaListaDeItens.forEach((item) => {
        novaLi += `
            <li class="task">
                <p>${item.tarefa}</p>
            </li>
        `;
    });
    
    listaCompleta.innerHTML = novaLi;
}

// --- 5. EVENTOS ---
button.addEventListener("click", adicionarNovaTarefa);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarNovaTarefa();
    }
});
