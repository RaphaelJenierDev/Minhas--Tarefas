// --- 🧭 ENGINE DE ALTA PRECISÃO MULTI-CONTEXTO (RESOLÇÃO DE CONCORRÊNCIA) ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let totalAtivas = 0;
    
    // Contadores para entender a volumetria e o peso do dia
    let focos = {
        familia: false,
        superao: false,
        trabalho: false,
        estudo: false,
        principios: false,
        saude: false
    };

    // REGEX ULTRA SENSÍVEIS
    const regexFamilia = /(m[aã]e|mamy|abra[çc]|afeto|sentimento|fam[íi]li|carinh|visita|mãe)/i;
    const regexSuperao = /(supera|dif[íi]cil|venc|firme|for[çc]|desist|corag|aguent|crise|press[ão]|pressao|cansad)/i;
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar|contrat|sprint|backlog|scrum|meeting|reuni[ão]|clickup|faturam|revis[ão]|deploy)/i;
    const regexEstudo = /(est[ud]|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|labs|research|refator|poc|documenta|bootcamp|estydar)/i;
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh|deus|jesus|fé|irm[ão]s|orando)/i;
    const regexSaude = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida|entrega)/i;

    // Escaneamento de todas as tarefas ativas sem perder nenhuma informação
    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa;
            
            if (regexFamilia.test(texto)) focos.familia = true;
            if (regexSuperao.test(texto)) focos.superao = true;
            if (regexTrabalho.test(texto)) focos.trabalho = true;
            if (regexEstudo.test(texto)) focos.estudo = true;
            if (regexPrincipios.test(texto)) focos.principios = true;
            if (regexSaude.test(texto)) focos.saude = true;
        }
    });

    // BANCO DE DADOS DE SABEDORIA MATRIX
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
            versiculo: "<strong>Eclesiastes 3:13</strong> - 'Descobri também que a melhor coisa que o homem pode fazer é comer, beber e desfrutar do resultado do seu trabalho duro. Isso é um presente de Deus.'",
            borda: "#06d6a055", textoCor: "#06d6a0"
        },
        familia: {
            titulo: "❤️ BLOCKER REMOVED: Conexão Vital e Honra",
            conselho: "<strong>Direcionamento Executivo:</strong> Mesmo com a esteira cheia, o pilar de afeto e honra com sua mãe é inegociável. A pressa do mercado não pode invadir o ambiente familiar. Desconecte das ferramentas de gerenciamento por um momento e esteja 100% presente para recarregar sua inteligência emocional.",
            versiculo: "<strong>Provérbios 23:22b</strong> - '...e não despreze a sua mãe quando ela envelhecer.'",
            borda: "#ff4d6d77", textoCor: "#ff758f"
        },
        superao: {
            titulo: "⚡ CRISIS MANAGEMENT: Resiliência Ativa",
            conselho: "<strong>Direcionamento Executivo:</strong> Identifiquei tarefas de alta pressão na sua fila. A postura de um consultor sênior é isolar as variáveis emocionais do estresse e focar no próximo Bloco de Execução. Mantenha a cabeça fria e os pés firmes.",
            versiculo: "<strong>Josué 1:9</strong> - 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime...'",
            borda: "#ffeed155", textoCor: "#ffd166"
        },
        multiTrabalhoEstudo: {
            titulo: "🔀 DUAL CORE: SPRINT & LABORATÓRIO ACCEL",
            conselho: "<strong>Direcionamento Executivo:</strong> Você está equilibrando o faturamento imediato (ClickUp/Propostas) com o desenvolvimento de Know-How técnico (Cursor/Estudos). Isso exige alta energia cognitiva. Divida seu dia em blocos rígidos de tempo (Timeboxing) para evitar a estafa mental de mudar de foco a todo momento.",
            versiculo: "<strong>Provérbios 13:4</strong> - 'O preguiçoso deseja e nada consegue, mas os desejos do diligente são amplamente satisfeitos.'",
            borda: "#00f5d477", textoCor: "#00f5d4"
        },
        trabalho: {
            titulo: "💼 SPRINT ACTIVE: Foco no Faturamento",
            conselho: "<strong>Direcionamento Executivo:</strong> Você possui itens de alta prioridade na sua esteira de produção corporativa (Sprint Ativa). Como um estrategista de negócios, execute cada entrega focando no valor final entregue ao cliente, minimizando o desperdício de tempo e organizando o fluxo no ClickUp.",
            versiculo: "<strong>Provérbios 22:29</strong> - 'Você já viu um homem talentoso no seu trabalho? Ele servirá diante de reis...'",
            borda: "#00d4ffaa", textoCor: "#00d4ff"
        },
        estudo: {
            titulo: "🚀 R&D LABS: Engenharia e Conhecimento",
            conselho: "<strong>Direcionamento Executivo:</strong> Bloco focado em Pesquisa e Desenvolvimento (R&D). A engenharia de software exige profundidade analítica. Não caia no erro de pular etapas; execute o código no Cursor, valide na arquitetura e monte uma POC (Prova de Conceito) real para o seu portfólio.",
            versiculo: "<strong>Provérbios 10:14</strong> - 'Os sábios acumulam conhecimento, mas a boca do insensato é um convite à ruína.'",
            borda: "#06d6a077", textoCor: "#06d6a0"
        },
        principios: {
            titulo: "🛡️ COMPASS REALIGNMENT: Alinhamento de Bússola",
            conselho: "<strong>Direcionamento Executivo:</strong> Há espaço reservado para renovação espiritual na sua agenda hoje (Igreja/Célula). Use este tempo para desacelerar o ritmo frenético do trânsito e do mercado. Deixar o trabalho na porta e orar renova a mente contra pressões externas.",
            versiculo: "<strong>Isaías 40:31</strong> - 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias...'",
            borda: "#9d4edd77", textoCor: "#c8b6ff"
        },
        saudeRotina: {
            titulo: "🍏 LOGISTICS & HARDWARE: Proteção do Ativo",
            conselho: "<strong>Direcionamento Executivo:</strong> Suas tarefas operacionais ou rotas de delivery exigem energia física. O seu corpo é a infraestrutura mecânica onde a sua agência roda. Gerencie os riscos, pilote com segurança e não comprometa sua saúde pela pressa de chegar.",
            versiculo: "<strong>Provérbios 4:23</strong> - 'Acima de tudo que se deve guardar, guarde o seu coração, pois dele procedem as fontes da vida.'",
            borda: "#ffb70377", textoCor: "#ffb703"
        },
        geral: {
            titulo: "🧭 MULTI-TASKING: Balanceamento de Backlog",
            conselho: "<strong>Direcionamento Executivo:</strong> Você está cruzando múltiplos pilares hoje (Operação, Estudo e Logística de Rua). Para não quebrar o ritmo, siga o framework Scrum à risca: ordene por prioridade financeira e execute rigorosamente uma por uma, blindando sua mente contra distrações.",
            versiculo: "<strong>Salmos 37:5</strong> - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'",
            borda: "#ffffff22", textoCor: "#ffffff"
        }
    };

    // LOGICA DE SÍNTESE INTELIGENTE (Resolve o conflito de múltiplas tarefas acumuladas)
    let selecionado = MatrizSabedoria.geral;
    
    if (minhaListaDeItens.length === 0) {
        selecionado = MatrizSabedoria.quadroLimpo;
    } else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        selecionado = MatrizSabedoria.sucessoTotal;
    } else {
        // Regra de Ouro 1: Se envolve mãe/afeto, assume prioridade emocional total sobre a esteira de código
        if (focos.familia) selecionado = MatrizSabedoria.familia;
        
        // Regra de Ouro 2: Se envolve crise/superação, entra no gerenciamento de crise
        else if (focos.superao) selecionado = MatrizSabedoria.superao;
        
        // Regra de Ouro 3: Se tem Trabalho E Estudo ATIVOS juntos, ele ativa o modo híbrido corporativo (DUAL CORE)
        else if (focos.trabalho && focos.estudo) selecionado = MatrizSabedoria.multiTrabalhoEstudo;
        
        // Regras Lineares se o dia estiver concentrado em um único bloco de ação
        else if (focos.trabalho) selecionado = MatrizSabedoria.trabalho;
        else if (focos.estudo) selecionado = MatrizSabedoria.estudo;
        else if (focos.principios) selecionado = MatrizSabedoria.principios;
        else if (focos.saude) selecionado = MatrizSabedoria.saudeRotina;
    }

    // Renderização final com a estrutura hierárquica atualizada
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
