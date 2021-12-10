var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

const Disciplinas = require('./../database/Disciplinas')

const multer = require('multer')
    //const storage = multer.memoryStorage()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "temp/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage })

const leitor = require('./../leitor/leitor')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET escolha page. */
router.get('/escolhaProgresso', function(req, res) {
    res.render('escolhaProgresso')
})

/* GET progresso manual page. */
router.get('/progressoManual', function(req, res) {
    Disciplinas.findAll({
        raw: true,
        order: [
            ['codigo', 'ASC']
        ]
    }).then(disciplinas => {
        res.render("progressoManual", { disciplinas: disciplinas })
    })
})

/* POST upload manual page. */
router.post('/upload/uploadManual', (req, res) => {
    var lista = []
    var discAprovadas = 0

    try {
        var s1 = req.body.disciplinasObrigatorias1.length
        lista.push(s1)
        discAprovadas += s1
    } catch (error) {}

    try {
        var s2 = req.body.disciplinasObrigatorias2.length
        lista.push(s2)
        discAprovadas += s2
    } catch (error) {}

    try {
        var s3 = req.body.disciplinasObrigatorias3.length
        lista.push(s3)
        discAprovadas += s3
    } catch (error) {}

    try {
        var s4 = req.body.disciplinasObrigatorias4.length
        lista.push(s4)
        discAprovadas += s4
    } catch (error) {}

    try {
        var s5 = req.body.disciplinasObrigatorias5.length
        lista.push(s5)
        discAprovadas += s5
    } catch (error) {}

    try {
        var s6 = req.body.disciplinasObrigatorias6.length
        lista.push(s6)
        discAprovadas += s6
    } catch (error) {}

    try {
        var s7 = req.body.disciplinasObrigatorias7.length
        lista.push(s7)
        discAprovadas += s7
    } catch (error) {}

    try {
        var s8 = req.body.disciplinasObrigatorias8.length
        lista.push(s8)
        discAprovadas += s8
    } catch (error) {}

    var so = 0
    try {
        so = req.body.disciplinasOptativas.length
        discAprovadas += so
    } catch (error) {}

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] <= 3) {
            var v = 5 - lista[i]
            if (so < v) {
                lista[i] += so
                so = 0
            } else {
                lista[i] += v
                so -= v
            }
        }
    }

    var discRestantes = 41 - discAprovadas
    var horasAprovadas = discAprovadas * 64
    var horasRestantes = discRestantes * 64 + 64 + 192
    var progresso = parseInt((horasAprovadas + 64 + 192) / 2880 * 100)

    let dados = {
        listaDisciplinas: lista,
        discAprovadas: discAprovadas,
        discRestantes: discRestantes,
        horasAprovadas: horasAprovadas,
        horasRestantes: horasRestantes,
        progresso: progresso
    }
    let data = JSON.stringify(dados, null, 2)
    fs.writeFileSync('./dados/dados.json', data)

    res.redirect('/dashboard')
})

/* GET upload historico page. */
router.get('/progressoPdf', function(req, res) {
    if (fs.existsSync('dados/dados.json')) {
        fs.unlinkSync('./dados/dados.json')
    }

    res.render('progressoPdf')
})

/* POST upload histórico page. */
router.post('/upload/upload', upload.single('file'), function(req, res) {
    if (path.extname(req.file.path) != '.pdf') {
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('Arquivo estranho was deleted');
        });
        res.send('Formato do arquivo não suportado')
    } else {
        leitor.lerPDF(req.file.path)
        res.redirect('/dashboard')
    }

})

/* GET dashboard page. */
router.get('/dashboard', (req, res) => {
    setTimeout(() => {
        var json = require('./../dados/dados')
            //var json = JSON.parse(jsonData)

        res.render("dashboard", { json })
    }, 800)
})

module.exports = router;