import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ChartExpiration from '../components/ChartExpiration'

class Home extends Component {
    render() {
        return (
            <div className="row">
            <div className="col"></div>
            <div className="col-9">

              <div class="card-deck">

                {this.props.groceries.map(item => {
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
                              <button class="btn btn-outline-success btn-sm" onClick={() => this.props.addToSearchIngredients(item.food_name)}>+</button>
                            </div>
                            <div className="col-3">
                              <Link to='/edit'><button class="btn btn-outline-primary btn-sm" onClick={() => this.props.setIndividualItem(item)}>Edit</button></Link>
                            </div>
                            <div className="col-6">
                              <Link to='/show'><button class="btn btn-outline-success btn-sm" onClick={() => this.props.getNutritionInfo(item.food_name, item)}>Nutrition Info</button></Link>
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

        
        )
    }
}



export default Home