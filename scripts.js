const button = document.querySelector(".button-add-task");
const input = document.getElementById("input-tarefa");
const listaCompleta = document.querySelector(".list-tasks");

let minhaLista = JSON.parse(localStorage.getItem("lista")) || [];

function adicionar() {
    if (!input.value.trim()) return;
    minhaLista.push({ tarefa: input.value, concluida: false });
    input.value = "";
    salvarEMostrar();
}

function salvarEMostrar() {
    localStorage.setItem("lista", JSON.stringify(minhaLista));
    mostrarTarefas();
}

function mostrarTarefas() {
    listaCompleta.innerHTML = minhaLista.map((item, index) => `
        <li class="task">
            <img src="img/checked.png" onclick="concluir(${index})">
            <p>${item.tarefa}</p>
            <img src="img/trash.png" onclick="deletar(${index})">
        </li>
    `).join("");
}

// CORREÇÃO DO ENTER
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        adicionar();
    }
});

button.addEventListener("click", adicionar);

setInterval(() => {
    document.getElementById("relogio").textContent = new Date().toLocaleTimeString('pt-BR');
}, 1000);

mostrarTarefas();
