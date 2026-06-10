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
    minhaListaDeItens.forEach((item, index) => {
        novaLi += `
            <li class="task">
                <img src="img/checked.png" alt="check">
                <p>${item}</p>
                <img src="img/trash.png" alt="deletar" onclick="deletarItem(${index})">
            </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
}

function deletarItem(index) {
    minhaListaDeItens.splice(index, 1);
    mostrarTarefas();
}

button.addEventListener("click", adicionarNovaTarefa);
input.addEventListener("keypress", (e) => { if (e.key === "Enter") adicionarNovaTarefa(); });
