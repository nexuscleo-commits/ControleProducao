#  Sistema de Gestão de Produção CNC

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Uma aplicação web simples e eficiente para registrar, visualizar e analisar dados de produção de usinagem CNC. O projeto foi desenvolvido com HTML, CSS e JavaScript puro, utilizando o `localStorage` do navegador para persistência de dados de forma local.

## 📋 Sobre o Projeto

Este sistema foi criado para oferecer uma solução rápida e de fácil utilização para o controle de produção em chão de fábrica. Ele permite que operadores ou gestores insiram dados diários de produção, que são armazenados e organizados por mês, facilitando o acompanhamento e a geração de relatórios visuais.

## ✨ Funcionalidades Principais

- **Entrada de Dados Simplificada**: Um formulário claro e objetivo para registrar informações essenciais da produção, como data, operador, peça, quantidade produzida, sucata e máquina utilizada.
- **Armazenamento Local**: Os dados são salvos diretamente no navegador do usuário (`localStorage`), segregados por mês e ano, garantindo que a informação seja relevante ao período corrente.
- **Resumo de Produção**: Uma tabela interativa exibe todos os registros do mês. As funcionalidades incluem:
    - **Edição em Linha**: Dê um duplo clique em qualquer célula para editar a informação diretamente na tabela.
    - **Seleção e Exclusão**: Selecione uma linha e exclua o registro de forma segura, com confirmação.
- **Análise Gráfica**: Uma página dedicada à visualização de dados através de gráficos gerados com a biblioteca **Chart.js**, incluindo:
    - Produção Diária (Total vs. Sucata).
    - Produção Total por Operador.
    - Produção Total por Peça.
    - Produção Total por Máquina.
- **Design Responsivo e Moderno**: Interface com tema escuro, projetada para ser agradável e funcional em diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica das páginas.
- **CSS3**: Estilização moderna, incluindo variáveis, Flexbox e um design responsivo.
- **JavaScript (ES6+ Modules)**: Toda a lógica da aplicação, manipulação do DOM e interatividade.
- **Chart.js**: Biblioteca para a criação dos gráficos de análise.

## 🚀 Como Utilizar

Como este é um projeto puramente front-end e não requer um servidor, você pode executá-lo localmente de forma muito simples:

1.  **Clique no link abaixo:**
    Para abrir a aplicação deireto no seu navegador clique no link abaixo.
    https://nexuscleo-commits.github.io/ControleProducao/index.html

2.  **Clone o repositório para sua máquina local:**
    Para salvar uma cópia do projeto em seu computador clique no link abaixo.
    https://github.com/nexuscleo-commits/ControleProducao/archive/refs/heads/main.zip

3.  **Abra o arquivo `index.html` no seu navegador de preferência.**

    Pronto! A aplicação estará funcionando e você já pode começar a registrar os dados de produção.

## 🖼️ Telas da Aplicação

### Tela de Cadastro
*Formulário principal para inserção dos dados de produção.*

!Tela de Cadastro

### Tela de Resumo
*Tabela com todos os registros do mês, permitindo edição e exclusão.*

!Tela de Resumo

### Tela de Análise Gráfica
*Dashboard com gráficos que consolidam as informações de produção.*

!Tela de Análise

*(Nota: As imagens acima são placeholders. Substitua-as por capturas de tela reais da sua aplicação.)*

##  futuras melhorias

- [ ] Implementar um backend com banco de dados (Node.js, Python, etc.) para persistência de dados centralizada.
- [ ] Adicionar sistema de autenticação de usuários.
- [ ] Criar funcionalidade de exportação de dados (CSV, Excel).
- [ ] Adicionar mais filtros na tela de resumo e análise.

---

*Desenvolvido por NexusCleo &copy; 2025*
