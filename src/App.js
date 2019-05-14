import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import EditItem from './components/EditItem'
import NewForm from './components/NewForm'
import NavBar from './components/NavBar'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://quiet-garden-36890.herokuapp.com'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [],
      food_name: '',
      food_qty: 1,
      expiration_date: "2019-05-01",
      storage_area: '',
      editFood_name: '',
      editFood_qty: '',
      editExpiration_date: "2019-05-01",
      editStorage_area: '',
      groceriesDetails: {}
    }
    this.getGroceries = this.getGroceries.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddGrocery = this.handleAddGrocery.bind(this)
    this.deleteGrocery = this.deleteGrocery.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.setIndividualItem = this.setIndividualItem.bind(this)
  }
  getGroceries() {
    fetch(baseURL + '/groceries')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => this.setState({
        groceries: parsedData
      }),
        err => console.log(err))
  }
  componentDidMount() {
    this.getGroceries()
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(baseURL + '/groceries', {
      method: 'POST',
      body: JSON.stringify({ food_name: this.state.food_name, food_qty: this.state.food_qty, expiration_date: this.state.expiration_date, storage_area: this.state.storage_area }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        this.handleAddGrocery(resJson)
        this.setState({
          food_name: '',
          food_qty: 1,
          expiration_date: "2019-05-01",
          storage_area: ''
        })
      }).catch(error => console.error({ 'Error': error }))
  }

  handleAddGrocery(item) {
    const copyGroceries = [...this.state.groceries]
    copyGroceries.unshift(item)
    this.setState({
      groceries: copyGroceries,
      name: ''
    })
  }

  deleteGrocery(id) {
    fetch(baseURL + '/groceries/' + id, {
      method: 'DELETE'
    }).then(response => {
      const findIndex = this.state.groceries.findIndex(grocery => grocery._id === id)
      const copyGroceries = [...this.state.groceries]
      copyGroceries.splice(findIndex, 1)
      this.setState({ groceries: copyGroceries })
    })
  }

setIndividualItem(item) {
  console.log(item)
  const date = new Date(item.expiration_date)

  // let year = date.getFullYear();
  // let month = (1 + date.getMonth()).toString().padStart(2, ‘0’);
  // let day = date.getDate().toString().padStart(2, ‘0’);

  // function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
 
    // return month + "/" + day + "/" + year;
//  }
//  getFormattedDate(dateTest)
  
  this.setState({
    groceriesDetails: item,
    editFood_name: item.food_name,
    editFood_qty: item.food_qty,
    editStorage_area: item.storage_area,
    editExpiration_date: year+'-'+month+'-'+day
  })
}





  handleEdit (id) {
        console.log(id)
        // not reading ID for some reason
        fetch(baseURL + '/groceries/' + id, {
          method: 'PUT',
          body: JSON.stringify({food_name: this.state.editFood_name, food_qty: this.state.editFood_qty, expiration_date: this.state.editExpiration_date, storage_area: this.state.editStorage_area}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then (res => res.json())
          .then (resJson => {
            console.log(baseURL + '/groceries/' + id)
            console.log(resJson)
            console.log(this.state.groceriesDetails.editFood_qty)
            const findIndex = this.state.groceries.findIndex(item => item._id === id)
            const copyGroceries = [...this.state.groceries]
            copyGroceries.splice(findIndex, 1, resJson)

            this.setState({
              groceries: copyGroceries,
              editFood_name: '',
              editFood_qty: 0,
              editExpiration_date: '2019-05-01',
              editStorage_area: ''
            })
        }).catch (error => console.error({'Error': error}))
      }
  render() {
    return (
      <Router>
      <div className="container-fluid">
       <NavBar />
      <NewForm handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} food_name = {this.state.food_name} food_qty = {this.state.food_qty} storage_area = {this.state.storage_area} expiration_date={this.state.expiration_date}/>

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
                  <td><button onClick={() => this.deleteGrocery(item._id)}>X</button></td>
                  <td><Link to='/edit'><button onClick={() => this.setIndividualItem(item)}>Edit</button></Link></td>

                </tr>
              )
            })}
          </tbody>
        </table>
        <Route path='/edit' render={(props)=><EditItem editFood_name={this.state.editFood_name}handleEdit={this.handleEdit} editStorage_area = {this.state.editStorage_area} editFood_name = {this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange = {this.handleChange} groceriesDetails = {this.state.groceriesDetails}/>}/>
        
        
        {/*
        <EditItem handleEdit={this.handleEdit} editStorage_area = {this.state.editStorage_area} editFood_name = {this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange = {this.handleChange} groceriesDetails = {this.state.groceriesDetails}/> */}
      </div>
      </Router>
    );
  }
}
export default App;
