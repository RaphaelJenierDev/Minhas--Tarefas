// --- SELEÇÃO DE ELEMENTOS ---
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

// --- ARMAZÉM DE DADOS ---
let minhaListaDeItens = [];

// --- 1. CARREGAR AO ABRIR (Recupera o que já estava salvo) ---
const tarefasDoLocalStorage = localStorage.getItem('lista');
if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    mostrarTarefas();
}

// --- 2. FUNÇÃO DE SALVAR (Grava as mudanças no navegador) ---
function salvarTarefas() {
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// --- 3. ADICIONAR TAREFA ---
function adicionarNovaTarefa() {
    if (input.value.trim() === '') return; // Previne adicionar vazio
    
    minhaListaDeItens.push(input.value);
    input.value = '';
    
    salvarTarefas(); // Salva toda vez que adiciona
    mostrarTarefas();
}

// --- 4. MOSTRAR TAREFAS NA TELA ---
function mostrarTarefas() {
    let novaLi = '';
    
    minhaListaDeItens.forEach(item => {
        novaLi += `<li class="task"><p>${item}</p></li>`;
    });
    
    listaCompleta.innerHTML = novaLi;
}

// --- 5. EVENTOS (Escuta o clique e o Enter) ---
button.addEventListener("click", adicionarNovaTarefa);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarNovaTarefa();
    }
});
