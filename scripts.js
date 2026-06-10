const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaLista = JSON.parse(localStorage.getItem("lista")) || [];

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

function adicionar() {
    if (!input.value.trim()) return;
    minhaLista.push({ tarefa: input.value, concluida: false });
    input.value = "";
    salvarEMostrar();
}

// O ENTER VAI FUNCIONAR AGORA
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionar();
});

button.addEventListener("click", adicionar);

// Relógio original que você gosta
setInterval(() => {
    document.getElementById("relogio").textContent = new Date().toLocaleTimeString();
}, 1000);

mostrarTarefas();
