const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let lista = JSON.parse(localStorage.getItem('lista')) || [];
let filtro = 'todas';

function renderizar() {
    listaCompleta.innerHTML = lista
        .filter(item => filtro === 'todas' || !item.concluida)
        .map((item, index) => `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="img/checked.png" onclick="toggleConcluir(${index})">
                <p>${item.tarefa}</p>
                <img src="img/trash.png" onclick="deletar(${index})">
            </li>
        `).join('');
}

function adicionar() {
    if (!input.value.trim()) return;
    lista.push({ tarefa: input.value, concluida: false });
    input.value = '';
    salvar();
}

function toggleConcluir(index) {
    lista[index].concluida = !lista[index].concluida;
    salvar();
}

function deletar(index) {
    lista.splice(index, 1);
    salvar();
}

function salvar() {
    localStorage.setItem('lista', JSON.stringify(lista));
    renderizar();
}

function filtrarTarefas(tipo) {
    filtro = tipo;
    renderizar();
}

setInterval(() => {
    document.getElementById('relogio').textContent = new Date().toLocaleTimeString();
}, 1000);

button.addEventListener("click", adicionar);
input.addEventListener("keypress", (e) => e.key === 'Enter' && adicionar());

renderizar();
