const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const Disciplinas = require('./../database/Disciplinas')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'temp/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

const leitor = require('./../leitor/leitor')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
})

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
        res.render('progressoManual', { disciplinas: disciplinas })
    })
})

/* POST upload manual page. */
router.post('/upload/uploadManual', (req, res) => {
    const lista = []
    let discAprovadas = 0

    try {
        const s1 = req.body.disciplinasObrigatorias1.length
        lista.push(s1)
        discAprovadas += s1
    } catch (error) {}

    try {
        const s2 = req.body.disciplinasObrigatorias2.length
        lista.push(s2)
        discAprovadas += s2
    } catch (error) {}

    try {
        const s3 = req.body.disciplinasObrigatorias3.length
        lista.push(s3)
        discAprovadas += s3
    } catch (error) {}

    try {
        const s4 = req.body.disciplinasObrigatorias4.length
        lista.push(s4)
        discAprovadas += s4
    } catch (error) {}

    try {
        const s5 = req.body.disciplinasObrigatorias5.length
        lista.push(s5)
        discAprovadas += s5
    } catch (error) {}

    try {
        const s6 = req.body.disciplinasObrigatorias6.length
        lista.push(s6)
        discAprovadas += s6
    } catch (error) {}

    try {
        const s7 = req.body.disciplinasObrigatorias7.length
        lista.push(s7)
        discAprovadas += s7
    } catch (error) {}

    try {
        const s8 = req.body.disciplinasObrigatorias8.length
        lista.push(s8)
        discAprovadas += s8
    } catch (error) {}

    let so = 0
    try {
        so = req.body.disciplinasOptativas.length
        discAprovadas += so
    } catch (error) {}

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] <= 3) {
            const v = 5 - lista[i]
            if (so < v) {
                lista[i] += so
                so = 0
            } else {
                lista[i] += v
                so -= v
            }
        }
    }

    const discRestantes = 41 - discAprovadas
    const horasAprovadas = discAprovadas * 64
    const horasRestantes = discRestantes * 64 + 64 + 192
    const progresso = parseInt((horasAprovadas + 64 + 192) / 2880 * 100)

    const dados = {
        listaDisciplinas: lista,
        discAprovadas: discAprovadas,
        discRestantes: discRestantes,
        horasAprovadas: horasAprovadas,
        horasRestantes: horasRestantes,
        progresso: progresso
    }
    const dados2 = null, dados3 = null
    
    const data = JSON.stringify(dados, null, 2)
    const data2 = JSON.stringify(dados2, null, 2)
    const data3 = JSON.stringify(dados3, null, 2)
    fs.writeFile('./dados/dados.json', data, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })

    fs.writeFile('./dados/dadosDisciplinas.json', data2, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })

    fs.writeFile('./dados/dadosGerais.json', data3, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })

    res.redirect('/dashboard')
})

/* GET upload historico page. */
router.get('/progressoPdf', function(req, res) {
    res.render('progressoPdf')
})

/* POST upload histórico page. */
router.post('/upload/upload', upload.single('file'), function(req, res) {
    if (path.extname(req.file.path) !== '.pdf') {
        fs.unlink(req.file.path, (err) => {
            if (err) throw err
            console.log('Arquivo estranho was deleted')
        })
        res.send('Formato do arquivo não suportado')
    } else {
        Disciplinas.findAll({
            raw: true,
            where:{tipo:3},
            order: [
                ['codigo', 'ASC']
            ]
        }).then(disciplinas => {
            leitor.lerPDF(req.file.path, disciplinas)
            res.redirect('/dashboard')
        })
    }
})

/* GET dashboard page. */
router.get('/dashboard', (req, res) => {
    // Disable caching for content files
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', 0)
    setTimeout(() => {
        const json = require('./../dados/dados')
        const json2 = require('./../dados/dadosDisciplinas')
        const json3 = require('./../dados/dadosGerais')

        res.render('dashboard', { json, json2, json3 })
    }, 800)

    /*setTimeout(() => {
        fs.unlink('./dados/dados.json', (err) => {
            if (err) throw err
            console.log('json was deleted')
        })
        fs.unlink('./dados/dadosDisciplinas.json', (err) => {
            if (err) throw err
            console.log('json was deleted')
        })
        fs.unlink('./dados/dadosGerais.json', (err) => {
            if (err) throw err
            console.log('json was deleted')
        })
    }, 1000) */
})

router.get('/atividadesComplementares', (req, res) => {
    res.render('ativComplementares')
})

module.exports = router
