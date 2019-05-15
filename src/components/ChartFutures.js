import React from "react";
var Chart = require("chart.js");

class ChartFutures extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'https://www.quandl.com/api/v3/datasets/ODA/',
            futuresTitle: '',
            query: '?',
            apikey: 'api_key=' + 'zqzws_Cdwyy_r6nHyFCT',
            searchURL: '',
            commodity: '',
            commodityBlank: false,
            // https://www.quandl.com/api/v3/datasets/ODA/PORANG_USD?api_key=zqzws_Cdwyy_r6nHyFCT
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            searchURL: this.state.baseURL + this.state.futuresTitle + this.state.query + this.state.apikey
        }, () => {
            console.log(this.state.searchURL)
            fetch(this.state.searchURL)
                .then(response => {
                    return response.json()
                }).then(json => {
                    // set variable for all futures data returned
                    let futuresArray = []
                    futuresArray.push(json)
                    // set variable for dates
                    let fdates = futuresArray[0].dataset.data
                    let futuresDates = []
                    fdates.forEach(function (item) {
                        futuresDates.push(item[0]);
                    });
                    console.log(futuresDates)
                    // set variable for prices
                    let fprices = futuresArray[0].dataset.data
                    let futuresPrices = []
                    fdates.forEach(function (item) {
                        futuresPrices.push(item[1]);
                    });
                    console.log(futuresPrices)
                    this.setState({
                        commodityBlank: true,
                        commodity: futuresArray,
                        dates: futuresDates,
                        prices: futuresPrices,
                        futuresTitle: ''
                    })
                },
                    err => console.log(err))
        })
    }

    componentDidMount() {
        const node = this.node;

        var myChart = new Chart(node, {
            type: 'line',
            data: {
                labels: this.state.dates,
                datasets: [{
                    label: 'Good Until',
                    data: this.state.prices,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='futuresTitle'>Title</label>
                        <input
                            id='futuresTitle'
                            type='text'
                            value={this.state.futuresTitle}
                            onChange={this.handleChange}
                        />
                        <input
                            type='submit'
                            value='Find commodity Info'
                        />
                    </form>
                    {(this.state.commodityBlank)
                        ? <p>{this.state.commodity[0].dataset.data[0]}</p>
                        : ''
                    }

                </React.Fragment>
                <canvas
                    style={{ width: 75, height: 100 }}
                    ref={node => (this.node = node)}
                />
            </div>
        );
    }
}

export default ChartFutures;