const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = JSON.parse(localStorage.getItem("lista")) || [];
let filtroAtual = "todas";

function salvarTarefas() {
    localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function adicionarNovaTarefa() {
    if(input.value.trim() === "") return;
    minhaListaDeItens.push({ tarefa: input.value, concluida: false });
    input.value = "";
    salvarEMostrar();
}

function mostrarTarefas() {
    let novaLi = "";
    minhaListaDeItens.forEach((item, posicao) => {
        if(filtroAtual === "pendentes" && item.concluida) return;
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <img src="./img/checked.png" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" onclick="deletarItem(${posicao})">
            </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    salvarEMostrar();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    salvarEMostrar();
}

function filtrarTarefas(tipo) {
    filtroAtual = tipo;
    mostrarTarefas();
}

function salvarEMostrar() {
    salvarTarefas();
    mostrarTarefas();
}

// CORREÇÃO: Função para rodar o relógio digital no painel
function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");
    
    // Mostra horas no formato 12h no ID "relogio"
    document.getElementById("relogio").textContent = `${String(horas % 12 || 12).padStart(2, "0")}:${minutos}:${segundos}`;
    
    // Mostra AM/PM no ID "periodo"
    document.getElementById("periodo").textContent = horas >= 12 ? "PM" : "AM";
}

// Faz o relógio rodar a cada 1 segundo
setInterval(atualizarRelogio, 1000);

// --- EVENTOS CORRIGIDOS ---
button.addEventListener("click", adicionarNovaTarefa);

// CORREÇÃO: O ENTER PAROU DE FUNCIONAR AQUI
input.addEventListener("keydown", (event) => {
    // Se a tecla pressionada for 'Enter'
    if(event.key === "Enter"){
        adicionarNovaTarefa(); // Chama a função que adiciona
    }
});

// Inicialização
atualizarRelogio();
mostrarTarefas();
