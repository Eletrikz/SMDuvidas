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

        // Variáveis boolean de controle
        var verificaComponentes = false
        var verificaSemestre = false

        // Variável de controle para validar um novo semestre
        var checaSemestre = ''

        pdfParser.on("pdfParser_dataError", function(errData) {
            console.error(errData.parserError)
        });

        pdfParser.on("pdfParser_dataReady", function(pdfData) {

            pdfData.formImage.Pages.forEach(function(page, index) {

                page.Texts.forEach(function(text, index) {

                    text.R.forEach(function(t) {

                        // Pegar os dados a partir das tabelas com os semestres
                        if (decodeURIComponent(t.T) == 'Componentes Curriculares Cursados/Cursando' && !verificaComponentes) {
                            verificaComponentes = true
                        }

                        // 'Abre' o espaço do semestre atual
                        if (verificaComponentes && semestres.includes(decodeURIComponent(t.T)) && !verificaSemestre) {
                            verificaSemestre = true
                            checaSemestre = decodeURIComponent(t.T)
                        }

                        // Verifica se foi aprovado e soma
                        if (verificaComponentes && verificaSemestre && (decodeURIComponent(t.T) == 'APROVADO' || decodeURIComponent(t.T) == 'APROVADO MÉDIA')) {
                            countAprovado++
                            cont++
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

                    });

                });

            });

            var discRestantes = 41 - countAprovado
            var horasAprovadas = countAprovado * 64
            var horasRestantes = discRestantes * 64 + 64 + 192
            var progresso = parseInt((horasAprovadas + 64 + 192) / 2880 * 100)

            let dados = {
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