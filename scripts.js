const input = document.getElementById("input-tarefa");
const button = document.getElementById("btn-adicionar");
const listaCompleta = document.querySelector(".list-tasks");

let lista = JSON.parse(localStorage.getItem("lista")) || [];

function adicionar() {
    if (input.value.trim() === "") return;
    lista.push({ tarefa: input.value });
    input.value = "";
    salvar();
}

function salvar() {
    localStorage.setItem("lista", JSON.stringify(lista));
    renderizar();
}

function renderizar() {
    listaCompleta.innerHTML = lista.map((item, index) => `
        <li class="task">
            <span>${item.tarefa}</span>
            <button onclick="deletar(${index})">X</button>
        </li>
    `).join("");
}

function deletar(index) {
    lista.splice(index, 1);
    salvar();
}

// Evento do botão
button.addEventListener("click", adicionar);

// Evento do ENTER
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        adicionar();
    }
});

// Relógio
setInterval(() => {
    document.getElementById("relogio").textContent = new Date().toLocaleTimeString();
}, 1000);

renderizar();
