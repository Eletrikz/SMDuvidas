const fs = require('fs')
const PDFParser = require('pdf2json')

let countAprovado = 0 // Conta as disciplinas aprovadas
let cont = 0 // Auxiliador para contar as disciplinas dos semestres
let listaDisciplinas = [] // Lista com as disciplinas por semestre

// Verifica se passou dos dados gerais
let verificaComponentes = false

// Verifica se 'entrou' em um semestre
let verificaSemestre = false

// Controle para a 1a vez 'entrou' em um semestre
let primeiro = true

// Variável de controle para validar um novo semestre
let checaSemestre = ''

// Contador para auxiliar a recuperação dos dados
let contAux = 0
let infoDiscente = []
let infoCurso = []

// Variável para indicar onde começa uma disciplina
let contAuxDisciplina = 0
let infoListaDisciplinas = []
let infoDisciplinas = []

// Variável para controlar o espaço de uma disciplina
let checaDisciplina = false

let discRestantes = 0
let horasAprovadas = 0
let horasRestantes = 0
let progresso = 0

function adicionaDiscente(linha) {
    if (contAux === 3 || contAux === 4 || contAux === 7 || contAux === 11 || contAux === 12 || contAux === 21) {
        infoDiscente.push(linha)
    }
}

function adicionaCurso(linha) {
    if (contAux === 25 || contAux === 28 || contAux === 31 || contAux === 35) {
        infoCurso.push(linha)
    }
}

function verificaFimSemestre(linha) {
    if ((linha.slice(-2) === '.1' || linha.slice(-2) === '.2') && linha.length === 6) {
        return true
    }
    return false
}

function verificaDados(dados) {
    let c = 0

    Object.keys(dados).forEach((item) => {
        if (!dados[item]) {
            c += 1
        } else if (dados[item] === 0) {
            c += 1
        }
    })
    return !(c > 0)
}

function criaJsonDisciplina() {
    const dataArray = []
    const semestreAux = []
    semestreAux.push(infoListaDisciplinas[0][0])
    const aux = listaDisciplinas.length

    for (let i = 0; i < 12; i += 1) {
        const obj = {
            semestre: '',
            qt: 0,
            disciplinas: []
        }

        obj.semestre = (`${i + 1}º semestre`)

        if (i < aux) {
            obj.qt = listaDisciplinas[i]
            for (let j = 0; j < infoListaDisciplinas.length; j += 1) {
                if (semestreAux[semestreAux.length - 1] === infoListaDisciplinas[j][0] && infoListaDisciplinas[j][2].includes('APROVADO')) {
                    obj.disciplinas.push(`${infoListaDisciplinas[j][3]} - ${infoListaDisciplinas[j][1]}`)
                } else if (!semestreAux.includes(infoListaDisciplinas[j][0])) {
                    semestreAux.push(infoListaDisciplinas[j][0])
                    break
                }
            }
        } else {
            obj.qt = 20
            obj.disciplinas = []
        }

        dataArray.push(obj)
    }
    return dataArray
}

function resetaVar() {
    countAprovado = 0
    cont = 0
    listaDisciplinas = []

    verificaComponentes = false

    verificaSemestre = false

    primeiro = true

    checaSemestre = ''

    contAux = 0
    infoDiscente = []
    infoCurso = []

    contAuxDisciplina = 0
    infoListaDisciplinas = []
    infoDisciplinas = []

    checaDisciplina = false

    return true
}

