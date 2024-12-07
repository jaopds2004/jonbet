javascript:(function() {
    const menu = createMenu();

    // Adiciona a folha de estilos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    document.body.appendChild(menu);
    document.addEventListener('dblclick', (e) => toggleMenu(menu, e.clientY, e.clientX));

    // Cria o menu
    function createMenu() {
        const m = document.createElement('div');
        Object.assign(m.style, {
            position: 'fixed',
            width: '290px',
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #00FF00',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'none',
            zIndex: '9999',
            maxWidth: '100%',
            boxSizing: 'border-box',
        });

        m.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/HV6Yqrj/a-6235889258005dd77352c139d73f670f-removebg-preview.png" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px; color: white;'>JV SYSTEM</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px; display: flex; align-items: center; justify-content: center;'>
                        <i class="fab fa-instagram" style="margin-right: 5px; color: #00FF00;"></i>
                        joaovitorp2004
                    </div>
                    <div id="hackingMessage" style="font-size: 14px; color: #00FF00; margin-top: 10px;">Bem-vindo ao jv System</div>
                </div>
                <span id='closeMenu' style="cursor: pointer; font-size: 14px; color: white;">❌</span>
            </div>
            <div id="messageArea" style="margin-top: 10px; padding: 5px; background-color: #333; border-radius: 5px;">
                <p id="messageText" style="margin: 0; font-size: 14px;">Nenhuma mensagem no momento</p>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span class="chance" style="color: #00FF00; font-weight: bold;">Chance: 99.99%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    Entrar no: <span class="colorIndicator">🟢</span>
                </div>
                <div id="winMessage" style="color: #00FF00; font-weight: bold; display: none;"></div>
                <div style="margin-top: 10px; font-size: 12px; color: #00FF00;">
                    <div style="background-color: rgba(255, 255, 255, 0.1); padding: 3px 5px; border-radius: 5px; display: inline-block;">
                        SHA256 | Versão: 4.0
                    </div>
                </div>
            </div>
        `;
        return m;
    }

    // Função para garantir que o menu sempre abra corretamente
    function toggleMenu(menu, y, x) {
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Função para exibir mensagens no menu
    function showMessage(message) {
        const messageText = document.getElementById('messageText');
        messageText.textContent = message;
    }

    // Define mensagens de hacking
    const hackingMessages = [
        "Buscando cor...",
        "Obtendo dados...",
        "Acessando DB...",
        "Injetando código...",
        "Desligando firewall...",
        "Carregando arquivos...",
        "Transmitindo dados..."
    ];
    let currentMessageIndex = 0;
    const hackingMessageElement = document.getElementById('hackingMessage');
    hackingMessageElement.innerText = hackingMessages[currentMessageIndex];

    // Função para alterar as mensagens de hacking
    function changeHackingMessage() {
        currentMessageIndex = (currentMessageIndex + 1) % hackingMessages.length;
        hackingMessageElement.innerText = hackingMessages[currentMessageIndex];
    }

    setInterval(changeHackingMessage, 3000); // Altera a mensagem a cada 3 segundos

    // Fecha o menu quando o botão "X" for clicado
    function closeMenu() {
        menu.style.display = 'none';
    }

    document.getElementById('closeMenu').addEventListener('click', closeMenu);

    // Variável para controlar a previsão atual
    let currentPrediction = null;
    let winDisplayed = false; // Controla se a mensagem de vitória foi exibida
    let banca = 1000; // Valor inicial da banca
    const percentualEntrada = 0.1; // 10% da banca

    // Função para processar o resultado da API
    function processResult(apiResult) {
        const colorSymbol = apiResult.color; // Mantemos o valor numérico diretamente
        const displayColorSymbol = colorSymbol === 0 ? '⚪️' : colorSymbol === 1 ? '🟢' : '⚫';
        document.querySelector(".colorIndicator").innerText = displayColorSymbol;

        // Definindo a chance, limitando a 100%
        let chance = Math.min(90 + Math.random() * 10, 100).toFixed(2);
        document.querySelector('.chance').innerText = `Chance: ${chance}%`;

        // Verifica se o status da API é "complete"
        if (apiResult.status === "complete") {
            // Verifica se a previsão corresponde ao resultado da API
            if (currentPrediction === colorSymbol) {
                const winMessageElement = document.getElementById('winMessage');
                winMessageElement.innerText = `Win no: ${displayColorSymbol}`; // Exibe a mensagem "Win!"
                winMessageElement.style.display = "block"; // Mostra a mensagem "Win!"
                winDisplayed = true; // Define que a mensagem de vitória foi exibida

                // Aumenta a banca em 20% em caso de vitória
                banca += percentualEntrada * banca * 2;

                // Oculta a mensagem após 3 segundos
                setTimeout(() => {
                    winMessageElement.style.display = "none"; 
                    winDisplayed = false; // Reseta o estado de exibição da mensagem
                }, 3000);
            } else {
                // Se a previsão não corresponder ao resultado, subtrai a entrada da banca
                banca -= percentualEntrada * banca;

                // Reseta winDisplayed
                if (winDisplayed) {
                    document.getElementById('winMessage').style.display = "none";
                }
                winDisplayed = false; // Reseta o estado de exibição da mensagem
            }
        }

        // Exibe o valor atualizado da banca
        console.log(`Banca atual: R$ ${banca.toFixed(2)}`);
    }

    // Simulação de API
    let status = "rolling";
    async function play() {
        if (status === "rolling") {
            // Gera uma previsão antes de completar o giro
            currentPrediction = Math.floor(Math.random() * 3); // Previsão aleatória: 0, 1 ou 2
            const data = {
                "status": "complete", // Simulando que o giro foi completo
                "color": Math.floor(Math.random() * 3),
                "roll": Math.floor(Math.random() * 100) // Simulando um valor de rolagem
            };
            processResult(data); // Processa o resultado após o giro
            status = "complete"; // Altera o status para evitar previsões múltiplas
        }
    }

    // Inicializa o loop de previsão
    function init() {
        setInterval(() => {
            play();
            status = "rolling"; // Pronto para o próximo giro
        }, 1000 * 15); // Muda o status e faz uma nova previsão a cada 13 segundos
    }

    // Inicia o ciclo de previsões
    init();

    // Exemplo de como exibir uma mensagem ao abrir o menu
    showMessage('Bem-vindo ao JV System!');

})();
