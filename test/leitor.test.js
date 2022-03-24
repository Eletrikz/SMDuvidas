t = require('./../leitor/leitor')

describe('Testes unitários', () => {
    /* it('Teste se é um histórico', () => {
        linha = 'Componentes Curriculares Cursados/Cursando'
        expect(t.inicioSemestres(linha, false)).toBe(true)
    }) */

    it('Teste identifica semestre', () => {
        semestre = '2019.2'
        expect(t.verificaFimSemestre(semestre)).toBe(true)
    })

    it('Teste os dados', () => {
        dados = { nome: 'Gomes', idade: 24, salario: 0 }
        expect(t.verificaDados(dados)).toBe(false)
    })

    it('Teste reseta variáveis', () => {
        expect(t.resetaVar()).toBe(true)
    })
})