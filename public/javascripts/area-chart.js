function areaChart(json) {
    const parse = JSON.parse(json)
    const data = verificaLista(parse)

    const cfg = {
        type: 'line',
        title: 'Disciplinas',
        data: {
            datasets: [{
                data: data,
                fill: true,
                backgroundColor: 'rgba(255, 119, 46, 0.2)',
                borderColor: '#FF772E',
                tickColor: '#fff',

                parsing: {
                    xAxisKey: 'semestre',
                    yAxisKey: 'qt'
                }
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    type: 'linear',
                    min: 0,
                    max: 6,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2],
                        color: function(context) {
                            return '#fff'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    backgroundColor: '#314073',
                    titleMarginTop: 10,
                    titleColor: '#fff',
                    textColor: '#fff',
                    titleFontSize: 14,
                    caretPadding: 20,

                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },

                    callbacks: {
                        label: (data) => {
                            const textoTooltip = []
                            const temp = parseInt(data.label.slice(0)) - 1

                            if (data.dataset.data[temp].qt === 0) {
                                return 'Não há disciplinas'
                            }

                            for (let i = 0; i < data.dataset.data[temp].disciplinas.length; i++) {
                                textoTooltip.push(data.dataset.data[temp].disciplinas[i])
                            }
                            return textoTooltip
                        }
                    }
                }
            }
        }
    }

    const ctx = document.getElementById('myChart').getContext('2d')

    // eslint-disable-next-line no-undef
    const myChart = new Chart(ctx, cfg)
}

function verificaLista(json) {
    const discPorSemestreAtual = []
    let discRestantes = 41
    const data = json

    // Organizando os dados do json
    for (let i = 0; i < json.length; i++) {
        if (json[i].disciplinas.length === 0 && json[i].qt === 20) {
            discPorSemestreAtual.push(null)
        } else {
            discPorSemestreAtual.push(json[i].qt)
            discRestantes -= json[i].qt
        }
    }

    let semestresRestante = 0
    if (discRestantes % 6 === 0) {
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

    // Preencher com os valores novos o novo json
    for (let i = 0; i < data.length; i++) {
        data[i].qt = discPorSemestreAtual[i]
    }

    return data
}
