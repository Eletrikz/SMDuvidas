let discPorSemestre = []
var horasFeitas = 0
var horasRestantes = 0

var select = document.getElementById("selecSemestre").addEventListener('change', function() {
    var tamanho = 0
    var getChecked = []

    for (let i = 1; i < 9; i++) {
        var s = 'disciplinasObrigatorias' + i
        getChecked.push(document.getElementsByName(s))

        if (getChecked.length > 0) {
            tamanho += getChecked.length
        }
    }

    var semestreEscolhido = parseInt(this.value)
    for (let i = 0; i < semestreEscolhido; i++) {
        for (let j = 0; j < getChecked[i].length; j++) {
            getChecked[i][j].checked = true;
        }
    }

});