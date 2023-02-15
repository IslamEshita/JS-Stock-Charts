async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // Creating an array of stock data per instructions
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    function getColor(stock) {        
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function highestStockPrice(stock)
    {
        let highest = 0;
        stock.values.forEach(value => {
            if(value.high > highest)
            {
                highest = value.high;
            }
        })

        return highest;
    }


    function averageStockPrice(stock)
    {
        let total = 0;
        stock.values.forEach(value => {           
                total = total + parseFloat(value.close);           
        })



        return total / stock.values.length;
    }
    

    // Reversing the stock data
    stocks.forEach(function(stock) {
        stock.values.reverse();
    })

    // Adding the time chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    // Add the highest chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels:stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => highestStockPrice(stock)),
                backgroundColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(18, 4, 209, 0.7)',
                    'rgba(166, 43, 158, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',                   
                ]
            }]
        }
    });


    // Add the averange chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels:stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => averageStockPrice(stock)),
                backgroundColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(18, 4, 209, 0.7)',
                    'rgba(166, 43, 158, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',                   
                ]
            }]
        }
    });
}

main()