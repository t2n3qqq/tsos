console.log(window.location);
fetch(`http://localhost:3005/file/ch1.bin`, {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    console.log('DATA', data);
    // Create a timer
    var start = +new Date();

    // Create the chart
    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {
                    this.setTitle(null, {
                        text: 'Built chart in ' + (new Date() - start) + 'ms'
                    });
                }
            },
            zoomType: 'x'
        },

        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 3,
                text: '3d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 3
        },

        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },

        title: {
            text: 'Hourly temperatures in Vik i Sogn, Norway, 2009-2015'
        },

        subtitle: {
            text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
        },

        series: [{
            name: 'Temperature',
            data: data.values,
            pointStart: 0,
            pointInterval: data.dataBlockReceiveTime,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            }
        }]

    });
    // var g = new Dygraph(document.getElementById("graph"),
    //   [data.values, data.values.map((item, index) => {
    //     return data.dataBlockReceiveTime * (index + 1)})], {
    //     legend: 'always',
    //     animatedZooms: true,
    //     title: 'dygraphs chart template',
    //   });
  })
  .catch(error => {
    console.log('GET request `/book/` faild', error);
  });
