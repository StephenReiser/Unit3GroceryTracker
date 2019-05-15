import React, { Component } from 'react';

class NutritionInfo extends Component {
	render () {
		return  (
			<div>
        <h1>Food Name: {this.props.food[0].hits[0].fields.item_name}</h1>
        <h2>Brand Name: {this.props.food[0].hits[0].fields.brand_name}</h2>
		<h2>Calories: {this.props.food[0].hits[0].fields.nf_calories}</h2>
        <h3>Cholesterol: {this.props.food[0].hits[0].fields.nf_cholesterol}</h3>
      </div>
		)
	}
}

export default NutritionInfo;