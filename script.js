apiHit();
    
	var myDate = new Date();
    var graph = Highcharts.chart('mains', {
        title: {
            text: 'Price of Bitcoin in USD, GBP and EUR'
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: 'Bitcoin Price'
            }
        },
		xAxis: {
     type:'datetime'
 },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: myDate.getTime(),
                pointInterval : 5000
            }
        },
        series: [{
            name: 'USD',
            data: []
        }, {
            name: 'GBP',
            data: []
        }, {
            name: 'EUR',
            data: []
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
      });
    setInterval(apiHit,5000);
    function apiHit(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if(this.readyState == 4&&this.status == 200){
          var obj = JSON.parse(this.responseText);
          var usd = obj.bpi.USD.rate_float ;
          var gbp = obj.bpi.GBP.rate_float ;
          var eur = obj.bpi.EUR.rate_float ;
          console.log(usd);
          console.log(gbp);
          console.log(eur);
          graph.series[0].addPoint(usd);
          graph.series[1].addPoint(gbp);
          graph.series[2].addPoint(eur);
        }
      };
      xhttp.open(
        "GET",
        "https://api.coindesk.com/v1/bpi/currentprice.json",
        true
      );
      xhttp.send();
    }
    
