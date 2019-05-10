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
      groceries: [],
      food_name: '',
      food_qty: 1,
      expiration_date: "2019-05-01",
      storage_area: ''
    }
    this.getGroceries = this.getGroceries.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddGrocery = this.handleAddGrocery.bind(this)
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

handleChange (event) {
  this.setState({[event.currentTarget.id]: event.currentTarget.value})
}

handleSubmit (event) {
  event.preventDefault()
  fetch(baseURL + '/groceries', {
    method: 'POST',
    body: JSON.stringify({food_name: this.state.food_name, food_qty: this.state.food_qty, expiration_date: this.state.expiration_date, storage_area: this.state.storage_area}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then (res => res.json())
    .then (resJson => {
      this.handleAddGrocery(resJson)
      this.setState({
        food_name: '',
        food_qty: 1,
        expiration_date: "2019-05-01",
        storage_area: ''
      })
  }).catch (error => console.error({'Error': error}))
}

handleAddGrocery(item) {
  const copyGroceries = [...this.state.groceries]
  copyGroceries.unshift(item)
  this.setState({
    groceries: copyGroceries,
    name: ''
  })
}



  render() {
  return (
    <div className="container">
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="food_name">Food Name</label>
        <input type='text' id='food_name' value={this.state.food_name} placeholder='New Item' onChange={this.handleChange} />
        <label htmlFor="food_qty">Quantity</label>
        <input type='number' id='food_qty' value={this.state.food_qty} placeholder='1' onChange={this.handleChange} />
        <label htmlFor="expiration_date">Expiration Date</label>
        <input type='date' id='expiration_date' value={this.state.expiration_date} placeholder='' onChange={this.handleChange} />
        <label htmlFor="storage_area">Storage Area</label>
        <input type='text' id='storage_area' value={this.state.storage_area} placeholder='' onChange={this.handleChange} />
        <input type='submit' value='Add Food'/>
      </form>

      <table>
        <tbody>
          {this.state.groceries.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.food_name}</td>
                <td>{item.food_qty}</td>
                <td>{item.storage_area}</td>
                <td>{item.createdAt}</td>
                <td>{item.expiration_date}</td>
                
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
