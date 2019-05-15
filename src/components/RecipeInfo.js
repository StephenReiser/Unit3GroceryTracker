import React, { Component } from 'react'

const cardSize = {
  'max-width': '540px'
}
const ulHeight = {
  'max-height': '300px',
  padding: 0,
  overflow: 'auto'
}



class RecipeInfo extends Component {
    constructor(props) {
        super(props)
        this.state= {
            recipeSearchURL: "https://api.edamam.com/search?q=",
            searchOther: "&app_id=9d94e852&app_key=480a66a770af9cbc380a775b8959453c&from=0&to=3",
            searchFullUrl: '',
            recipeResults: [],
            recipesSearched: false
        }
        this.getRecipes = this.getRecipes.bind(this)
        this.hideRecipes = this.hideRecipes.bind(this)
    }
    hideRecipes () {
        this.setState({recipesSearched: false})
    }

    getRecipes() {
  
        // event.preventDefault()
        
    
        this.setState({
          searchFullUrl: this.state.recipeSearchURL + this.props.searchIngredient + this.state.searchOther
        }, () => {
          fetch(this.state.searchFullUrl)
          .then(response => {
            
            return response.json()
          })
            .then((jsondata)=>{
              console.log(jsondata)
              console.log(typeof jsondata)
              
              let newRecipes = []
              newRecipes.push(jsondata.hits)
              console.log(newRecipes)
              this.setState({
                

                recipeResults: newRecipes,
                recipesSearched: true,
                searchFullUrl: ''
              })
            },(err)=>{
              console.log(err)
            })
            // then takes two call back funcitons one for fulfilled, one for rejected. in english - this is setting the state for searchURL, then fetching the url.  then its returning the response then we are logging the response
        })
    
      }
    render() {
        return(
            <div>
              <p>Search Ingredients:{this.props.searchIngredient}</p>
                <button onClick={() => this.getRecipes()}>Show Recipes</button>
                <button onClick={() => this.hideRecipes()}>Hide Recipes</button>
                <button onClick={() => this.props.clearIngredients()}>Clear Ingredients</button>
            {/* {this.state.recipesSearched ? <div>{this.state.recipeResults[0].map(item => {
                return (

                )
            })
            </div>
            
            
            
            
            // <h1>{this.state.recipeResults[0][0].recipe.label}</h1>
             : null} */}

             {this.state.recipesSearched ? 
                <div className = 'row'
                >{this.state.recipeResults[0].map(item => {
                    return (
                      <div className='col-sm-6 col-md-4'>
                        <div key={item.recipe.label} className='card h-100' style={cardSize}>
                        
                        <img src={item.recipe.image} alt={item.recipe.label} className='card-img-top'/>
                        
                        
                        <div className='card-body'>
                        <h5 className='card-title'>{item.recipe.label}</h5>
                        <ul className='' style={ulHeight}>
                           {item.recipe.ingredients.map(ingredient => {
                             return <li key={ingredient.text + Math.floor(Math.random()*100)} className='list-group-item'>{ingredient.text}</li>
                            })}
                        </ul>
                        </div>
                        </div>
                        </div>
                            
                            
                        
                    )
                })} </div>
                : null}
            </div>
        )
    }
}




export default RecipeInfo