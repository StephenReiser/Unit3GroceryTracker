import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import EditItem from './components/EditItem'
import ChartExpiration from './components/ChartExpiration'
import NewForm from './components/NewForm'
import NavBar from './components/NavBar'
import NutritionInfo from './components/NutritionInfo.js'
import RecipeInfo from './components/RecipeInfo'

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
      storage_area: 'cabinet',
      editFood_name: '',
      editFood_qty: '',
      editExpiration_date: "2019-05-01",
      editStorage_area: '',
      groceriesDetails: {},
      baseURL: 'https://api.nutritionix.com/v1_1/search/',
      query: '?',
      range: 'results=0%3A20&cal_min=0&cal_max=50000&',
      fields: 'fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_ingredient_statement%2Cnf_calories%2Cnf_cholesterol&',
      authorization: 'appId=f95dc4d9&appKey=25ec40f8781dd35636bf9456ff98197b',
      searchURL: ''

      // "https://api.edamam.com/search?q=chicken&app_id=$9d94e852&app_key=$480a66a770af9cbc380a775b8959453c&from=0&to=3
    }
    this.getGroceries = this.getGroceries.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddGrocery = this.handleAddGrocery.bind(this)
    this.deleteGrocery = this.deleteGrocery.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.setIndividualItem = this.setIndividualItem.bind(this)
    this.getNutritionInfo = this.getNutritionInfo.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleEditSelect = this.handleEditSelect.bind(this)

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
  handleSelect(event) {
    this.setState({
      storage_area: event.target.value
    })
  }

  handleEditSelect(event) {
    this.setState({
      editStorage_area: event.target.value
    })
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
        console.log(resJson)
        this.handleAddGrocery(resJson)
        this.setState({
          food_name: '',
          food_qty: 1,
          expiration_date: "2019-05-01",
          storage_area: 'cabinet'
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
    let day = (1 + date.getDate()).toString().padStart(2, "0");

    // return month + "/" + day + "/" + year;
    //  }
    //  getFormattedDate(dateTest)

    this.setState({
      groceriesDetails: item,
      editFood_name: item.food_name,
      editFood_qty: item.food_qty,
      editStorage_area: item.storage_area,
      editExpiration_date: year + '-' + month + '-' + day
    })
  }





  handleEdit(id) {
    console.log(id)
    // not reading ID for some reason
    fetch(baseURL + '/groceries/' + id, {
      method: 'PUT',
      body: JSON.stringify({ food_name: this.state.editFood_name, food_qty: this.state.editFood_qty, expiration_date: this.state.editExpiration_date, storage_area: this.state.editStorage_area }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
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

      }).catch(error => console.error({ 'Error': error }))
  }


  getNutritionInfo(food_name) {
    this.setState({
      searchURL: this.state.baseURL + food_name + this.state.query + this.state.range + this.state.fields + this.state.authorization
    }, () => {
      fetch(this.state.searchURL)
        .then(response => {
          return response.json()
        }).then(json => {
          let whatever = []
          whatever.push(json)
          console.log(json)
          this.setState({
            food: whatever,
            food_Name: ''
          })
        },
          err => console.log(err))
    })
  }






  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavBar />
          <NewForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} food_name={this.state.food_name} food_qty={this.state.food_qty} storage_area={this.state.storage_area} expiration_date={this.state.expiration_date} handleSelect={this.handleSelect} />
          <div className="row">
            <div className="col"></div>
            <div className="col-9">

              <div class="card-deck">

                {this.state.groceries.map(item => {
                  // below converts expire date to a string - probably should put these into a funciton - seems to be screwed up on the 1st/last day of a month
                  let itemDate = new Date(item.expiration_date)
                  let itemYear = itemDate.getFullYear();
                  let itemMonth = (1 + itemDate.getMonth()).toString().padStart(2, "0");
                  let itemDay = (1 + itemDate.getDate()).toString().padStart(2, "0");
                  let expDate = itemYear + '-' + itemMonth + '-' + itemDay

                  // below convertes createdAt to a string
                  let createDate = new Date(item.createdAt)
                  let createYear = createDate.getFullYear();
                  let createMonth = (1 + createDate.getMonth()).toString().padStart(2, "0");
                  let createDay = createDate.getDate().toString().padStart(2, "0");
                  let createdDate = createYear + '-' + createMonth + '-' + createDay


                  return (
                    <React.Fragment key={item._id}>
                      <div class="card">
                        {/* <img src="..." class="card-img-top" alt="..." /> */}
                        <ChartExpiration expireDate={item.expiration_date} createDate={item.createdAt} />
                        <div class="card-body">
                          <h3 class="card-title">{item.food_name}</h3>
                          <p class="card-text"><b>Quantity |</b> {item.food_qty}</p>
                          <p class="card-text"><b>Created |</b> {createdDate}</p>
                          <p class="card-text"><b>Expiration |</b> {expDate}</p>
                          <p class="card-text"><b>Storage |</b> {item.storage_area}</p>
                          <div className="row">
                            <div className="col-1">
                              <button class="btn btn-outline-danger btn-sm" onClick={() => this.deleteGrocery(item._id)}>X</button>
                            </div>
                            <div className="col-1">
                              <button class="btn btn-outline-success btn-sm" onClick={() => this.addToSearchIngredients(item.food_name)}>+</button>
                            </div>
                            <div className="col-3">
                              <Link to='/edit'><button class="btn btn-outline-primary btn-sm" onClick={() => this.setIndividualItem(item)}>Edit</button></Link>
                            </div>
                            <div className="col-6">
                              <button class="btn btn-outline-success btn-sm" onClick={() => this.getNutritionInfo(item.food_name)}>Nutrition Info</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>

                  )

                })}
              </div>

            </div>
            <div className="col"></div>
          </div>

        </div>


        {(this.state.food)
          ? <NutritionInfo food={this.state.food} />
          : ''
        }
        <Route path='/edit' render={(props) => <EditItem editFood_name={this.state.editFood_name} handleEdit={this.handleEdit} editStorage_area={this.state.editStorage_area} editFood_name={this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange={this.handleChange} groceriesDetails={this.state.groceriesDetails} handleSelect={this.handleEditSelect} />} />

        <RecipeInfo />
        <div>
          {/*
        <EditItem handleEdit={this.handleEdit} editStorage_area = {this.state.editStorage_area} editFood_name = {this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange = {this.handleChange} groceriesDetails = {this.state.groceriesDetails}/> */}
        </div>
      </Router >
    );
  }
}

export default App;
