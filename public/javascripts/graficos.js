function graficos(horasAprovadas, horasRestantes, s1 = null, s2 = null, s3 = null, s4 = null, s5 = null, s6 = null, s7 = null, s8 = null, s9 = null, s10 = null, s11 = null, s12 = null) {
    var lista = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12]
    var listaCorreta = verificaLista(lista, horasAprovadas)
        // Area Chart Example
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["1º semestre", "2º semestre", "3º semestre", "4º semestre", "5º semestre", "6º semestre", "7º semestre", "8º semestre", "9º semestre", "10º semestre", "11º semestre", "12º semestre"],
            datasets: [{
                label: "Disciplinas",
                lineTension: 0.3,
                backgroundColor: "rgba(255, 119, 46, 0.2)",
                borderColor: "#FF772E",
                pointRadius: 3,
                pointBackgroundColor: "#FF772E",
                pointBorderColor: "#FF772E",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#FF772E",
                pointHoverBorderColor: "#FF772E",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: listaCorreta,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 15,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 12,
                        fontColor: "rgba(255,255,255,1)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 7,
                        padding: 10,
                        fontColor: "rgba(255,255,255,1)",
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return number_format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });


    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Horas completadas", "Horas restantes"],
            datasets: [{
                data: [horasAprovadas, horasRestantes],
                backgroundColor: ['#FF772E', '#F6D467'],
                hoverBackgroundColor: ['#FF772E', '#F6D467'],
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                xPadding: 15,
                yPadding: 15,
                displayColors: true,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 50,
        },
    });
}

function verificaLista(lista, horasAprovadas) {
    var discPorSemestreAtual = lista

    var discRestantes = 41 - (horasAprovadas / 64)

    var semestresRestante = 0
    if (discRestantes % 6 == 0) {
        semestresRestante = discRestantes / 6
    } else {
        semestresRestante = parseInt(discRestantes / 6) + 1
    }

    // Preencher a lista
    for (let i = 0; i < discPorSemestreAtual.length; i++) {
        // Verifica os espaços nulos
        if (discPorSemestreAtual[i] == null) {
            if (discRestantes >= 6) {
                discPorSemestreAtual[i] = 6
                discRestantes -= 6
            } else if (discRestantes >= 1 && discRestantes < 6) {
                discPorSemestreAtual[i] = discRestantes
                discRestantes -= discRestantes
            } else {
                discPorSemestreAtual[i] = 0
            }
        }
    }

    return discPorSemestreAtual
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}