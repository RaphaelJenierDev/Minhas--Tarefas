function atualizarRelogio(){

    const agora = new Date();

    let horas = agora.getHours();

    const minutos =
        String(agora.getMinutes()).padStart(2,'0');

    const segundos =
        String(agora.getSeconds()).padStart(2,'0');

    let periodo = "AM";

    if(horas >= 12){
        periodo = "PM";
    }

    let horas12 = horas % 12;

    if(horas12 === 0){
        horas12 = 12;
    }

    document.getElementById("hora").innerHTML =
        `${String(horas12).padStart(2,'0')}:${minutos}:${segundos}`;

    document.getElementById("periodo").textContent =
        periodo;
}

setInterval(atualizarRelogio,1000);

atualizarRelogio();
