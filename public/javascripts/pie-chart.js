function pieChart(horasAprovadas, horasRestantes, progresso) {
    const cfg = {
        type: 'doughnut',
        data: {
            labels: ['Horas completadas', 'Horas restantes'],
            datasets: [{
                data: [horasAprovadas, horasRestantes],
                backgroundColor: ['#FF772E', '#F6D467'],
                hoverBackgroundColor: ['#FF772E', '#F6D467']
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                tooltip: {
                    backgroundColor: '#314073',
                    titleMarginTop: 10,
                    titleColor: '#fff',
                    textColor: '#fff',
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: true,
                    caretPadding: 10
                },
                legend: {
                    display: false
                }
            },
            cutout: '40%'
        }
    }
    document.getElementById('porcBarra').style.width = progresso + '%'
    const ctx = document.getElementById('myPieChart').getContext('2d')

    // eslint-disable-next-line no-undef
    const myPieChart = new Chart(ctx, cfg)
}
