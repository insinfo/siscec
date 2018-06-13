<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Dashboard</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">

    <!-- Animate Modal -->
    <link rel="stylesheet" href="vendor/animatedModal/1.0/animate.min.css">
    <script src="vendor/animatedModal/1.0/animatedModal.js"></script>

    <!-- DataTables -->
    <script type="application/javascript" src="vendor/dataTables/1.10.16/datatables.js"></script>
    <script type="application/javascript" src="vendor/dataTables/1.10.16/material-design-dataTables.js"></script>

    <!-- mCustomScrollbar -->
    <link rel="stylesheet" href="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.css">
    <script src="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.js"></script>

    <!-- jQuery Masked Input Plugin Josh Bush (digitalbush.com) -->
    <script src="vendor/jquery.maskedinput/1.4.1/jquery.maskedinput.js"></script>

    <!-- ESTILO CUSTOMIZADO -->
    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/customModal.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>

    <!-- JS CUSTOMIZADO -->
    <script src="utils/customModal.js"></script>
    <script src="utils/customLoading.js"></script>
    <script src="utils/RESTClient.js"></script>
    <script src="utils/dynamicListener.js"></script>
    <script src="utils/utils.js"></script>
    <script src="viewModel/ConstantsModel.js"></script>

    <!-- MODIFICACOES PROVISORIAS ALEX -->
    <script src="/cdn/Vendor/highcharts/highcharts.js"></script>
    <script src="/cdn/Vendor/highcharts/highcharts-3d.js"></script>
    <script src="/cdn/Vendor/highcharts/exporting.js"></script>
    <script src="/cdn/Vendor/highcharts/highcharts-more.js"></script>
    <script src="/cdn/Vendor/highcharts/solid-gauge.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {

            /* Gráfico de Pizza */
            Highcharts.chart('graf1', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {text: 'Panorama de contratos por secretaria', verticalAlign:'bottom'},
                credits: { enabled: false },
                exporting: { enabled: false },
                tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {enabled: true, format: '{point.name}'}
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Percentual de Valor de Contrato',
                    data: [
                        ['SEMUSA', 35.0],
                        ['SEMEDE', 26.8],
                        {
                            name: 'SEMAD',
                            y: 45.8,
                            sliced: true,
                            selected: true
                        },
                        ['SEMFAZ', 8.5],
                        ['SEMACI', 3.2],
                        ['PROGEN', 0.7]
                    ]
                }]
            });
            /* /Gráfico de Pizza */

            /* Total empenhado */
            var gaugeOptions = {
                chart: { type: 'solidgauge' },
                title: null,
                exporting: { enabled: false },
                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: { enabled: false },
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    title: { y: -70 },
                    labels: { y: 16 }
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };
            Highcharts.chart('container-empenhado', Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 100,
                    title: { text: 'Total EMPENHADO' }
                },
                credits: { enabled: false },
                series: [{
                    name: 'Total EMPENHADO',
                    data: [47],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}%</span><br/>' +
                        '</div>'
                    },
                    tooltip: { valueSuffix: ' km/h' }
                }]
            }));
            /* /Total empenhado */

            /* Total medido */
            var gaugeOptions2 = {
                chart: { type: 'solidgauge' },
                title: 'Total medido',
                exporting: { enabled: false },
                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: { enabled: false },
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    title: { y: -70 },
                    labels: { y: 16 }
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };
            Highcharts.chart('container-medido', Highcharts.merge(gaugeOptions2, {
                yAxis: {
                    min: 0,
                    max: 100,
                    title: { text: 'Total MEDIDO' }
                },
                credits: { enabled: false },
                series: [{
                    name: 'RPM',
                    data: [86],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}%</span><br/>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' revolutions/min'
                    }
                }]
            }));
            /* /Total medido */

            /* Acompanhamento Mensal */
            Highcharts.chart('graf2', {
                chart: { type: 'area' },
                title: { text: 'Acompanhamento da medição SEMAD' },
                credits: { enabled: false },
                exporting: { enabled: false },
                xAxis: {
                    categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
                    title: { enabled: false }
                },
                yAxis: {
                    title: { text: 'Milhões de Reais' },
                    labels: { formatter: function () { return this.value / 1; } }
                },
                tooltip: {
                    split: true,
                    valueSuffix: ' milhões'
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: { lineWidth: 1, lineColor: '#666666' }
                    }
                },
                series: [{
                    name: 'COGEP',
                    data: [1, 1.4, 1.7, 1.8, 2.1, 2.2, 2.4, 2.5, 2.9]
                }, {
                    name: 'COFOP',
                    data: [2.1, 2.8, 3.1, 3.3, 3.4, 3.6, 3.6, 3.9, 4.1]
                }, {
                    name: 'COTINF',
                    data: [0.2, 0.4, 0.5, 0.5, 0.7, 1.1, 1.3, 1.9, 3.2]
                }, {
                    name: 'DELCO',
                    data: [5, 6, 7, 9, 12, 18, 18.2, 22, 23.5]
                }, {
                    name: 'DEPAG',
                    data: [2, 2, 2, 6, 9, 15, 17, 19, 22]
                }]
            });
            /* /Acompanhamento Mensal */
        });
    </script>
    <!-- !MODIFICACOES PROVISORIAS ALEX -->

</head>
<body style="background-color: #DDDDDD">
<div class="container-fluid containerInsideIframe" style="padding-left: 8px; padding-right: 8px">
    <div class="row card">
        <div class="card-content ">
            <div class="col s12 m5">
                <span class="card-title">Visão Geral</span>
                <div id="graf1" style="height: 400px;display: block"></div><br/><br/>
            </div>
            <div class="col s12 m7">
                <!-- grafico aqui -->
                <div class="row">
                    <br/><br/>
                    <div class="col s12 m12" style="background-color: #ffffff">
                        <div style="margin: 0 auto">
                            <i class="purple-text large material-icons">monetization_on</i>
                            <span class="purple-text large" style="display: inline-block;position: relative; top:-22px;font-size:4em">43.874.782,29</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m6">
                        <div id="container-empenhado" style="width: 300px; height: 200px"></div>
                    </div>
                    <div class="col s12 m6">
                        <div id="container-medido" style="width: 300px; height: 200px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row card">
        <div class="col s12">
            <div class="card-content ">
                <span class="card-title"></span>
                <div id="graf2" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
            </div>
            <div class="card-action"></div>
        </div>
    </div>
</div>
</body>
</html>