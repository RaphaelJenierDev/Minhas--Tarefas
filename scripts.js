// --- 🧭 ENGINE CORRIGIDA: DINAMISMO EXECUTIVO E ALTA PRECISÃO ---
function atualizarConsultor() {
    const feedbackText = document.getElementById('consultor-feedback');
    if (!feedbackText) return;

    let totalAtivas = 0;
    
    // Interruptores de Contexto (Garantem que nada suma do mapa)
    let detectou = {
        familia: false,
        superao: false,
        trabalho: false,
        estudo: false,
        principios: false,
        saude: false
    };

    // Contadores para volume (usados para critério de desempate dinâmico)
    let contagemPrincipios = 0;
    let contagemTrabalho = 0;

    // REGEX ULTRA SENSÍVEIS (Ajustadas para o seu vocabulário real)
    const regexFamilia = /(m[aã]e|mamy|abra[çc]|afeto|sentimento|fam[íi]li|carinh|visita|mãe)/i;
    const regexSuperao = /(supera|dif[íi]cil|venc|firme|for[çc]|desist|corag|aguent|crise|press[ão]|pressao|cansad)/i;
    const regexTrabalho = /(trabalh|client|freela|servi[cç]|palestra|jeni[eê]r|site|proposta|venda|fechar|contrat|sprint|backlog|scrum|meeting|reuni[ão]|clickup|faturam|revis[ão]|deploy)/i;
    const regexEstudo = /(est[ud]|ingl[eê]s|c[oó]dig|cursor|vibe|dev|aula|facul|gradua|aprend|labs|research|refator|poc|documenta|bootcamp|estydar)/i;
    const regexPrincipios = /(igreja|celula|celu[cç]a|culto|oraci|pastor|comunh|deus|jesus|fé|irm[ão]s|orando|oração|madrugada)/i;
    const regexSaude = /(a[cç]ucar|comprar|mercado|deliver|ifood|comida|treino|acad|moto|corrida|entrega)/i;

    // Escaneamento do Backlog
    minhaListaDeItens.forEach(item => {
        if (!item.concluida) {
            totalAtivas++;
            const texto = item.tarefa;
            
            if (regexFamilia.test(texto)) detectou.familia = true;
            if (regexSuperao.test(texto)) detectou.superao = true;
            if (regexTrabalho.test(texto)) detectou.trabalho = true;
            if (regexEstudo.test(texto)) detectou.estudo = true;
            if (regexPrincipios.test(texto)) {
                detectou.principios = true;
                contagemPrincipios++; // Conta quantas da igreja estão ativas
            }
            if (regexSaude.test(texto)) detectou.saude = true;
        }
    });

    // BANCO DE DADOS DE SABEDORIA MATRIX (Com todos os versículos blindados)
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
            conselho: "<strong>Direcionamento Executivo:</strong> O pilar de afeto e honra com sua mãe está ativo na sua esteira. A pressa do mercado e das entregas não pode invadir o ambiente familiar. Reserve um momento focado para estar com ela, recarregando sua inteligência emocional de base.",
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
            conselho: "<strong>Direcionamento Executivo:</strong> Você está equilibrando o faturamento imediato com o desenvolvimento de Know-How técnico (Cursor/Estudos). Divida seu dia em blocos rígidos de tempo (Timeboxing) para evitar a fadiga mental de alternar o foco.",
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
            conselho: "<strong>Direcionamento Executivo:</strong> A atmosfera de oração, comunhão e busca espiritual domina a sua esteira agora. Desconecte a mente dos prazos de código e do trânsito. Deixar o peso do mercado do lado de fora do templo e orar renova as suas forças estruturais.",
            versiculo: "<strong>Isaías 40:31</strong> - 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.'",
            borda: "#9d4edd77", textoCor: "#c8b6ff"
        },
        saudeRotina: {
            titulo: "🍏 LOGISTICS & HARDWARE: Proteção do Ativo",
            conselho: "<strong>Direcionamento Executivo:</strong> Suas tarefas operacionais ou rotas de delivery exigem energia física. O seu corpo é a infraestrutura mecânica onde a sua agência roda. Gerencie os riscos, pilote com segurança e não comprometa sua saúde pela pressa de chegar.",
            versiculo: "<strong>Provérbios 4:23</strong> - 'Acima de tudo que se deve guardar, guarde o seu coração, pois dele procedem as fontes da vida.'",
            borda: "#ffb70377", textoCor: "#ffb703"
        },
        geral: {
            titulo: "🧭 BACKLOG OVERVIEW: Ordenação de Fluxo",
            conselho: "<strong>Direcionamento Executivo:</strong> Múltiplas demandas na fila. Mantenha a disciplina de focar em uma tarefa por vez para evitar perda de desempenho por alternância de contexto (Context Switching). Siga a ordem do seu planejamento.",
            versiculo: "<strong>Salmos 37:5</strong> - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'",
            borda: "#ffffff22", textoCor: "#ffffff"
        }
    };

    // LÓGICA DE DECISÃO SELECIONADA (Dinâmica, Fluida e Sem Travamento)
    let selecionado = MatrizSabedoria.geral;
    
    if (minhaListaDeItens.length === 0) {
        selecionado = MatrizSabedoria.quadroLimpo;
    } else if (totalAtivas === 0 && minhaListaDeItens.length > 0) {
        selecionado = MatrizSabedoria.sucessoTotal;
    } else {
        // Se a volumetria da igreja for esmagadora (como no seu exemplo de 4 tarefas), ela assume o controle
        if (detectou.principios && contagemPrincipios >= 2) {
            selecionado = MatrizSabedoria.principios;
        }
        // Caso contrário, seguimos a hierarquia de proteção e foco
        else if (detectou.familia) selecionado = MatrizSabedoria.familia;
        else if (detectou.superao) selecionado = MatrizSabedoria.superao;
        else if (detectou.trabalho && detectou.estudo) usado = MatrizSabedoria.multiTrabalhoEstudo;
        else if (detectou.trabalho) selecionado = MatrizSabedoria.trabalho;
        else if (detectou.estudo) selecionado = MatrizSabedoria.estudo;
        else if (detectou.principios) selecionado = MatrizSabedoria.principios;
        else if (detectou.saude) selecionado = MatrizSabedoria.saudeRotina;
    }

    // Renderização com o retorno garantido do bloco de versículo
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
