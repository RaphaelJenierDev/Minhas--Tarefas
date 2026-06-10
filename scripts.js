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

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item) => {
        // AQUI ESTÁ A MUDANÇA: usamos item.tarefa
        // Antes estava apenas ${item}, agora está ${item.tarefa}
        novaLi += `
            <li class="task">
                <p>${item.tarefa}</p>
            </li>
        `;
    });

    listaCompleta.innerHTML = novaLi;
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
