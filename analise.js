import { getChaveStorageAtual } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const chaveStorage = getChaveStorageAtual();
    const registros = JSON.parse(localStorage.getItem(chaveStorage)) || [];

    if (registros.length === 0) {
        document.querySelector('.container-analise').innerHTML = `
            <div class="cabecalho"><h2>ANÁLISE GRÁFICA DA PRODUÇÃO</h2></div>
            <p>Nenhum dado de produção foi salvo este mês para gerar análises.</p>
            <div class="container-botoes" style="justify-content: center;">
                <button onclick="window.location.href='resumo.html'" class="botao-voltar">Voltar</button>
            </div>
        `;
        return;
    }

    // --- Processamento de Dados ---

    // 1. DADOS: Produção e Sucata por Dia
    const producaoPorDia = registros.reduce((acc, reg) => {
        const data = reg.data;
        if (!acc[data]) {
            acc[data] = { produzido: 0, sucata: 0 };
        }
        acc[data].produzido += parseInt(reg.quantidade, 10);
        acc[data].sucata += parseInt(reg.descartadas, 10);
        return acc;
    }, {});

    const labelsDias = Object.keys(producaoPorDia).sort((a, b) => a.localeCompare(b));
    const dataProduzidoDia = labelsDias.map(dia => producaoPorDia[dia].produzido);
    const dataSucataDia = labelsDias.map(dia => producaoPorDia[dia].sucata);

    /**
     * Função genérica para agrupar dados de produção por uma chave específica (operador, peca, etc.).
     * @param {string} chave - A propriedade do registro a ser usada para agrupamento.
     * @returns {{labels: string[], data: number[]}} - Os rótulos e dados para o gráfico.
     */
    const processarDadosPorChave = (chave) => {
        const dadosAgrupados = registros.reduce((acc, reg) => {
            const valorChave = reg[chave].trim();
            acc[valorChave] = (acc[valorChave] || 0) + parseInt(reg.quantidade, 10);
            return acc;
        }, {});
        return {
            labels: Object.keys(dadosAgrupados),
            data: Object.values(dadosAgrupados)
        };
    };

    // 2. DADOS: Produção por Operador, Peça e Máquina
    const { labels: labelsOperadores, data: dataProducaoOperador } = processarDadosPorChave('operador');
    const { labels: labelsPecas, data: dataProducaoPeca } = processarDadosPorChave('peca');
    const { labels: labelsMaquinas, data: dataProducaoMaquina } = processarDadosPorChave('maquina');

    // --- Renderização dos Gráficos ---

    const corDestaque = 'rgba(0, 255, 255, 0.8)';
    const corExcluir = 'rgba(192, 57, 43, 0.8)';
    const corGrid = 'rgba(255, 255, 255, 0.2)';
    const corTexto = '#fff';
    
    /**
     * Função para gerar as opções padrão para os gráficos.
     * @param {string} titleText - O título do gráfico.
     * @param {boolean} showLegend - Se a legenda deve ser exibida.
     */
    const getChartOptions = (titleText, showLegend = false) => ({
        responsive: true,
        plugins: {
            title: { display: true, text: titleText, color: corTexto, font: { size: 16 } },
            legend: { display: showLegend, labels: { color: corTexto } }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: corTexto },
                grid: { color: corGrid }
            },
            x: { ticks: { color: corTexto }, grid: { color: corGrid } }
        }
    });

    // GRÁFICO 1: Produção e Sucata por Dia
    const ctxProducaoDia = document.getElementById('graficoProducaoDia').getContext('2d');
    new Chart(ctxProducaoDia, {
        type: 'bar',
        data: {
            labels: labelsDias,
            datasets: [
                {
                    label: 'Qtd. Produzida',
                    data: dataProduzidoDia,
                    backgroundColor: corDestaque,
                    borderColor: corDestaque,
                    borderWidth: 1
                },
                {
                    label: 'Qtd. Sucata',
                    data: dataSucataDia,
                    backgroundColor: corExcluir,
                    borderColor: corExcluir,
                    borderWidth: 1
                }
            ]
        },
        options: getChartOptions('Produção Diária (Total vs. Sucata)', true)
    });

    // GRÁFICO 2: Produção por Operador
    const ctxProducaoOperador = document.getElementById('graficoProducaoOperador').getContext('2d');
    new Chart(ctxProducaoOperador, {
        type: 'bar',
        data: {
            labels: labelsOperadores,
            datasets: [{
                label: 'Qtd. Produzida',
                data: dataProducaoOperador,
                backgroundColor: corDestaque,
            }]
        },
        options: getChartOptions('Produção Total por Operador')
    });

    // GRÁFICO 3: Produção por Peça
    const ctxProducaoPeca = document.getElementById('graficoProducaoPeca').getContext('2d');
    new Chart(ctxProducaoPeca, {
        type: 'bar',
        data: {
            labels: labelsPecas,
            datasets: [{
                label: 'Qtd. Produzida',
                data: dataProducaoPeca,
                backgroundColor: corDestaque,
            }]
        },
        options: getChartOptions('Produção Total por Peça')
    });

    // GRÁFICO 4: Produção por Máquina
    const ctxProducaoMaquina = document.getElementById('graficoProducaoMaquina').getContext('2d');
    new Chart(ctxProducaoMaquina, {
        type: 'bar',
        data: {
            labels: labelsMaquinas,
            datasets: [{
                label: 'Qtd. Produzida',
                data: dataProducaoMaquina,
                backgroundColor: corDestaque,
            }]
        },
        options: getChartOptions('Produção Total por Máquina')
    });

});