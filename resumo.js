import { getChaveStorageAtual } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const chaveStorage = getChaveStorageAtual();
    let registros = JSON.parse(localStorage.getItem(chaveStorage)) || [];
    const containerCabecalho = document.getElementById('cabecalho-tabela');
    const containerCorpo = document.getElementById('corpo-tabela-container');
    const botaoExcluir = document.querySelector('.botao-excluir');

    if (!registros || registros.length === 0) {
        containerCorpo.innerHTML = '<p>Nenhum dado de produção foi salvo ainda.</p>';
        botaoExcluir.style.display = 'none'; // Esconde o botão se não houver dados
        return;
    }

    function renderizarTabela() {
        containerCabecalho.innerHTML = ''; // Limpa o cabeçalho
        containerCorpo.innerHTML = ''; // Limpa o corpo da tabela

        if (registros.length === 0) {
            containerCorpo.innerHTML = '<p>Todos os dados foram excluídos.</p>';
            botaoExcluir.style.display = 'none'; // Esconde o botão se não há mais dados
            return;
        }

        // --- Cria a Tabela do Cabeçalho (Estática) ---
        const tabelaCabecalho = document.createElement('table');
        const thead = tabelaCabecalho.createTHead();
        const linhaCabecalho = thead.insertRow();
        
        // É importante ter as chaves dos objetos para a edição funcionar corretamente
        const chavesObjeto = ['data', 'operador', 'peca', 'operacao', 'quantidade', 'descartadas', 'maquina'];

        const titulos = ['Data', 'Operador', 'Peça', 'Operação', 'Qtd. Produzida', 'Qtd. Sucata', 'N° Máquina'];
        titulos.forEach(titulo => {
            const th = document.createElement('th');
            th.textContent = titulo;
            linhaCabecalho.appendChild(th);
        });
        containerCabecalho.appendChild(tabelaCabecalho);

        // --- Cria a Tabela do Corpo (Rolável) ---
        const tabelaCorpo = document.createElement('table');
        const corpoTabela = tabelaCorpo.createTBody();

        registros.forEach((registro, index) => {
            const linha = corpoTabela.insertRow();
            linha.dataset.index = index; // Armazena o índice do registro na linha

            // Usar as chaves garante a ordem correta e facilita a edição
            chavesObjeto.forEach((chave, cellIndex) => {
                const celula = linha.insertCell();
                
                // Formata a data para exibição, mas mantém o valor original no registro
                if (chave === 'data' && registro[chave]) {
                    celula.textContent = registro[chave].split('-').reverse().join('/');
                } else {
                    celula.textContent = registro[chave];
                }

                // Adiciona o evento de duplo clique para editar a célula
                celula.addEventListener('dblclick', () => {
                    // Evita que a edição comece se já houver um input na célula
                    if (celula.querySelector('input')) return;

                    const valorAtual = celula.textContent;
                    const input = document.createElement('input');
                    
                    // Define o tipo de input com base na coluna
                    if (chave === 'data') {
                        input.type = 'date';
                        input.value = registro[index][chave]; // Usa o valor original AAAA-MM-DD
                    } else if (['quantidade', 'descartadas', 'maquina'].includes(chave)) {
                        input.type = 'number';
                        input.value = valorAtual;
                    } else {
                        input.type = 'text';
                        input.value = valorAtual;
                    }

                    input.style.width = '95%'; // Ajusta o input ao tamanho da célula

                    // Função para salvar a alteração
                    const salvarAlteracao = () => {
                        const novoValor = input.value;
                        // Formata a data para exibição após a edição
                        celula.textContent = (chave === 'data' && novoValor) ? novoValor.split('-').reverse().join('/') : novoValor;

                        // Atualiza o array de registros e o localStorage
                        registros[index][chave] = novoValor;
                        localStorage.setItem(chaveStorage, JSON.stringify(registros));
                    };

                    // Salva ao perder o foco
                    input.addEventListener('blur', salvarAlteracao);

                    // Salva com "Enter" ou cancela com "Escape"
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            input.blur(); // Aciona o evento blur para salvar
                        } else if (e.key === 'Escape') {
                            input.blur(); // Apenas sai do modo de edição, o blur já restaura o valor se não houver mudança
                        }
                    });

                    celula.innerHTML = '';
                    celula.appendChild(input);
                    input.focus();
                });
            });
            
            // Adiciona o evento de clique para selecionar a linha
            linha.addEventListener('click', () => {
                const linhaSelecionadaAnterior = document.querySelector('tbody tr.selected');
                
                // Remove a seleção anterior, se houver
                if (linhaSelecionadaAnterior) {
                    linhaSelecionadaAnterior.classList.remove('selected');
                }
                
                // Adiciona a classe 'selected' à linha clicada
                linha.classList.add('selected');
            });
        });

        containerCorpo.appendChild(tabelaCorpo);
    }

    // Evento de clique para o botão principal de exclusão
    botaoExcluir.addEventListener('click', () => {
        const linhaSelecionada = document.querySelector('tbody tr.selected');

        if (!linhaSelecionada) {
            alert('Por favor, selecione pelo menos uma linha para excluir.');
            return;
        }

        const confirmacao = confirm(`Tem certeza que deseja excluir o registro selecionado?`);
        if (confirmacao) {
            const indexParaExcluir = parseInt(linhaSelecionada.dataset.index, 10);

            // 1. Remove os itens do array 'registros'
            registros.splice(indexParaExcluir, 1);

            // 2. Atualiza o localStorage com o novo array
            if (registros.length > 0) {
                localStorage.setItem(chaveStorage, JSON.stringify(registros));
            } else {
                localStorage.removeItem(chaveStorage); // Limpa o storage se não houver mais registros
            }

            // 3. Re-renderiza a tabela para refletir a mudança
            renderizarTabela();

            alert('Registro excluído com sucesso!');
        }
    });

    // Renderiza a tabela pela primeira vez
    renderizarTabela();
});
