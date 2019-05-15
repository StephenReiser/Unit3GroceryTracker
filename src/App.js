import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import EditItem from './components/EditItem'
import ChartExpiration from './components/ChartExpiration'
import NewForm from './components/NewForm'
import NavBar from './components/NavBar'
import NutritionInfo from './components/NutritionInfo.js'
import RecipeInfo from './components/RecipeInfo'
import Home from './components/Home'
import TabularView from './components/TabularView'

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
      storage_area: 'Pantry',
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
      searchURL: '',
      searchIngredient: ''

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
    this.addToSearchIngredients = this.addToSearchIngredients.bind(this)
    this.clearIngredients = this.clearIngredients.bind(this)
    
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
          storage_area: 'Pantry'
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


  getNutritionInfo(food_name, fullItem) {
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
            food_Name: '',
            food_name: fullItem.food_name,
            food_qty: fullItem.food_qty,
            expiration_date: fullItem.expiration_date,
            storage_area: fullItem.storage_area,
          })
        },
          err => console.log(err))
    })
  }

addToSearchIngredients (searchFood) {
  let addFood = searchFood
  let newFoodString = this.state.searchIngredient + ' ' + addFood
    this.setState({
      searchIngredient: newFoodString
    })
    
}

clearIngredients () {
  this.setState({
    searchIngredient: ''
  })
}




  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavBar />
         
          <Route path='/new' render={(props)=> <NewForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} food_name={this.state.food_name} food_qty={this.state.food_qty} storage_area={this.state.storage_area} expiration_date={this.state.expiration_date} handleSelect={this.handleSelect} />}></Route>
          
          <Route path= '/' exact render={(props) =><Home groceries={this.state.groceries} setIndividualItem={this.setIndividualItem} addToSearchIngredients={this.addToSearchIngredients} deleteGrocery={this.deleteGrocery} getNutritionInfo={this.getNutritionInfo} searchIngredient={this.state.searchIngredient} clearIngredients={this.state.clearIngredients}/>}></Route>

          <Route path= '/tabular' exact render={(props) =><TabularView groceries={this.state.groceries} setIndividualItem={this.setIndividualItem} addToSearchIngredients={this.addToSearchIngredients} deleteGrocery={this.deleteGrocery} getNutritionInfo={this.getNutritionInfo}/>}></Route>
          
          
          {/* <Route path='/show' render={(props) => <NutritionInfo food={this.state.food} />}></Route> */}

        {(this.state.food)
          ? <Route path='/show' render={(props) => <NutritionInfo food={this.state.food} food_name={this.state.food_name} food_qty={this.state.food_qty} expiration_date={this.state.expiration_date} storage_area={this.state.storage_area}/>}></Route>
          : null
        }

{/* <Route path='/show' render={(props) => <NutritionInfo food={this.state.food} />} /> */}

        <Route path='/edit' render={(props) => <EditItem editFood_name={this.state.editFood_name} handleEdit={this.handleEdit} editStorage_area={this.state.editStorage_area} editFood_name={this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange={this.handleChange} groceriesDetails={this.state.groceriesDetails} handleSelect={this.handleEditSelect} />} />

        
        <div>
          {/*
        <EditItem handleEdit={this.handleEdit} editStorage_area = {this.state.editStorage_area} editFood_name = {this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange = {this.handleChange} groceriesDetails = {this.state.groceriesDetails}/> */}
        </div>
        <RecipeInfo searchIngredient={this.state.searchIngredient} clearIngredients = {this.clearIngredients}/>
        </div>
      </Router >
    );
  }
}

export default App;
