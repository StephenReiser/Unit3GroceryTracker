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
            commodityBlank: false
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
                    let futuresArray = []
                    futuresArray.push(json)
                    console.log(futuresArray)
                    this.setState({
                        commodityBlank: true,
                        commodity: futuresArray,
                        futuresTitle: ''
                    })
                },
                    err => console.log(err))
        })
    }

    componentDidMount() {
        const node = this.node;

        var myChart = new Chart(node, {
            type: 'doughnut',
            data: {
                labels: ['Green', 'Red'],
                // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Good Until',
                    data: [70, 30],
                    // [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
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
                        ? <p>{this.state.commodity[0].dataset.data}</p>
                        : ''
                    }

                </React.Fragment>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">                    <canvas
                        style={{ width: 100, height: 50 }}
                        ref={node => (this.node = node)}
                    />
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        );
    }
}

export default ChartFutures;