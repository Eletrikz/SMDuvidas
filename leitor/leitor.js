function lerPDF(arquivo) {
    var fs = require('fs');
    var PDFParser = require('pdf2json');

    var pdfCaminho = arquivo;
    console.log(arquivo)

    if (fs.existsSync(pdfCaminho)) {

        var pdfParser = new PDFParser();
        var countAprovado = 0; // Conta as disciplinas aprovadas
        var cont = 0 // Auxiliador para contar as disciplinas dos semestres
        var listaDisciplinas = [] // Lista com as disciplinas por semestre
        var semestres = ['2013.1', '2013.2', '2014.1', '2014.2', '2015.1', '2015.2', '2016.1', '2016.2', '2017.1', '2017.2', '2018.1', '2018.2', '2019.1', '2019.2', '2020.1', '2020.2', '2021.1', '2021.2']

        // Verifica se passou dos dados gerais
        var verificaComponentes = false

        // Verifica se 'entrou' em um semestre
        var verificaSemestre = false

        // Controle para a 1a vez 'entrou' em um semestre
        var primeiro = true

        // Variável de controle para validar um novo semestre
        var checaSemestre = ''

        // Contador para auxiliar a recuperação dos dados
        var contAux = 0
        var infoDiscente = []
        var infoCurso = []

        // Variável para indicar onde começa uma disciplina
        var contAuxDisciplina = 0
        var infoListaDisciplinas = []
        var infoDisciplinas = []

        // Variável para controlar o espaço de uma disciplina
        var checaDisciplina = false

        pdfParser.on("pdfParser_dataError", function(errData) {
            console.error(errData.parserError)
        });

        pdfParser.on("pdfParser_dataReady", function(pdfData) {

            pdfData.formImage.Pages.forEach(function(page, index) {

                page.Texts.forEach(function(text, index) {

                    text.R.forEach(function(t) {

                        // Informações do discente
                        if (contAux == 3 || contAux == 4 || contAux == 7 || contAux == 11 || contAux == 12 || contAux == 21) {
                            infoDiscente.push(decodeURIComponent(t.T))
                        }

                        // Informações do curso
                        if (contAux == 25 || contAux == 28 || contAux == 31 || contAux == 35) {
                            infoCurso.push(decodeURIComponent(t.T))
                        }

                        // Pegar os dados a partir das tabelas com os semestres
                        if (decodeURIComponent(t.T) == 'Componentes Curriculares Cursados/Cursando' && !verificaComponentes) {
                            verificaComponentes = true
                        }

                        // 'Abre' o espaço do semestre atual
                        if (verificaComponentes && semestres.includes(decodeURIComponent(t.T)) && !verificaSemestre) {
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
                        if (verificaComponentes && checaSemestre != decodeURIComponent(t.T) && semestres.includes(decodeURIComponent(t.T))) {
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

            var discRestantes = 41 - countAprovado
            var horasAprovadas = countAprovado * 64
            var horasRestantes = discRestantes * 64 + 64 + 192
            var progresso = parseInt((horasAprovadas + 64 + 192) / 2880 * 100)

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
            let data = JSON.stringify(dados, null, 2)
            fs.writeFileSync('./dados/dados.json', data)
        });

        pdfParser.loadPDF(pdfCaminho);

    } else {
        console.log('Arquivo não localizado');
    }
}

module.exports = {
    lerPDF
}