function lerPDF(arquivo) {
    const pdfCaminho = arquivo
    console.log(pdfCaminho)

    if (fs.existsSync(pdfCaminho)) {
        const pdfParser = new PDFParser()

        pdfParser.on('pdfParser_dataError', (errData) => {
            console.error(errData.parserError)
        })

        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            pdfData.formImage.Pages.forEach((page, index) => {
                page.Texts.forEach((text, ind) => {
                    text.R.forEach((t) => {
                        // Informações do discente
                        adicionaDiscente(decodeURIComponent(t.T))

                        // Informações do curso
                        adicionaCurso(decodeURIComponent(t.T))

                        // Pegar os dados a partir das tabelas com os semestres
                        if (decodeURIComponent(t.T) === 'Componentes Curriculares Cursados/Cursando' && !verificaComponentes) {
                            verificaComponentes = true
                        }

                        // 'Abre' o espaço do semestre atual
                        if (verificaComponentes && verificaFimSemestre(decodeURIComponent(t.T)) && !verificaSemestre) {
                            verificaSemestre = true
                            checaSemestre = decodeURIComponent(t.T)

                            // Tem-se duas vezes o semestre, na primeira vez precisa verificar isso, depois é corrigido
                            if (primeiro) {
                                contAuxDisciplina = contAux + 1
                            } else {
                                contAuxDisciplina = contAux
                            }
                        }

                        // 'Abre' o espaço da disciplina atual
                        if (verificaComponentes && verificaSemestre) {
                            // Verifica se uma disciplina começa e se é a primeira, a partir do semestre
                            if (checaSemestre === decodeURIComponent(t.T) && contAuxDisciplina === contAux) {
                                checaDisciplina = true
                                primeiro = false
                            }

                            // Verifica se uma disciplina começa
                            if (!primeiro && checaSemestre === decodeURIComponent(t.T) && contAuxDisciplina !== contAux) {
                                contAuxDisciplina = contAux
                                checaDisciplina = true
                            }

                            // Adiciona as informações da disciplina
                            if (!primeiro && checaDisciplina && (contAuxDisciplina === contAux || contAuxDisciplina + 1 === contAux)) {
                                infoDisciplinas.push(decodeURIComponent(t.T))
                            } else if (!primeiro && checaDisciplina && contAuxDisciplina + 3 === contAux) {
                                // ^Verifica se foi aprovado na disciplina e aumenta o contador, ou só adiciona o status
                                if (decodeURIComponent(t.T) === 'APROVADO' || decodeURIComponent(t.T) === 'APROVADO MÉDIA') {
                                    countAprovado += 1
                                    cont += 1
                                }
                                infoDisciplinas.push(decodeURIComponent(t.T))
                            } else if (!primeiro && checaDisciplina && contAuxDisciplina + 4 === contAux) {
                                // ^No último elemento a ser pego, é resetado algumas variáveis
                                infoDisciplinas.push(decodeURIComponent(t.T).slice(0, 7))
                                infoListaDisciplinas.push(infoDisciplinas)
                                infoDisciplinas = []
                                checaDisciplina = false
                            }
                        }

                        // 'Fecha' o espaço do semestre atual
                        if (verificaComponentes && verificaFimSemestre(decodeURIComponent(t.T)) && checaSemestre !== decodeURIComponent(t.T)) {
                            listaDisciplinas.push(cont)
                            cont = 0
                            verificaSemestre = false
                        }

                        // Último semestre
                        if (verificaComponentes && decodeURIComponent(t.T) === 'Trancamentos e Matriculas Institucionais') {
                            listaDisciplinas.push(cont)
                            cont = 0
                            verificaComponentes = false
                            verificaSemestre = false
                        }

                        contAux += 1
                    })
                })
            })

            discRestantes = 41 - countAprovado
            horasAprovadas = countAprovado * 64 + 64 + 192
            horasRestantes = discRestantes * 64
            progresso = parseInt((horasAprovadas / 2880) * 100, 10)

            const dadosDisciplnas = criaJsonDisciplina()

            const dados = {
                dadosDiscente: infoDiscente,
                dadosCurso: infoCurso,
                dadosListaDisciplinas: infoListaDisciplinas,
                listaDisciplinas,
                discAprovadas: countAprovado,
                discRestantes,
                horasAprovadas,
                horasRestantes,
                progresso
            }

            // Verifica se tem dados
            if (verificaDados(dados) && verificaDados(dadosDisciplnas)) {
                const data = JSON.stringify(dados, null, 2)
                const data2 = JSON.stringify(dadosDisciplnas, null, 2)

                fs.writeFile('./dados/dados.json', data, (err) => {
                    if (err) throw err
                    console.log('The file has been saved!')
                })
                fs.writeFile('./dados/dadosDisciplnas.json', data2, (err) => {
                    if (err) throw err
                    console.log('The file has been saved!')
                })

                resetaVar()
            }
            fs.unlinkSync(pdfCaminho)
        })

        pdfParser.loadPDF(pdfCaminho)
    } else {
        console.log('Arquivo não localizado')
    }
}

module.exports = {
    lerPDF,
    verificaFimSemestre,
    verificaDados,
    resetaVar
}
