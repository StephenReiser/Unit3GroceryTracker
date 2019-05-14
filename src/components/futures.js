import React from "react";
var Chart = require("chart.js");

class ChartFutures extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        const node = this.node;

        var myChart = new Chart(node, {
            type: 'doughnut',
            data: {
                labels: ['Green','Red'],
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
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
\                        <canvas
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