/**
 * Retorna a chave do localStorage baseada no mês e ano atuais.
 * Exemplo: 'producao_cnc_2025_12'
 * @returns {string} A chave formatada para o localStorage.
 */
export function getChaveStorageAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // getMonth() é 0-11
    return `producao_cnc_${ano}_${mes}`;
}