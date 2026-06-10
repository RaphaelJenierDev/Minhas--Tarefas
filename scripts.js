// --- 🧭 ENGINE REAVALIADA E BLINDADA (SEM ERROS DE SINTAXE) ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let totalAtivas = 0;
    
    // Objeto de contagem limpo e isolado
    let pontos = {
        familia: 0,
        superao: 0,
        trabalho: 0,
        estudo: 0,
        principios: 0,
        saude: 0
    };

    // REGEX CIRÚRGICAS (Ajustadas para varrer seu vocabulário real)
    const regexFamilia = /(m[aã]e|mamy|abra[çc]|afeto|sentimento|fam[íi]li|carinh|visita|mãe)/i;
    const regexSuperao = /(supera|dif[íi]cil|venc|firme|for[çc]|desist|corag|aguent|crise|press[ão]|pressao|cansad)/i;
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar|contrat|sprint|backlog|scrum|meeting|reuni[ão]|clickup|faturam|revis[ão]|deploy|jornada|material)/i;
    const regexEstudo = /(est[ud]|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|labs|research|refator|poc|documenta|bootcamp|estydar)/i;
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh|deus|jesus|fé|irm[ão]s|orando|oração|madrugada|bênção|benção)/i;
    const regexSaude = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida|entrega)/i;

    // Escaneamento do Backlog acumulando a massa de dados
    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa;
            
            if (regexFamilia.test(texto)) pontos.familia++;
            if (regexSuperao.test(texto)) pontos.superao++;
            if (regexTrabalho.test(texto)) pontos.trabalho++;
            if (regexEstudo.test(texto)) pontos.estudo++;
            if (regexPrincipios.test(texto)) pontos.principios++;
            if (regexSaude.test(texto)) pontos.saude++;
        }
    });

    // BANCO DE DADOS DE DIRECIONAMENTO
    const MatrizSabedoria = {
        quadroLimpo: {
            titulo: "🎯 SPRINT LOG: Backlog Zerado",
            conselho: "Seu quadro está limpo. No framework Scrum, isso significa que a meta da Sprint foi atingida com sucesso. Use este vácuo operacional para planejar o seu próximo salto estratégico de faturamento macro na Jenier.",
            versiculo: "<strong>Provérbios 16:3</strong> - 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.'",
            borda: "#00d4ff33", textoCor: "#00d4ff"
        },
        sucessoTotal: {
            titulo: "🏆 RETROSPECTIVE: Sprint Concluída",
            conselho: "Todas as metas da esteira foram entregues. Celebrar a conclusão dos itens do backlog reforça o comportamento de alta performance e gera tração real. Desligue o ecossistema de desenvolvimento e descanse a mente.",
            versiculo: "<strong>Eclesiastes 3:13</strong> - 'Descobri também que a melhor coisa que o homem pode fazer é comer, beber e desfrutar do resultado do seu trabalho duro.'",
            borda: "#06d6a055", textoCor: "#06d6a0"
        },
        familia: {
            titulo: "❤️ BLOCKER REMOVED: Conexão Vital e Honra",
            conselho: "<strong>Direcionamento Executivo:</strong> O pilar de afeto e honra com sua mãe está ativo. A pressa do mercado e das entregas não pode invadir o ambiente familiar. Reserve um momento focado para estar com ela, alimentando sua base emocional.",
            versiculo: "<strong>Provérbios 23:22b</strong> - '...e não despreze a sua mãe quando ela envelhecer.'",
            borda: "#ff4d6d77", textoCor: "#ff758f"
        },
        superao: {
            titulo: "⚡ CRISIS MANAGEMENT: Resiliência Ativa",
            conselho: "<strong>Direcionamento Executivo:</strong> Identifiquei tarefas de alta pressão na sua fila. A postura de um consultor sênior é isolar as variáveis emocionais do estresse e focar no próximo Bloco de Execução. Mantenha a cabeça fria.",
            versiculo: "<strong>Josué 1:9</strong> - 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime...'",
            borda: "#ffeed155", textoCor: "#ffd166"
        },
        trabalho: {
            titulo: "💼 SPRINT ACTIVE: Foco no Faturamento",
            conselho: "<strong>Direcionamento Executivo:</strong> Você possui itens de alta prioridade na sua esteira corporativa. Como um estrategista de negócios, execute cada entrega focando no valor final e na organização do fluxo no ClickUp.",
            versiculo: "<strong>Provérbios 22:29</strong> - 'Você já viu um homem talentoso no seu trabalho? Ele servirá diante de reis...'",
            borda: "#00d4ffaa", textoCor: "#00d4ff"
        },
        estudo: {
            titulo: "🚀 R&D LABS: Engenharia e Conhecimento",
            conselho: "<strong>Direcionamento Executivo:</strong> Bloco focado em Pesquisa e Desenvolvimento (R&D). A engenharia de software exige profundidade analítica. Não pule etapas; execute o código no Cursor e valide a arquitetura.",
            versiculo: "<strong>Provérbios 10:14</strong> - 'Os sábios acumulam conhecimento, mas a boca do insensato é um convite à ruína.'",
            borda: "#06d6a077", textoCor: "#06d6a0"
        },
        principios: {
            titulo: "🛡️ COMPASS REALIGNMENT: Alinhamento de Bússola",
            conselho: "<strong>Direcionamento Executivo:</strong> A atmosfera de oração, comunhão e busca espiritual domina a sua esteira agora. Desconecte a mente dos prazos de código e do trânsito. Orar renova as suas forças estruturais.",
            versiculo: "<strong>Isaías 40:31</strong> - 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias...'",
            borda: "#9d4edd77", textoCor: "#c8b6ff"
        },
        saudeRotina: {
            titulo: "🍏 LOGISTICS & HARDWARE: Proteção do Ativo",
            conselho: "<strong>Direcionamento Executivo:</strong> Suas tarefas operacionais ou rotas exigem energia física. O seu corpo é a infraestrutura onde a agência roda. Pilote com segurança e gerencie os riscos.",
            versiculo: "<strong>Provérbios 4:23</strong> - 'Acima de tudo que se deve guardar, guarde o seu coração...'",
            borda: "#ffb70377", textoCor: "#ffb703"
        },
        multiTrabalhoEstudo: {
            titulo: "🔀 DUAL CORE: SPRINT & LABORATÓRIO ACCEL",
            conselho: "<strong>Direcionamento Executivo:</strong> Você está equilibrando faturamento imediato com ganho de Know-How técnico. Siga o planejamento por blocos rígidos (Timeboxing) para evitar a estafa mental.",
            versiculo: "<strong>Provérbios 13:4</strong> - 'O preguiçoso deseja e nada consegue, mas os desejos do diligente são amplamente satisfeitos.'",
            borda: "#00f5d477", textoCor: "#00f5d4"
        },
        hibridoEstrategico: {
            titulo: "🧭 HYBRID ENGINE: Gestão Dinâmica Multifoco",
            conselho: "<strong>Direcionamento Executivo:</strong> Seu dia atingiu alta complexidade com múltiplos pilares ativos na esteira. Mantenha o equilíbrio: divida o tempo em blocos rígidos, não misture os ambientes e execute com calma.",
            versiculo: "<strong>Salmos 37:5</strong> - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'",
            borda: "#00f5d477", textoCor: "#00f5d4"
        }
    };

    // PROCESSAMENTO DA LÓGICA DE MASSA CRÍTICA (ENGINE DE RESOLUÇÃO)
    let selecionado = MatrizSabedoria.hibridoEstrategico;
    
    if (minhaListaDeItens.length === 0) {
        selecionado = MatrizSabedoria.quadroLimpo;
    } else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        selecionado = MatrizSabedoria.sucessoTotal;
    } else {
        // Criar um array mapeado e ordená-lo do maior para o menor número de pontos
        let ordenado = Object.keys(pontos).map(chave => {
            return { contexto: chave, valor: pontos[chave] };
        }).sort((a, b) => b.valor - a.valor);

        let maior = ordenado[0];
        let segundoMaior = ordenado[1];

        // Regra de Ouro 1: Se um pilar domina sozinho por ampla maioria (2 ou mais de vantagem), ele assume o painel isolado
        if (maior.valor >= 2 && (maior.valor - segundoMaior.valor) >= 2) {
            selecionado = MatrizSabedoria[maior.contexto];
        }
        // Regra de Ouro 2: Tratamento de empates ou distribuição mista
        else {
            // Se houver concorrência direta entre Trabalho e Estudo exclusivamente
            if (pontos.trabalho > 0 && pontos.estudo > 0 && pontos.principios === 0 && pontos.familia === 0) {
                selecionado = MatrizSabedoria.multiTrabalhoEstudo;
            } 
            // Se houver apenas um pilar ativo com pontos e o resto zerado
            else if (maior.valor > 0 && segundoMaior.valor === 0) {
                selecionado = MatrizSabedoria[maior.contexto];
            }
            // Para qualquer outro cenário de concorrência mista (Mãe + Célula + Entrega), entra a inteligência híbrida
            else {
                selecionado = MatrizSabedoria.hibridoEstrategico;
            }
        }
    }

    // Renderização com garantia absoluta de escopo e variáveis revisadas
    feedbackText.innerHTML = `
        <span style="font-weight: 700; color: ${selecionado.textoCor}; display: block; margin-bottom: 6px; font-size: 14px; letter-spacing: 0.8px; text-transform: uppercase;">${selecionado.titulo}</span>
        <span style="display: block; margin-bottom: 12px; color: #e2e8f0; font-size: 13px; line-height: 1.5; font-style: normal;">${selecionado.conselho}</span>
        <hr style="border: 0; border-top: 1px dashed ${selecionado.borda}; margin: 10px 0;">
        <span style="display: block; color: #d8f3dc; font-size: 12.5px; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border-left: 3px solid ${selecionado.textoCor}; font-weight: 500;">
            🙏 ${selecionado.versiculo}
        </span>
    `;
    feedbackText.parentElement.style.borderColor = selecionado.borda;
}
