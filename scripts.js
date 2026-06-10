const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");
let lista = JSON.parse(localStorage.getItem("lista")) || [];
let filtro = "todas";

function atualizarRelogio() {
    const agora = new Date();
    document.getElementById("relogio").textContent = agora.toLocaleTimeString('pt-BR');
}
setInterval(atualizarRelogio, 1000);

function mostrarTarefas() {
    listaCompleta.innerHTML = lista.map((item, index) => {
        if (filtro === "pendentes" && item.concluida) return "";
        return `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="img/checked.png" onclick="concluir(${index})">
                <p>${item.tarefa}</p>
                <img src="img/trash.png" onclick="deletar(${index})">
            </li>
        `;
    }).join("");
}

function adicionar() {
    if (!input.value) return;
    lista.push({ tarefa: input.value, concluida: false });
    input.value = "";
    salvar();
}

function concluir(index) {
    lista[index].concluida = !lista[index].concluida;
    salvar();
}

function deletar(index) {
    lista.splice(index, 1);
    salvar();
}

function salvar() {
    localStorage.setItem("lista", JSON.stringify(lista));
    mostrarTarefas();
}

document.querySelector(".button-add-task").addEventListener("click", adicionar);
mostrarTarefas();
