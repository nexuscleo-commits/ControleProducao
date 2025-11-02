import { getChaveStorageAtual } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const botaoSalvar = document.querySelector('.botao-salvar');
    const botaoVisualizar = document.querySelector('.botao-visualizar');

    const copyrightSpan = document.getElementById('copyright');
    copyrightSpan.innerHTML += `${new Date().getFullYear()} NexusCleo.`;

    if (botaoSalvar) {
        botaoSalvar.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão do botão

            // 1. Coletar os dados do formulário
            const dataValue = document.getElementById('data').value;

            // Função para formatar a data para DD/MM/YYYY
            const formatarData = (data) => {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            };

            const dataFormatada = formatarData(dataValue);

            const dados = {
                data: dataFormatada,
                operador: document.getElementById('operador').value,
                peca: document.getElementById('peca').value,
                operacao: document.getElementById('operacao').value,
                quantidade: document.getElementById('quantidade').value,
                descartadas: document.getElementById('descartadas').value,
                maquina: document.getElementById('maquina').value,
            };

            // Validação para garantir que os campos não estão vazios e os números são válidos
            if (Object.values(dados).some(value => value === '')) {
                alert('Por favor, preencha todos os campos antes de salvar.');
                return;
            }

            const quantidade = parseInt(dados.quantidade, 10);
            const descartadas = parseInt(dados.descartadas, 10);

            if (isNaN(quantidade) || isNaN(descartadas) || quantidade < 0 || descartadas < 0) {
                alert('As quantidades produzida e de sucata devem ser números positivos.');
                return;
            }

            // 2. Salvar os dados no localStorage
            const chaveStorage = getChaveStorageAtual();
            // Buscamos os registros existentes ou iniciamos um array vazio
            const registros = JSON.parse(localStorage.getItem(chaveStorage)) || [];
            // Adicionamos o novo registro
            registros.push(dados);
            // Salvamos o array atualizado de volta no localStorage
            localStorage.setItem(chaveStorage, JSON.stringify(registros));

            alert('Dados salvos com sucesso!');
            // Opcional: Limpar o formulário após salvar
            document.querySelectorAll('.campo-dado input').forEach(input => input.value = '');
        });
    }

    if (botaoVisualizar) {
        botaoVisualizar.addEventListener('click', () => {
            window.location.href = 'resumo.html'; // Redireciona para a página de resumo
        });
    }
});
