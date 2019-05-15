import React, { Component } from 'react'

class TabularView extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-1"></div>
                <div className="col">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                {/* <th scope="col">Storage Area</th> */}
                                {/* <th scope="col">Created Date</th> */}
                                <th scope="col">Expiration Date</th>
                                <th scope="col">Remove Item</th>
                                <th scope="col">Find Recipes</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    <tr key={item._id}>
                                        {/* <th scope="row">1</th> */}
                                        <td>{item.food_name}</td>
                                        <td>{item.food_qty}</td>
                                        {/* <td>{item.storage_area}</td> */}
                                        {/* <td>{createdDate}</td> */}
                                        <td>{expDate}</td>
                                        <td>                                <button class="btn btn-outline-danger btn-sm" onClick={() => this.props.deleteGrocery(item._id)}>X</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-outline-success btn-sm" onClick={() => this.props.addToSearchIngredients(item.food_name)}>+</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="col-1"></div>
            </div>
        )
    }
}

export default TabularView