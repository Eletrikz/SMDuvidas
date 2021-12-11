const fs = require('fs');

function lerPDF(arquivo) {
    PDFParser = require('pdf2json');

    pdfCaminho = arquivo;
    console.log(pdfCaminho);

    countAprovado = 0; // Conta as disciplinas aprovadas
    cont = 0 // Auxiliador para contar as disciplinas dos semestres
    listaDisciplinas = [] // Lista com as disciplinas por semestre

    // Verifica se passou dos dados gerais
    verificaComponentes = false

    // Verifica se 'entrou' em um semestre
    verificaSemestre = false

    // Controle para a 1a vez 'entrou' em um semestre
    primeiro = true

    // Variável de controle para validar um novo semestre
    checaSemestre = ''

    // Contador para auxiliar a recuperação dos dados
    contAux = 0
    infoDiscente = []
    infoCurso = []

    // Variável para indicar onde começa uma disciplina
    contAuxDisciplina = 0
    infoListaDisciplinas = []
    infoDisciplinas = []

    // Variável para controlar o espaço de uma disciplina
    checaDisciplina = false

    if (fs.existsSync(pdfCaminho)) {

        pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", function(errData) {
            console.error(errData.parserError)
        });

        pdfParser.on("pdfParser_dataReady", function(pdfData) {

            pdfData.formImage.Pages.forEach(function(page, index) {

                page.Texts.forEach(function(text, index) {

                    text.R.forEach(function(t) {

                        // Informações do discente
                        adicionaDiscente(decodeURIComponent(t.T))

                        // Informações do curso
                        adicionaCurso(decodeURIComponent(t.T))

                        // Pegar os dados a partir das tabelas com os semestres
                        if (inicioSemestres(decodeURIComponent(t.T), verificaComponentes)) {
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
                            if (checaSemestre == decodeURIComponent(t.T) && contAuxDisciplina == contAux) {
                                checaDisciplina = true
                                primeiro = false
                            }

                            // Verifica se uma disciplina começa
                            if (!primeiro && checaSemestre == decodeURIComponent(t.T) && contAuxDisciplina != contAux) {
                                contAuxDisciplina = contAux
                                checaDisciplina = true
                            }

                            // Adiciona as informações da disciplina
                            if (!primeiro && checaDisciplina && (contAuxDisciplina == contAux || contAuxDisciplina + 1 == contAux)) {
                                infoDisciplinas.push(decodeURIComponent(t.T))
                            }

                            // Verifica se foi aprovado na disciplina e aumenta o contador, ou só adiciona o status
                            else if (!primeiro && checaDisciplina && contAuxDisciplina + 3 == contAux) {
                                if (decodeURIComponent(t.T) == 'APROVADO' || decodeURIComponent(t.T) == 'APROVADO MÉDIA') {
                                    countAprovado++
                                    cont++
                                }
                                infoDisciplinas.push(decodeURIComponent(t.T))
                            }

                            // No último elemento a ser pego, é resetado algumas variáveis
                            else if (!primeiro && checaDisciplina && contAuxDisciplina + 4 == contAux) {
                                infoDisciplinas.push(decodeURIComponent(t.T).slice(0, 7))
                                infoListaDisciplinas.push(infoDisciplinas)
                                infoDisciplinas = []
                                checaDisciplina = false
                            }
                        }

                        // 'Fecha' o espaço do semestre atual
                        if (verificaComponentes && verificaFimSemestre(decodeURIComponent(t.T)) && checaSemestre != decodeURIComponent(t.T)) {
                            listaDisciplinas.push(cont)
                            cont = 0
                            verificaSemestre = false
                        }

                        // Último semestre
                        if (verificaComponentes && decodeURIComponent(t.T) == 'Trancamentos e Matriculas Institucionais') {
                            listaDisciplinas.push(cont)
                            cont = 0
                            verificaComponentes = false
                            verificaSemestre = false
                        }

                        contAux++

                    });

                });

            });

            discRestantes = 41 - countAprovado
            horasAprovadas = countAprovado * 64
            horasRestantes = discRestantes * 64 + 64 + 192
            progresso = parseInt((horasAprovadas + 64 + 192) / 2880 * 100)

            let dados = {
                dadosDiscente: infoDiscente,
                dadosCurso: infoCurso,
                dadosListaDisciplinas: infoListaDisciplinas,
                listaDisciplinas: listaDisciplinas,
                discAprovadas: countAprovado,
                discRestantes: discRestantes,
                horasAprovadas: horasAprovadas,
                horasRestantes: horasRestantes,
                progresso: progresso
            }
            console.log(dados);

            // Verifica se tem dados
            if (verificaDados(dados)) {
                escreverJson(dados)

                resetaVar();
                fs.unlinkSync(pdfCaminho);
            } else {
                fs.unlinkSync(pdfCaminho);
            }

        });

        pdfParser.loadPDF(pdfCaminho);

    } else {
        console.log('Arquivo não localizado');
    }
}

function adicionaDiscente(linha) {
    if (contAux == 3 || contAux == 4 || contAux == 7 || contAux == 11 || contAux == 12 || contAux == 21) {
        infoDiscente.push(linha)
    }
}

function adicionaCurso(linha) {
    if (contAux == 25 || contAux == 28 || contAux == 31 || contAux == 35) {
        infoCurso.push(linha)
    }
}

function inicioSemestres(linha, verificaComponentes) {
    if (linha == 'Componentes Curriculares Cursados/Cursando' && !verificaComponentes) {
        return true
    }
}

function verificaFimSemestre(linha) {
    if ((linha.slice(-2) == '.1' || linha.slice(-2) == '.2') && linha.length == 6) {
        return true
    }
    return false
}

function verificaDados(dados) {
    let c = 0

    Object.keys(dados).forEach((item) => {
        if (!dados[item]) {
            c++
        } else if (dados[item] == 0) {
            c++
        }
    });
    console.log(c);
    return c > 0 ? false : true
}

function escreverJson(dados) {
    let data = JSON.stringify(dados, null, 2);
    fs.writeFile('./dados/dados.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function resetaVar() {
    countAprovado = 0;
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

module.exports = {
    lerPDF,
    inicioSemestres,
    verificaFimSemestre,
    verificaDados,
    resetaVar
}