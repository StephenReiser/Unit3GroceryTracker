import React from 'react';

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'your heroku bakend url here'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: []
    }
    this.getGroceries = this.getGroceries.bind(this)
  }
  getGroceries() {
    fetch(baseURL+ '/groceries')
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({
       groceries: parsedData
     }),
      err=> console.log(err))
 }
 componentDidMount(){
  this.getGroceries()
}

  render() {
  return (
    <div className="container">
      <form>
        {/* <label htmlFor></label> */}
      </form>

      <table>
        <tbody>
          {this.state.groceries.map(item => {
            return (
              <tr key={item._id}>
                <td> Name: {item.food_name}</td>
                <td> Qty: {item.food_qty}</td>
                <td>Storage Area: {item.storage_area}</td>
                <td> Purchased Date {item.createdAt}</td>
                <td> Expiration Date: {item.expiration_date}</td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
}
export default App;
