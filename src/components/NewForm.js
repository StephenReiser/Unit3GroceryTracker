import React, { Component } from 'react'

class NewForm extends Component {
    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
            <label htmlFor="food_name">Food Name</label>
            <input type='text' id='food_name' value={this.props.food_name} placeholder='New Item' onChange={this.props.handleChange} />
            <label htmlFor="food_qty">Quantity</label>
            <input type='number' id='food_qty' value={this.props.food_qty} placeholder='1' onChange={this.props.handleChange} />
            <label htmlFor="expiration_date">Expiration Date</label>
            <input type='date' id='expiration_date' value={this.props.expiration_date} placeholder='' onChange={this.props.handleChange} />
            <label htmlFor="storage_area">Storage Area</label>
            <input type='text' id='storage_area' value={this.props.storage_area} placeholder='' onChange={this.props.handleChange} />
            <input type='submit' value='Add Food' />
          </form> 
        )
    }
}




export default NewForm


