import React, { Component } from 'react';

class NutritionInfo extends Component {
	render () {
		return  (
			<div className='jumbotron row'>
			<div className = 'col-6'>
			<h1 className='display-5'>{this.props.food_name}</h1>
			<h2 className='display-6'>Qty: {this.props.food_qty}</h2>
			<h2 className='display-6'>Expires: {this.props.expiration_date.substr(0, 10)}</h2>
			<h2 className='display-6'>Storage Area: {this.props.storage_area}</h2>
			</div>
			<div className='col-6'> 
			<h1 className='display-5'>Food Name: {this.props.food[0].hits[0].fields.item_name}</h1>
        <h2 className='display-6'>Brand Name: {this.props.food[0].hits[0].fields.brand_name}</h2>
		<h2 className='display-6'>Calories: {this.props.food[0].hits[0].fields.nf_calories}</h2>
        <h3 className='display-6'>Cholesterol: {this.props.food[0].hits[0].fields.nf_cholesterol}</h3>
				</div>
        
      </div>
		)
	}
}

export default NutritionInfo;