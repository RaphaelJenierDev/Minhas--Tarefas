const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    if (input.value.trim() === "") return;
    
    minhaListaDeItens.push(input.value);
    input.value = "";
    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = "";
    
    minhaListaDeItens.forEach((item) => {
        novaLi += `
            <li class="task">
                <img src="img/checked.png" alt="check-na-tarefa">
                <p>${item}</p>
                <img src="img/trash.png" alt="deletar-tarefa">
            </li>
        `;
    });
    
    listaCompleta.innerHTML = novaLi;
}

button.addEventListener("click", adicionarNovaTarefa);

// Evento para o botão Enter
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        adicionarNovaTarefa();
    }
});
