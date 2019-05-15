import React from "react";
var Chart = require("chart.js");

class ChartExpiration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            green: (Date.parse(this.props.expireDate) - Date.now()) / 1000000000,
            red: 1,
        }
        // this.checkExpire = this.checkExpire.bind(this)
    }

    componentDidMount() {
        // this.checkExpire()

        const node = this.node;

        var myChart = new Chart(node, {
            type: 'doughnut',
            data: {
                labels: ['Green', 'Red'],
                datasets: [{
                    label: 'Good Until',
                    data: [this.state.green, this.state.red],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: false,
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

    // checkExpire () {
    //     let expDate = Date.parse(this.props.expireDate)
    //     if (expDate < Date.now()){
    //         console.log(expDate)
    //         console.log(Date.now())
    //         this.setState({
    //             green: 1,
    //             red: 1
    //         })} else {
    //             this.setState({
    //                 green: (Date.parse(this.props.expireDate) - Date.now()) / 1000000000,
    //                 red: 1,
    //         })}
    // }

    render() {
        return (
            <div>
                <canvas
                    style={{ width: 75, height: 100 }}
                    ref={node => (this.node = node)}
                />
            </div>
        );
    }
}

export default ChartExpiration;