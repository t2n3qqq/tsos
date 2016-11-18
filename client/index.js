console.log(window.location);
fetch(`http://localhost:3005/file/ch1.bin`, {
  method: 'GET',
})
  .then(res => res.json())
  .then(data => {
    console.log('DATA', data);
    // Create a timer
    const xValues = data.values.map((item, index) => data.dataBlockReceiveTime/data.chanelPoints * (index + 1));
    // const max = _.max(...data.values);
    // const min = _.min(...data.values);
    // console.log(min, max);
    const start = +new Date();

    // Create the chart
    var orgHighchartsRangeSelectorPrototypeRender = Highcharts.RangeSelector.prototype.render;
    Highcharts.RangeSelector.prototype.render = function (min, max) {
        orgHighchartsRangeSelectorPrototypeRender.apply(this, [min, max]);
        var leftPosition = this.chart.plotLeft,
            topPosition = this.chart.plotTop+5,
            space = 2;
        this.zoomText.attr({
            x: leftPosition,
            y: topPosition + 15
        });
        leftPosition += this.zoomText.getBBox().width;
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].attr({
                x: leftPosition,
                y: topPosition
            });
            leftPosition += this.buttons[i].width + space;
        }
    };


    var chartingOptions = {

    };

    console.log('XXX', jugalsLib.getBasicChartOptions());

    chartingOptions = Object.assign({}, jugalsLib.getBasicChartOptions(), chartingOptions);

    var chart = new Highcharts.StockChart(chartingOptions);
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


  /*
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

        inputEnabled: false,
        buttons: [{
            type: 'all',
            text: 'All'
        }],
          // selected: 3
      },

      plotOptions: {
      area: {
          fillColor: {
              linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
              },
              stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
          },
          marker: {
              radius: 2
          },
          lineWidth: 1,
          states: {
              hover: {
                  lineWidth: 1
              }
          },
          threshold: null
      },
      dataLabels: {
          enabled: true,
          format: '{y}'
      }
  },

      yAxis: {
          title: {
              text: 'Signal'
          },
          min: data.min,
          max: data.max,
      },

      xAxis: {
        title: {
            text: 'time'
        },
        // categories: xValues,
        labels: {
            formatter: function () {
                return '<p>' + xValues[this.value].toFixed(5) + '</p>';
            }
        }
      },

      title: {
          text: 'Signals - file: ' + data.fileName,
      },

      subtitle: {
          text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
      },

      series: [{
          name: 'Signal',
          data: data.values,
          pointStart: data.values[0],
          pointInterval: 1,
          // tooltip: {
          //     valueDecimals: 4,
          // }
      }]

  });
  */
